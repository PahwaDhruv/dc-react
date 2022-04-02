import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk('blog/fetchBlogs', async () => {
	const res = await axios.get('/api/blogs');
	return res.data;
});

export const addBlog = createAsyncThunk(
	'blog/addBlog',
	async ({ formData }, { rejectWithValue }) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const res = await axios.post('/api/blogs', formData, config);
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
export const toggleLike = createAsyncThunk(
	'blog/toggleLike',
	async ({ blogId }, { rejectWithValue }) => {
		try {
			const res = await axios.put(`/api/blogs/toggleLike/${blogId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteBlog = createAsyncThunk(
	'blod/deleteBlog',
	async ({ blogId }, { rejectWithValue }) => {
		try {
			const res = await axios.delete(`/api/blogs/${blogId}`);
			return res.data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);
// export const removeLike = createAsyncThunk(
// 	'blog/removeLike',
// 	async ({ blogId }, { rejectWithValue }) => {
// 		try {
// 			const res = await axios.put(`/api/blogs/unlike/${blogId}`);
// 			return res.data;
// 		} catch (err) {
// 			return rejectWithValue(err.response.data);
// 		}
// 	}
// );
