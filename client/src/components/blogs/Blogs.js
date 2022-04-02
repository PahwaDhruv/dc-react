import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../../redux/actions/blogActions';
import Spinner from '../layout/Spinner';
import BlogItem from './BlogItem';

const Blogs = () => {
	const dispatch = useDispatch();
	const blogState = useSelector((state) => state.blog);
	const { blogs, isLoading } = blogState;
	useEffect(() => {
		dispatch(fetchBlogs());
	}, [dispatch]);
	return isLoading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Blogs</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome to the Community
			</p>
			{/* Post Form */}
			<div className='blogs'>
				{blogs.map((blog) => (
					<BlogItem key={blog._id} blog={blog}></BlogItem>
				))}
			</div>
		</Fragment>
	);
};

export default Blogs;
