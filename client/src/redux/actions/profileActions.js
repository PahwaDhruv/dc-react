import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getCurrentProfile = createAsyncThunk(
	'profile/getCurrentProfile',
	async (obj, { rejectWithValue }) => {
		try {
			const res = await axios.get('/api/profile/me');
			// console.log('current profile ->', res.data);
			return res.data;
		} catch (err) {
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
