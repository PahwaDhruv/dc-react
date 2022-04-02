import { createSlice } from '@reduxjs/toolkit';
import { APP_ERROR } from '../../utils/Constant';
import {
	toggleLike,
	fetchBlogs,
	deleteBlog,
	addBlog,
} from '../actions/blogActions';

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
				state.error = APP_ERROR;
			})
			.addCase(addBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(addBlog.fulfilled, (state, action) => {
				state.isLoading = false;
				state.blogs.unshift(action.payload);
			})
			.addCase(addBlog.rejected, (state) => {
				state.isLoading = false;
				state.error = APP_ERROR;
			})
			.addCase(toggleLike.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(toggleLike.fulfilled, (state, action) => {
				console.log(action);
				state.isLoading = false;
				const blog = state.blogs.find(
					(blog) => blog._id === action.meta.arg.blogId
				);

				blog.likes = action.payload;
			})
			.addCase(toggleLike.rejected, (state, action) => {
				state.isLoading = false;
				console.log('action', action);
				state.error = APP_ERROR;
			})
			.addCase(deleteBlog.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteBlog.fulfilled, (state, action) => {
				console.log('action', action);
				const { payload, meta } = action;
				state.isLoading = false;
				const idx = state.blogs
					.map((blog) => blog._id)
					.indexOf(meta.arg.blogId);
				if (idx > -1) {
					state.blogs.splice(idx, 1);
				}
			})
			.addCase(deleteBlog.rejected, (state) => {
				state.isLoading = false;
				state.error = APP_ERROR;
			});
	},
});

export default blogSlice.reducer;
