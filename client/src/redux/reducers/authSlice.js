import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: true,
	isAuthenticated: false,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		registerFail: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		fetchUserSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.user = action.payload;
		},
		fetchUserError: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		loginSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		loginError: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		logoutSuccess: (state) => {
			state.isAuthenticated = false;
			state.isLoading = false;
			state.user = null;
		},
	},
});

export const {
	registerSuccess,
	registerFail,
	fetchUserSuccess,
	fetchUserError,
	loginSuccess,
	loginError,
	logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
