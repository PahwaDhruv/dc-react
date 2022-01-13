import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../redux/actions/profileActions';

const Dashboard = () => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, []);
	return <div>Welcome to Dashboard</div>;
};

export default Dashboard;
