import React, { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import { createProfile } from '../../redux/actions/profileActions';
import { getCurrentProfile } from '../../redux/actions/profileActions';
import Spinner from '../layout/Spinner';

const EditProfile = () => {
	const dispatch = useDispatch();
	// const history = useHistory();
	const profileState = useSelector((state) => state.profile);
	const { isLoading, profile } = profileState;
	const [formData, setFormData] = useState({
		company: '',
		website: '',
		location: '',
		bio: '',
		status: '',
		githubUserName: '',
		skills: '',
		youtube: '',
		facebook: '',
		twitter: '',
		instagram: '',
		linkedin: '',
	});
	const [displaySocialInputs, toggleSocialInputs] = useState(false);
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch]);
	useEffect(() => {
		setFormData({
			company: isLoading || !profile.company ? '' : profile.company,
			website: isLoading || !profile.website ? '' : profile.website,
			location: isLoading || !profile.location ? '' : profile.location,
			bio: isLoading || !profile.bio ? '' : profile.bio,
			status: isLoading || !profile.status ? '' : profile.status,
			githubUserName:
				isLoading || !profile.githubUserName ? '' : profile.githubUserName,
			skills: isLoading || !profile.skills ? '' : profile.skills.join(','),
			youtube: isLoading || !profile.social ? '' : profile.social.youtube,
			facebook: isLoading || !profile.social ? '' : profile.social.facebook,
			twitter: isLoading || !profile.social ? '' : profile.social.twitter,
			instagram: isLoading || !profile.social ? '' : profile.social.instagram,
			linkedin: isLoading || !profile.social ? '' : profile.social.linkedin,
		});
	}, [isLoading]);
	const {
		company,
		website,
		location,
		bio,
		status,
		githubUserName,
		skills,
		youtube,
		facebook,
		twitter,
		instagram,
		linkedin,
	} = formData;

	const handleChange = (e) => {
		// console.log(e.target.name, e.target.value);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(createProfile(formData)).unwrap();
			// console.log('res', res);
			dispatch(setAlert('Profile Updated Successfully', 'success'));
			// history.push('/dashboard');
		} catch (err) {
			console.log('err', err);
			const { errors } = err;
			if (errors) {
				errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
			}
		}
	};
	// console.log('profile', profile);
	return isLoading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large tex-primary'>Edit Your Profile</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Let's edit your profile and make it more
				awesome
			</p>
			<small>* = required fields</small>

			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<select
						name='status'
						id='status'
						value={status}
						onChange={handleChange}
					>
						<option value='0'>* Select Professional Status</option>
						<option value='junior-dev'>Juinor Dev</option>
						<option value='senior-dev'>Senior Dev</option>
						<option value='manager'>Manager</option>
						<option value='student'>Student</option>
					</select>
					<small className='form-text'>Let us know your position</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='company'
						placeholder='Company'
						value={company}
						onChange={handleChange}
					/>
					<small className='form-text'>Owned or Hired</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='website'
						placeholder='Website URL'
						value={website}
						onChange={handleChange}
					/>
					<small className='form-text'>Portfolio</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='location'
						placeholder='Location'
						value={location}
						onChange={handleChange}
					/>
					<small className='form-text'>Country</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='skills'
						placeholder='Skills'
						value={skills}
						onChange={handleChange}
					/>
					<small className='form-text'>Please use comma separated values</small>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='githubUserName'
						placeholder='Github Username'
						value={githubUserName}
						onChange={handleChange}
					/>
					<small className='form-text'>
						Please provide your Github Username
					</small>
				</div>
				<div className='form-group'>
					<textarea
						name='bio'
						id='bio'
						placeholder='A short description about yourself'
						value={bio}
						onChange={handleChange}
					></textarea>
					<small className='form-text'>Please provide some info</small>
				</div>

				<div className='my-2'>
					<button
						type='button'
						className='btn btn-light'
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>
				{displaySocialInputs && (
					<Fragment>
						<div className='form-group social-input'>
							<i className='fab fa-twitter fa-2x'></i>
							<input
								type='text'
								name='twitter'
								placeholder='Twitter URL'
								value={twitter}
								onChange={handleChange}
							/>
						</div>
						<div className='form-group social-input'>
							<i className='fab fa-facebook fa-2x'></i>
							<input
								type='text'
								name='facebook'
								placeholder='Facebook URL'
								value={facebook}
								onChange={handleChange}
							/>
						</div>
						<div className='form-group social-input'>
							<i className='fab fa-youtube fa-2x'></i>
							<input
								type='text'
								name='youtube'
								placeholder='Youtube URL'
								value={youtube}
								onChange={handleChange}
							/>
						</div>
						<div className='form-group social-input'>
							<i className='fab fa-linkedin fa-2x'></i>
							<input
								type='text'
								name='linkedin'
								placeholder='LinkedIn URL'
								value={linkedin}
								onChange={handleChange}
							/>
						</div>
						<div className='form-group social-input'>
							<i className='fab fa-instagram fa-2x'></i>
							<input
								type='text'
								name='instagram'
								placeholder='Instagram URL'
								value={instagram}
								onChange={handleChange}
							/>
						</div>
					</Fragment>
				)}

				<input type='submit' value='Update' className='btn btn-primary my-1' />
				<Link to='/dashboard' className='btn btn-light my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default EditProfile;
