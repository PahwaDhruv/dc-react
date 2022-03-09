import { createSlice } from '@reduxjs/toolkit';
import {
	addExperience,
	createProfile,
	getCurrentProfile,
	addEducation,
	deleteExperience,
	deleteEducation,
	getProfiles,
	getProfileById,
	fetchGithubRepos,
} from '../actions/profileActions';

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
			.addCase(getProfiles.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfiles.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profiles = action.payload;
			})
			.addCase(getProfiles.rejected, (state, action) => {
				state.isLoading = false;
				state.profiles = [];
			})
			.addCase(getProfileById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProfileById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
			})
			.addCase(getProfileById.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload;
			})
			.addCase(createProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createProfile.fulfilled, (state, action) => {
				state.isLoading = false;
				state.profile = action.payload;
				state.error = {};
			})
			.addCase(createProfile.rejected, (state, action) => {
				state.isLoading = false;
				if (action.payload) {
					state.error = action.payload;
				} else {
					state.error = action.error;
				}
			})
			.addCase(addExperience.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addExperience.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log('experience fulfilled', action.payload);
			})
			.addCase(addExperience.rejected, (state, action) => {
				state.isLoading = false;
				console.log('experience rejected', action.payload);
			})
			.addCase(addEducation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addEducation.fulfilled, (state, action) => {
				state.isLoading = false;
				console.log('Education fulfilled', action.payload);
			})
			.addCase(addEducation.rejected, (state, action) => {
				state.isLoading = false;
				console.log('Education rejected', action.payload);
			})
			.addCase(deleteExperience.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteExperience.fulfilled, (state, action) => {
				const { meta } = action;
				const { expId } = meta.arg;
				const idx = state.profile.experience
					.map((exp) => exp._id)
					.indexOf(expId);
				state.profile.experience.splice(idx, 1);
				state.isLoading = false;
			})
			.addCase(deleteExperience.rejected, (state, action) => {
				state.isLoading = false;
				console.log('Delete Experience rejected', action);
			})
			.addCase(deleteEducation.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteEducation.fulfilled, (state, action) => {
				const { meta } = action;
				const { eduId } = meta.arg;
				const idx = state.profile.education
					.map((edu) => edu._id)
					.indexOf(eduId);
				state.profile.education.splice(idx, 1);
				state.isLoading = false;
			})
			.addCase(deleteEducation.rejected, (state, action) => {
				state.isLoading = false;
				console.log('Delete deleteEducation rejected', action);
			})
			.addCase(fetchGithubRepos.pending, (state) => {
				// state.isLoading = true;
			})
			.addCase(fetchGithubRepos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.repos = action.payload;
			})
			.addCase(fetchGithubRepos.rejected, (state, action) => {
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
