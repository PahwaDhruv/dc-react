import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = ({
	profile: {
		user: { _id, name },
		status,
		company,
		location,
		skills,
		imageUrl,
	},
}) => {
	return (
		<div className='profile bg-light'>
			<img
				src={imageUrl}
				alt='Profile'
				className='round-image'
				style={{ width: '200px', height: '200px' }}
			/>
			<div>
				<h2>{name}</h2>
				<div>
					{status} {company && <span>at {company}</span>}
				</div>
				<div>{location && <span>{location}</span>}</div>
				<Link to={`/profile/${_id}`} className='btn btn-primary'>
					View Profile
				</Link>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, idx) => (
					<li key={idx} className='text-primary'>
						<i className='fas fa-check'></i> {skill}
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProfileItem;
