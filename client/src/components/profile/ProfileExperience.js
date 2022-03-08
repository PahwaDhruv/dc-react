import React from 'react';

const ProfileExperience = ({
	experience: { company, title, location, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className='text-dark'>{company}</h3>
			<p>
				{from} - {to !== '' ? to : 'Present'}
			</p>
			<p>
				<strong>Position: </strong>
				{title}
			</p>
			<p>
				<strong>Description: </strong>
				{description}
			</p>
		</div>
	);
};

export default ProfileExperience;
