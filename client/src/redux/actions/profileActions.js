import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAlert } from './alertActions';

export const getCurrentProfile = createAsyncThunk(
	'profile/getCurrentProfile',
	async (obj, { rejectWithValue }) => {
		try {
			const res = await axios.get('/api/profile/me');
			console.log('current profile ->', res.data);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
