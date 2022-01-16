import { createSlice } from '@reduxjs/toolkit';
import { createProfile, getCurrentProfile } from '../actions/profileActions';

const initialState = {
	profile: null, //holds user's profile or visited profile
	profiles: [],
	repos: [],
	isLoading: true,
	error: {},
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		CLEAR_PROFILE: (state) => {
			state.isLoading = false;
			state.profile = null;
			state.repos = [];
			state.error = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCurrentProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				// console.log('action', action);
				state.profile = action.payload;
			})
			.addCase(getCurrentProfile.rejected, (state, action) => {
				state.isLoading = false;
				// console.log('error', action);
				state.error = action.payload;
			})
			.addCase(createProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
				state.error = {};
				// console.log('state, action', state, action);
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.isLoading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			});
	},
});

export const { CLEAR_PROFILE } = profileSlice.actions;
export default profileSlice.reducer;
