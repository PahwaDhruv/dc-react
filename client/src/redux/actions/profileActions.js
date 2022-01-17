import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCurrentProfile = createAsyncThunk(
	'profile/getCurrentProfile',
	async ({}, { rejectWithValue }) => {
		try {
			const res = await axios.get('/api/profile/me');
			// console.log('current profile ->', res.data);
			return res.data;
		} catch (err) {
			console.log(err.response.data);
			return rejectWithValue(err.response.data);
		}
	}
);

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

export const deleteExperience = createAsyncThunk(
	'profile/deleteExperience',
	async ({ expId }) => {
		const res = await axios.delete(`/api/profile/experience/${expId}`);
		console.log('exp delete', res.data);
		return res.data;
	}
);

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
	'auth/deleteAccount',
	async () => {
		const res = await axios.delete('/api/profile');
		return res.data;
	}
);
