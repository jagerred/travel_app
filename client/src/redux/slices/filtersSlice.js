import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	districtsStatus: 'loading',
	districts: [],
	mobileVisible: false,
	filters: {
		category: [],
		subcategory: [],
		district: [],
		sort: ['name', 'asc'],
		highRating: false,
		localsChoice: false,
		currentPage: 1,
	},
};

export const fetchDistricts = createAsyncThunk(
	'filter/fetchDistricts',
	async (id, { rejectWithValue }) => {
		try {
			const response = await axios.get(`http://localhost:3001/${id}/districts`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const filtersSlice = createSlice({
	name: 'filterResult',
	initialState,
	reducers: {
		updateAllFilters: (state, action) => {
			state.filters = action.payload;
		},
		addFilter: (state, action) => {
			const { type, filter } = action.payload;
			state.filters[type].push(filter);
			state.filters.currentPage = 1;
		},
		deleteFilter: (state, action) => {
			const { type, filter } = action.payload;
			state.filters[type] = state.filters[type].filter(i => i !== filter);
			state.filters.currentPage = 1;
		},
		clearFilter: (state, action) => {
			state.filters[action.payload] = [];
			state.filters.currentPage = 1;
		},
		changeCurrentPage: (state, action) => {
			state.filters.currentPage = action.payload;
		},
		toggleSwitch: (state, action) => {
			state.filters[action.payload] = !state.filters[action.payload];
			state.filters.currentPage = 1;
		},
		toggleMobileVisible: state => {
			state.mobileVisible = !state.mobileVisible;
		},
		toggleDistricts: (state, action) => {
			const currentDistrict = state.districts.find(
				i => i.district === action.payload
			);
			currentDistrict.isActive = !currentDistrict.isActive;
			state.filters.currentPage = 1;
		},
		updateSort: (state, action) => {
			state.filters.sort = action.payload;
			state.filters.currentPage = 1;
		},
		updateDistrictState: (state, action) => {
			const toggleCheck = state.districts.find(
				i => i.districtName === action.payload
			);
			toggleCheck.isChecked = !toggleCheck.isChecked;
			state.filters.currentPage = 1;
		},
	},
	extraReducers: {
		[fetchDistricts.pending]: state => {
			state.districtsStatus = 'loading';
		},
		[fetchDistricts.fulfilled]: (state, action) => {
			state.districtsStatus = 'idle';
			state.districts = action.payload;
		},
		[fetchDistricts.rejected]: state => {
			state.districtsStatus = 'error';
		},
	},
});
export const {
	updateAllFilters,
	addFilter,
	deleteFilter,
	clearFilter,
	updateSort,
	updateDistrictState,
	toggleDistricts,
	toggleSwitch,
	toggleMobileVisible,
	changeCurrentPage,
} = filtersSlice.actions;
export default filtersSlice.reducer;
