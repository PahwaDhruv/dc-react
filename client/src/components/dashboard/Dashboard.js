import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	getCurrentProfile,
	deleteAccount,
} from '../../redux/actions/profileActions';
import Spinner from '../layout/Spinner';
import DashboardNavbar from './DashboardNavbar';
import Experience from './Experience';
import Education from './Education';
import { setAlert } from '../../redux/actions/alertActions';
import { CLEAR_PROFILE } from '../../redux/reducers/profileSlice';
import { logout } from '../../redux/actions/authActions';

const Dashboard = () => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { user } = authState;
	const profileState = useSelector((state) => state.profile);
	const { isLoading, profile } = profileState;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);

	const handleDeleteAccount = async () => {
		if (window.confirm('Are you sure you want to delete your account?')) {
			try {
				const res = await dispatch(deleteAccount()).unwrap();
				dispatch(logout());
			} catch (err) {
				console.log(err);
				dispatch(
					setAlert(
						'OOPS! Something went wrong. Please try after sometime',
						'danger'
					)
				);
			}
		}
	};
	return isLoading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Welcome {user && user.name}
			</p>
			{profile != null ? (
				<Fragment>
					<DashboardNavbar />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, create one now</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
			<div className='my-2'>
				<button className='btn btn-danger' onClick={handleDeleteAccount}>
					<i className='fas fa-user-minus'></i>
					{' Delete My Account'}
				</button>
			</div>
		</Fragment>
	);
};

export default Dashboard;
