import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//Get Current Profile
export const getCurrentProfile = createAsyncThunk(
	'profile/getCurrentProfile',
	async (_, { rejectWithValue }) => {
		try {
			const res = await axios.get('/api/profile/me');
			// console.log('current profile ->', res.data);
			return res.data;
		} catch (err) {
			// console.log('err', err.response.data);
			return rejectWithValue(err.response.data);
		}
	}
);

//Get All Profiles
export const getProfiles = createAsyncThunk('profile/getProfiles', async () => {
	const res = await axios.get('/api/profile');
	// console.log('profiles', res.data);
	return res.data;
});

//Get Profile by id
export const getProfileById = createAsyncThunk(
	'profile/getProfileById',
	async ({ userId }, { rejectWithValue }) => {
		try {
			const res = await axios.get(`/api/profile/user/${userId}`);
			console.log('profile ->', res.data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

//Create Profile
export const createProfile = createAsyncThunk(
	'profile/createProfile',
	async (formData, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};

			const res = await axios.post('/api/profile', formData, config);
			// console.log('res', res.data);
			return res.data;
		} catch (err) {
			let error = err;
			if (!error.response) {
				throw err;
			}
			// console.log('err', err.response.data);
			return rejectWithValue(err.response.data);
		}
	}
);

//Add Experience
export const addExperience = createAsyncThunk(
	'profile/addExperience',
	async (formData, { rejectWithValue }) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put('/api/profile/experience', formData, config);
			console.log('experience res', res.data);
			return res.data;
		} catch (err) {
			let error = err;
			if (!error.response) {
				throw err;
			}

			return rejectWithValue(err.response.data);
		}
	}
);

//Add Education
export const addEducation = createAsyncThunk(
	'profile/addEducation',
	async (formData, { rejectWithValue }) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		try {
			const res = await axios.put('/api/profile/education', formData, config);
			console.log('education res', res.data);
			return res.data;
		} catch (err) {
			let error = err;
			if (!error.response) {
				throw err;
			}

			return rejectWithValue(err.response.data);
		}
	}
);

//Delete Experience
export const deleteExperience = createAsyncThunk(
	'profile/deleteExperience',
	async ({ expId }) => {
		const res = await axios.delete(`/api/profile/experience/${expId}`);
		console.log('exp delete', res.data);
		return res.data;
	}
);

//Delete Education
export const deleteEducation = createAsyncThunk(
	'profile/deleteEducation',
	async ({ eduId }) => {
		const res = await axios.delete(`/api/profile/education/${eduId}`);
		console.log('edu delete', res.data);
		return res.data;
	}
);

//Delete account and profile
export const deleteAccount = createAsyncThunk(
	'profile/deleteAccount',
	async () => {
		const res = await axios.delete('/api/profile');
		return res.data;
	}
);
//Get Github repos
export const fetchGithubRepos = createAsyncThunk(
	'profile/fetchGithubRepos',
	async ({ username }, { rejectWithValue }) => {
		try {
			const res = await axios.get(`/api/profile/github/${username}`);
			console.log('repos ->', res.data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
