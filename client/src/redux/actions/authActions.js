import {
	registerSuccess,
	registerFail,
	fetchUserSuccess,
	fetchUserError,
	loginSuccess,
	loginError,
	logoutSuccess,
} from '../reducers/authSlice';
import { setAlert } from './alertActions';
import axios from 'axios';
import { CLEAR_PROFILE } from '../reducers/profileSlice';

//Load User
export const fetchUser = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/auth');
		// console.log('res', res);
		// if (res.data) {
		dispatch(fetchUserSuccess(res.data));
		// } else {
		// 	dispatch(fetchUserError());
		// }
	} catch (err) {
		console.log('err', err.response.data);
		dispatch(fetchUserError());
	}
};
//Register
export const register = (user) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify(user);
	try {
		const res = await axios.post('/api/users/register', body, config);
		console.log(res.data);
		dispatch(registerSuccess(res.data));
		dispatch(fetchUser());
	} catch (err) {
		const { errors } = err.response.data;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch(registerFail());
	}
};

export const login = (auth) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const body = JSON.stringify(auth);
	try {
		const res = await axios.post('/api/users/login', body, config);
		console.log(res.data);
		dispatch(loginSuccess(res.data));
		dispatch(fetchUser());
	} catch (err) {
		console.log(err.response.data);
		const { errors } = err.response.data;
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
		}
		dispatch(loginError());
	}
};

export const logout = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/users/logout');
		console.log('logout', res);
		dispatch(CLEAR_PROFILE());
		dispatch(logoutSuccess());
	} catch (err) {
		console.log(err.response.data);
	}
};
