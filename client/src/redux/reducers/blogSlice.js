import { createSlice } from '@reduxjs/toolkit';
import { fetchBlogs } from '../actions/blogActions';

const initialState = {
	blogs: [],
	blog: null,
	isLoading: true,
	error: {},
};

export const blogSlice = createSlice({
	name: 'blog',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBlogs.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchBlogs.fulfilled, (state, action) => {
				state.isLoading = false;
				state.blogs = action.payload;
			})
			.addCase(fetchBlogs.rejected, (state, action) => {
				state.isLoading = false;
				state.error = 'Something went Wrong. Please try after sometime';
			});
	},
});

export default blogSlice.reducer;
