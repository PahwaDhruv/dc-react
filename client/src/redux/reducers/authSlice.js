import { createSlice } from '@reduxjs/toolkit';
import { deleteAccount } from '../actions/profileActions';

const initialState = {
	isLoading: true,
	isAuthenticated: false,
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		registerSuccess: (state) => {
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
		loginSuccess: (state) => {
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
	extraReducers: (builder) => {
		builder
			.addCase(deleteAccount.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteAccount.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isAuthenticated = false;
				state.user = null;
			})
			.addCase(deleteAccount.rejected, (state, action) => {
				state.isLoading = false;
			});
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
