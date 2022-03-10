import React from 'react';

const ProfileTop = ({
	profile: {
		user: { name },
		status,
		company,
		location,
		website,
		social,
		imageUrl,
	},
}) => {
	// let src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
	return (
		<div className='profile-top bg-primary p-2'>
			<img
				src={imageUrl}
				className='round-image my-1'
				alt='Profile Photo'
				style={{ width: '200px', height: '200px' }}
			/>
			<h1 className='large'>{name}</h1>
			<p className='lead'>
				{status} {company && <span> at {company}</span>}{' '}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div className='icons my-1'>
				{website && (
					<a href={website} target='_blank' rel='noopener noreferrer'>
						<i className='fas fa-globe fa-2x'></i>
					</a>
				)}
				{social && social.twitter && (
					<a href={social.twitter} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-twitter fa-2x'></i>
					</a>
				)}
				{social && social.facebook && (
					<a href={social.facebook} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-facebook fa-2x'></i>
					</a>
				)}
				{social && social.linkedin && (
					<a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-linkedin fa-2x'></i>
					</a>
				)}
				{social && social.instagram && (
					<a href={social.instagram} target='_blank' rel='noopener noreferrer'>
						<i className='fab fa-instagram fa-2x'></i>
					</a>
				)}
			</div>
		</div>
	);
};

export default ProfileTop;
