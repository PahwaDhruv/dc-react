import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../redux/actions/alertActions';
import { register } from '../../redux/actions/authActions';

const Register = () => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated } = authState;
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const { name, email, password, confirmPassword } = formData;
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			dispatch(setAlert('Password do not match', 'danger'));
		} else {
			dispatch(register({ name, email, password }));
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Register</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						name='name'
						value={name}
						placeholder='Name'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						value={email}
						placeholder='Email Address'
						onChange={handleChange}
					/>
					<small className='form-text'>
						Use a Gravatar email to get a profile avatar
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='password'
						value={password}
						placeholder='Password'
						onChange={handleChange}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						name='confirmPassword'
						value={confirmPassword}
						placeholder='Confirm Password'
						onChange={handleChange}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an Account? <Link to='/login'>Login</Link>
			</p>
		</Fragment>
	);
};

export default Register;
