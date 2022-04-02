import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { useSelector, useDispatch } from 'react-redux';
import { DEFAULT_IMG } from '../../utils/Constant';
import { deleteBlog, toggleLike } from '../../redux/actions/blogActions';

const BlogItem = ({
	blog: { _id, title, body, author, imageUrl, user, likes, comments, date },
}) => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { user: currentUser } = authState;
	const [isLiked, setIsLiked] = useState(false);
	useEffect(() => {
		setIsLiked(
			likes.filter((like) => like.user === currentUser?._id).length > 0
		);
	}, []);

	const handleDeleteBlog = () => {
		if (window.confirm('Are you sure, you want to delete this blog?')) {
			dispatch(deleteBlog({ blogId: _id }));
		}
	};
	return (
		<div className='blog bg-white my-1 p-1'>
			<div>
				<Link to={`/profile/${user}`}>
					<img
						className='round-image'
						src={imageUrl ? imageUrl : DEFAULT_IMG}
						alt='Author'
					/>
					<h4>{author}</h4>
				</Link>
			</div>
			<div>
				<h2 className='text-primary'>{title}</h2>
				<p className='my-1'>{body}</p>
				<p className='blog-date'>
					Posted on: <Moment format='YYYY/MM/DD'>{date}</Moment>
				</p>
				<button
					className='btn'
					type='button'
					onClick={() => dispatch(toggleLike({ blogId: _id }))}
				>
					<i className={`fas fa-thumbs-up ${isLiked && 'text-primary'}`}></i>{' '}
					<span>
						{likes.length > 0 && (
							<span className='comment-count'>{likes.length}</span>
						)}
					</span>
				</button>
				{/* <button class='btn'>
					<i class='fas fa-thumbs-down'></i>
					<span>1</span>
				</button> */}
				<Link to={`/blog/${_id}`} className='btn btn-primary'>
					Discussion{' '}
					{comments.length > 0 && (
						<span className='comment-count'>{comments.length}</span>
					)}
				</Link>
				{!authState.isLoading && user === authState.user._id && (
					<button
						type='button'
						className='btn btn-danger'
						onClick={handleDeleteBlog}
					>
						<i className='fas fa-times'></i>
					</button>
				)}
			</div>
		</div>
	);
};

export default BlogItem;
