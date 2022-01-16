import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import Spinner from '../layout/Spinner';
import DashboardNavbar from './DashboardNavbar';

const Dashboard = () => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const { user } = authState;
	const profileState = useSelector((state) => state.profile);
	const { isLoading, profile } = profileState;

	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);

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
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, create one now</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Dashboard;
