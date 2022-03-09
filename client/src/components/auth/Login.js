import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { setAlert } from '../../redux/actions/alertActions';

const Login = () => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated } = authState;
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const { email, password } = formData;

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			dispatch(setAlert('Please fill in all the values', 'danger'));
		} else {
			// setDisableBtn(true);
			const res = await dispatch(login(formData));
			// console.log('res', res);
		}
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<Fragment>
			<h1 className='large text-primary'>Login</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Log Into Your Account
			</p>
			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='email'
						name='email'
						value={email}
						placeholder='Email Address'
						onChange={handleChange}
					/>
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
				<input type='submit' className='btn btn-primary' value={'Login'} />
			</form>
			<p className='my-1'>
				Don't have an Account? <Link to='/register'>Register</Link>
			</p>
		</Fragment>
	);
};

export default Login;
