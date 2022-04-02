import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../../redux/actions/blogActions';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import AddBlog from './AddBlog';
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
			<Link to='/createBlog' className='btn btn-primary'>
				Create New Blog
			</Link>
			<div className='blogs'>
				{blogs.map((blog) => (
					<BlogItem key={blog._id} blog={blog}></BlogItem>
				))}
			</div>
		</Fragment>
	);
};

export default Blogs;
