import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	userInfo: {
		name: '',
		email: '',
		uid: '',
		cities: [],
		photo: '',
	},
	loadStatus: 'idle',
	photoLoadStatus: 'idle',
	serverError: false,
};
export const addUser = createAsyncThunk(
	'user/addUser',
	async function (data, { dispatch }) {
		try {
			const response = await axios.post('http://localhost:3001/users', data);
		} catch (error) {
			dispatch(toggleServerError());
		}
	}
);
export const postCity = createAsyncThunk(
	'user/postCity',
	async (data, { dispatch, rejectWithValue, getState }) => {
		try {
			const { cityId, placeObj } = data;
			const { name, photos } = getState().search.cityInfo;
			const uid = getState().user.userInfo.uid;
			const city = {
				id: cityId,
				name: name,
				photos: photos,
				places: [placeObj],
				visited: [],
			};
			const response = await axios.post(
				`http://localhost:3001/users/${uid}`,
				city
			);
			dispatch(addCity(city));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const postPlace = createAsyncThunk(
	'user/postPlace',
	async function (data, { dispatch, rejectWithValue, getState }) {
		try {
			const uid = getState().user.userInfo.uid;
			const { cityId, type, placeObj } = data;
			const response = await axios.post(
				`http://localhost:3001/users/${uid}/${cityId}/${type}`,
				placeObj
			);
			if (!response.status === 200) {
				throw new Error('Server Error!');
			}

			if (data?.isChangingStatus) return;
			dispatch(addPlace({ cityId, placeObj }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const postReorderedList = createAsyncThunk(
	'user/postReorderedList',
	async function (data, { dispatch, rejectWithValue, getState }) {
		try {
			const uid = getState().user.userInfo.uid;

			const { cityId, type, changedList } = data;

			const response = await axios.patch(
				`http://localhost:3001/users/${uid}/${cityId}/${type}`,
				changedList
			);
			if (!response.status === 200) {
				throw new Error('Server Error!');
			}

			type === 'reorderPlaces'
				? dispatch(updatePlacesOrder({ cityId, changedList }))
				: dispatch(updateVisitedOrder({ cityId, changedList }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

export const deletePlace = createAsyncThunk(
	'user/deletePlace',
	async function (placeData, { dispatch, rejectWithValue, getState }) {
		try {
			const uid = getState().user.userInfo.uid;
			const { cityId, type, place, both, placeObj } = placeData;
			const response = await axios.delete(
				`http://localhost:3001/users/${uid}/${cityId}/${type}`,
				{ data: place }
			);

			if (!response.status === 200) {
				throw new Error('Server Error!');
			}

			if (both) {
				dispatch(removePlace({ cityId, placeId: place.id }));
				return;
			}
			type === 'deletePlace'
				? dispatch(setVisitedPlace({ cityId, place: placeObj }))
				: dispatch(removeVisitedPlace({ cityId, place: placeObj }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const uploadImage = createAsyncThunk(
	'user/uploadImage',
	async ({ dataForm, uid }) => {
		const response = await axios.post(
			`http://localhost:3001/users/uploadImage?type=${uid}`,
			dataForm,
			{
				headers: {
					enctype: 'multipart/form-data',
				},
			}
		);
		return response.data.path;
	}
);

export const fetchUser = createAsyncThunk(
	'user/fetchUser',
	async (id, { dispatch, rejectWithValue }) => {
		try {
			const response = await axios.get(`http://localhost:3001/users/${id}`);
			return response.data;
		} catch (error) {
			rejectWithValue(error);
		}
	}
);
const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		addCity: (state, action) => {
			state.userInfo.cities.push(action.payload);
		},
		addPlace: (state, action) => {
			const { cityId, placeObj } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.places.push(placeObj);
		},
		updatePlacesOrder: (state, action) => {
			const { cityId, changedList } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.places = changedList;
		},
		updateVisitedOrder: (state, action) => {
			const { cityId, changedList } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.visited = changedList;
		},
		removeUser: state => {
			state.userInfo = initialState.userInfo;
		},
		removePlace: (state, action) => {
			const { cityId, placeId } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.places = currentCity.places.filter(i => i.id !== placeId);
			currentCity.visited = currentCity.visited.filter(i => i.id !== placeId);
		},
		setVisitedPlace: (state, action) => {
			const { cityId, place } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.visited.push(place);
			currentCity.places = currentCity.places.filter(i => i.id !== place.id);
		},
		removeVisitedPlace: (state, action) => {
			const { cityId, place } = action.payload;
			const currentCity = state.userInfo.cities.find(i => i.id === cityId);
			currentCity.places.push(place);
			currentCity.visited = currentCity.visited.filter(i => i.id !== place.id);
		},
		toggleServerError: state => {
			state.serverError = !state.serverError;
		},
	},
	extraReducers: {
		[fetchUser.pending]: state => {
			state.loadStatus = 'loading';
		},
		[fetchUser.fulfilled]: (state, action) => {
			state.userInfo = action.payload;
			state.loadStatus = 'idle';
		},
		[fetchUser.rejected]: state => {
			state.loadStatus = 'error';
			state.serverError = true;
		},
		[uploadImage.pending]: state => {
			state.photoLoadStatus = 'loading';
		},
		[uploadImage.fulfilled]: (state, action) => {
			state.userInfo.photo = action.payload;
			state.photoLoadStatus = 'idle';
		},
		[uploadImage.rejected]: state => {
			state.photoLoadStatus = 'error';
		},
		[postCity.rejected]: state => {
			state.serverError = true;
		},
		[postCity.pending]: state => {
			state.serverError = false;
		},
		[postPlace.rejected]: state => {
			state.serverError = true;
		},
		[postPlace.pending]: state => {
			state.serverError = false;
		},
		[deletePlace.pending]: state => {
			state.serverError = false;
		},
		[deletePlace.pending]: state => {
			state.serverError = false;
		},
		[deletePlace.rejected]: state => {
			state.serverError = true;
		},
		[postReorderedList.rejected]: state => {
			state.serverError = true;
		},
	},
});
export const {
	addCity,
	addPlace,
	removeUser,
	removePlace,
	setVisitedPlace,
	removeVisitedPlace,
	updatePlacesOrder,
	updateVisitedOrder,
	toggleServerError,
} = userSlice.actions;
export default userSlice.reducer;
