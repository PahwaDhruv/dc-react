import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const Logout = () => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated } = authState;
	console.log(isAuthenticated);

	useEffect(() => {
		dispatch(logout());
	}, []);

	if (!isAuthenticated) {
		return <Redirect to='/login' />;
	}
	return null;
};

export default Logout;
