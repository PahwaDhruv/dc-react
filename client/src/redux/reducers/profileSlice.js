import { createSlice } from '@reduxjs/toolkit';
import { getCurrentProfile } from '../actions/profileActions';

const initialState = {
	profile: null,
	profiles: [],
	repos: [],
	loading: true,
	error: {},
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCurrentProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(getCurrentProfile.fulfilled, (state, action) => {
				state.loading = false;
				console.log('action', action);
				state.profile = action.payload;
			})
			.addCase(getCurrentProfile.rejected, (state, action) => {
				state.loading = false;
				console.log('error', action);
				state.error = action.payload;
			});
	},
});

export default profileSlice.reducer;
