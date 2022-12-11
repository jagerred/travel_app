import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	errorPopupMessage: '',
};

const globalSlice = createSlice({
	name: 'global',
	initialState,
	reducers: {
		setErrorPopupMessage: (state, action) => {
			state.errorPopupMessage = action.payload;
		},
	},
});
export const { setErrorPopupMessage } = globalSlice.actions;
export default globalSlice.reducer;
