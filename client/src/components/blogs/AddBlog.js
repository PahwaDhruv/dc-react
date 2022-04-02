import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBlog } from '../../redux/actions/blogActions';
import { setAlert } from '../../redux/actions/alertActions';
import { useHistory } from 'react-router-dom';

const AddBlog = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		title: '',
		body: '',
	});

	const handleFormData = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const blog = await dispatch(addBlog({ formData })).unwrap();
			console.log('blog', blog);
			if (blog) {
				dispatch(setAlert('Blog Created Successfully', 'success'));
				history.push('/blogs');
			}
		} catch (err) {
			const { errors } = err;
			if (errors) {
				errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
			}
		}
	};
	return (
		<div className='blog-form'>
			<div className='blog-form-header bg-primary'>
				<h3>Say Something...</h3>
			</div>
			<form className='form my-1' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						name='title'
						placeholder='*Blog Title'
						value={formData.title}
						onChange={handleFormData}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='body'
						value={formData.body}
						cols='30'
						rows='5'
						placeholder='Add some text...'
						onChange={handleFormData}
					/>
				</div>

				<input type='submit' value='Submit' className='btn btn-dark my-1' />
			</form>
		</div>
	);
};

export default AddBlog;
