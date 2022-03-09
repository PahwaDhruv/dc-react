import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfiles } from '../../redux/actions/profileActions';
import { CLEAR_PROFILE } from '../../redux/reducers/profileSlice';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = () => {
	const dispatch = useDispatch();
	const profileState = useSelector((state) => state.profile);
	const { isLoading, profiles } = profileState;

	useEffect(() => {
		dispatch(CLEAR_PROFILE());
		dispatch(getProfiles());
	}, [dispatch]);

	return (
		<Fragment>
			{isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					<h1 className='large text-primary'>Developers</h1>
					<p className='lead'>
						<i className='fab fa-connectdevelop'></i> Browse and Connect with
						Developers
					</p>
					<div className='profiles'>
						{profiles.length > 0 ? (
							profiles.map((profile) => (
								<ProfileItem key={profile._id} profile={profile} />
							))
						) : (
							<h4>No Profile Found</h4>
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profiles;
