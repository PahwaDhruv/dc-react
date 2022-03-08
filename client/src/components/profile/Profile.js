import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../redux/actions/profileActions';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match }) => {
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);
	const profileState = useSelector((state) => state.profile);
	const { isLoading, profile } = profileState;
	useEffect(() => {
		dispatch(getProfileById({ userId: match.params.id }));
	}, [dispatch]);
	return (
		<Fragment>
			{profile === null || isLoading ? (
				<Spinner />
			) : (
				<Fragment>
					<Link to={'/profiles'} className='btn btn-white'>
						Back to Profiles
					</Link>
					{authState.isAuthenticated &&
						authState.isLoading === false &&
						authState.user._id === profile.user._id && (
							<Link
								to='/edit-profile'
								className='
                            btn btn-dark'
							>
								Edit Profile
							</Link>
						)}
					<div className='profile-grid my-1'>
						<ProfileTop profile={profile} />
						<ProfileAbout profile={profile} />
						<div className='profile-exp bg-white p-2'>
							<h2 className='text-primary'>Experiences</h2>
							{profile.experience.length > 0 ? (
								<Fragment>
									{profile.experience.map((exp) => (
										<ProfileExperience key={exp._id} experience={exp} />
									))}
								</Fragment>
							) : (
								<h4>No Experience</h4>
							)}
						</div>

						<div className='profile-edu bg-white p-2'>
							<h2 className='text-primary'>Education</h2>
							{profile.education.length > 0 ? (
								<Fragment>
									{profile.education.map((edu) => (
										<ProfileEducation key={edu._id} education={edu} />
									))}
								</Fragment>
							) : (
								<h4>No Education</h4>
							)}
						</div>
						{profile.githubUserName && (
							<ProfileGithub username={profile.githubUserName} />
						)}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Profile;
