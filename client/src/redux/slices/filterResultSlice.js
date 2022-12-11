import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	places: [],
	loadStatus: 'idle',
	pages: 1,
	totalPlaces: 0,
	postError: null,
};
export const fetchPlaces = createAsyncThunk(
	'filterResult/fetchPlaces',
	async (filters, { rejectWithValue }) => {
		try {
			const response = await axios.get(
				`http://localhost:3001/${filters.id}/places?${filters.filters}`
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const putLike = createAsyncThunk(
	'filterResult/putLike',
	async (likeData, { rejectWithValue, dispatch }) => {
		try {
			const { likeCount, placeId, cityId } = likeData;
			await axios.put(
				`http://localhost:3001/${cityId}/${placeId}/likes`,
				likeCount
			);
			dispatch(updateLikes({ placeId, likes: likeCount.likes }));
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const putRating = createAsyncThunk(
	'filterResult/putReview',
	async (ratingData, { rejectWithValue, dispatch }) => {
		try {
			const { cityId, placeId, ratingCount } = ratingData;
			const response = await axios.put(
				`http://localhost:3001/${cityId}/${placeId}/rating`,
				ratingCount
			);
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
const filterResultSlice = createSlice({
	name: 'filterResult',
	initialState,
	reducers: {
		updateLikes: (state, action) => {
			const { placeId, likes } = action.payload;
			const currentPlace = state.places.find(i => i.id === placeId);
			currentPlace.likes = likes;
		},
	},
	extraReducers: {
		[fetchPlaces.pending]: state => {
			state.loadStatus = 'loading';
		},
		[fetchPlaces.fulfilled]: (state, action) => {
			state.pages = action.payload.pageCount;
			state.places = action.payload.places;
			state.totalPlaces = action.payload.totalPlaces;
			state.loadStatus = 'idle';
		},
		[fetchPlaces.rejected]: state => {
			state.loadStatus = 'error';
		},
	},
});
export const { updateLikes } = filterResultSlice.actions;
export default filterResultSlice.reducer;
