import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	cityInfo: {
		name: '',
		photos: '',
	},
	loadStatus: 'idle',
	searchResult: [],
	searchLoadStatus: 'idle',
	searchFilter: '',
};
export const fetchCityInfo = createAsyncThunk(
	'search/fetchCityInfo',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`http://localhost:3001/${id}/search`);

			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);
export const searchRequest = createAsyncThunk(
	'search/searchRequest',
	async item => {
		const response = await axios.get(`http://localhost:3001/${item}`);
		return response.data;
	}
);
const searchSlice = createSlice({
	name: 'searchSlice',
	initialState,
	reducers: {
		updateFilter: (state, action) => {
			state.searchFilter = action.payload;
		},
	},
	extraReducers: {
		[fetchCityInfo.pending]: state => {
			state.loadStatus = 'loading';
		},
		[fetchCityInfo.fulfilled]: (state, action) => {
			state.loadStatus = 'idle';
			state.cityInfo = action.payload;
		},
		[fetchCityInfo.rejected]: state => {
			state.loadStatus = 'error';
		},
		[searchRequest.pending]: state => {
			state.searchLoadStatus = 'loading';
		},
		[searchRequest.fulfilled]: (state, action) => {
			state.searchLoadStatus = 'idle';
			state.searchResult = action.payload;
		},
		[searchRequest.rejected]: state => {
			state.searchLoadStatus = 'error';
		},
	},
});
export const { updateValue, updateMain, updateFilter } = searchSlice.actions;
export default searchSlice.reducer;
