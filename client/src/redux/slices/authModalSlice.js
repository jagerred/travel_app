import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
	isModalLogin: true,
	authError: '',
};

const authModalSlice = createSlice({
	name: 'authModal',
	initialState,
	reducers: {
		toggleModalOpen: state => {
			state.isModalOpen = !state.isModalOpen;
		},
		toggleModalLogin: state => {
			state.isModalLogin = !state.isModalLogin;
			state.authError = null;
		},
		setAuthError: (state, action) => {
			state.authError = action.payload;
		},
	},
});
export const { toggleModalOpen, toggleModalLogin, setAuthError } =
	authModalSlice.actions;
export default authModalSlice.reducer;
