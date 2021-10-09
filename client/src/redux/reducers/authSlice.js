import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLoading: true,
	isAuthenticated: false,
	// token: localStorage.getItem('token'),
	// token: null,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			// localStorage.setItem('token', action.payload.token);
			// state.token = action.payload.token;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		registerFail: (state) => {
			// localStorage.removeItem('token');
			// state.token = null;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		fetchUserSuccess: (state, action) => {
			state.isAuthenticated = true;
			state.isLoading = false;
			state.user = action.payload;
		},
		fetchUserError: (state) => {
			// localStorage.removeItem('token');
			// state.token = null;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		loginSuccess: (state, action) => {
			// localStorage.setItem('token', action.payload.token);
			// state.token = action.payload.token;
			state.isAuthenticated = true;
			state.isLoading = false;
		},
		loginError: (state) => {
			// localStorage.removeItem('token');
			// state.token = null;
			state.isAuthenticated = false;
			state.isLoading = false;
		},
		logoutSuccess: (state) => {
			// localStorage.removeItem('token');
			// state.token = null;
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
