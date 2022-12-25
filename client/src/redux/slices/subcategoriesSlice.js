import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
	subcategories: [],
	subcategoriesLoadStatus: 'loading',
};

export const fetchSubcategories = createAsyncThunk(
	'subcategories/fetchSubcategories',
	async category => {
		const response = await axios.get(
			`http://localhost:3001/filters/subcategories?category=${category}`
		);
		return response.data;
	}
);
export const fetchAllSubcategories = createAsyncThunk(
	'subcategories/fetchAllSubcategories',
	async categories => {
		const response = await axios.get(
			`http://localhost:3001/filters/subcategoriesAll?${categories}`
		);
		return response.data;
	}
);

const subcategoriesSlice = createSlice({
	name: 'filterResult',
	initialState,
	reducers: {
		clearSubcategories: state => {
			state.subcategories = [];
		},
		toggleSubcategory: (state, action) => {
			const { subcategory, category } = action.payload;
			const currentCategory = state.subcategories.find(
				i => i.category === category
			);
			const currentSubcategory = currentCategory.filters.find(
				i => i.subcategory === subcategory
			);
			currentSubcategory.isActive = !currentSubcategory.isActive;
		},
		removeSubcategory: (state, action) => {
			state.subcategories = state.subcategories.filter(
				item => item.category !== action.payload
			);
		},
	},
	extraReducers: {
		[fetchSubcategories.pending]: state => {
			state.subcategoriesLoadStatus = 'loading';
		},
		[fetchSubcategories.fulfilled]: (state, action) => {
			state.subcategoriesLoadStatus = 'idle';
			state.subcategories.push(action.payload);
		},
		[fetchSubcategories.rejected]: state => {
			state.subcategoriesLoadStatus = 'error';
		},
		[fetchAllSubcategories.pending]: state => {
			state.subcategoriesLoadStatus = 'loading';
		},
		[fetchAllSubcategories.fulfilled]: (state, action) => {
			state.subcategoriesLoadStatus = 'idle';
			state.subcategories = action.payload;
		},
		[fetchAllSubcategories.rejected]: state => {
			state.subcategoriesLoadStatus = 'error';
		},
	},
});
export const { toggleSubcategory, removeSubcategory, clearSubcategories } =
	subcategoriesSlice.actions;
export default subcategoriesSlice.reducer;
