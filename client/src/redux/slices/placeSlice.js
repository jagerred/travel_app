import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	placeData: [
		{
			name: '',
			address: '',
			description: '',
			photos: '',
			reviews: [],
			info: {
				phone: [],
				social: [],
				website: '',
				worktime: [],
				location: [],
			},
		},
	],
	loadStatus: 'idle',
};
export const fetchSinglePlace = createAsyncThunk(
	'places/fetchSinglePlace',
	async data => {
		const response = await axios.get(
			`http://localhost:3001/${data.cityId}/places/${data.placeId}`
		);
		return response.data;
	}
);

export const postReview = createAsyncThunk('place/postReview', async data => {
	const response = await axios.post(
		`http://localhost:3001/${data.cityId}/${data.placeId}/reviews`,
		data.review
	);
});
const placeSlice = createSlice({
	name: 'place',
	initialState,
	reducers: {
		addReview: (state, action) => {
			console.log(action.payload);
			state.placeData[0].reviews.push(action.payload);
		},
	},
	extraReducers: {
		[fetchSinglePlace.pending]: state => {
			state.loadStatus = 'loading';
		},
		[fetchSinglePlace.fulfilled]: (state, action) => {
			state.loadStatus = 'idle';
			state.placeData = action.payload;
		},
		[fetchSinglePlace.rejected]: state => {
			state.loadStatus = 'error';
		},
	},
});
export const { addReview } = placeSlice.actions;
export default placeSlice.reducer;
