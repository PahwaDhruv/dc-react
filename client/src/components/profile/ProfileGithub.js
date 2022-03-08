import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithubRepos } from '../../redux/actions/profileActions';

const ProfileGithub = ({ username }) => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { isLoading, repos } = profileState;
	useEffect(() => {
		// dispatch(fetchGithubRepos({ username }));
	}, []);
	return <Fragment>Repos</Fragment>;
};

export default ProfileGithub;
