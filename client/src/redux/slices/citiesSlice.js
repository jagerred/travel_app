import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	items: [],
	status: 'idle',
	isSearch: false,
	error: null,
};
export const fetchCities = createAsyncThunk(
	'citiesSlice/fetchCities',
	async (search = '', { rejectWithValue }) => {
		try {
			const res = await axios.get(`http://localhost:3001/${search}`);
			return res.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const citiesSlice = createSlice({
	name: 'cities',
	initialState,
	reducers: {
		setIsSearch: (state, action) => {
			state.isSearch = action.payload;
		},
	},
	extraReducers: {
		[fetchCities.pending]: state => {
			state.status = 'loading';
		},
		[fetchCities.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload;
		},
		[fetchCities.fulfilled]: (state, action) => {
			state.error = null;
			state.status = 'idle';
			state.items = action.payload;
		},
	},
});
export const { setIsSearch } = citiesSlice.actions;
export default citiesSlice.reducer;
