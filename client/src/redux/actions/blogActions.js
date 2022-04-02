import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
	const res = await axios.get('/api/blogs');
	return res.data;
});
