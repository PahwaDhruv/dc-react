import React from 'react';

const ProfileEducation = ({
	education: { school, degree, fieldOfStudy, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className='text-dark'>{school}</h3>
			<p>
				{from} - {to !== '' ? to : 'Present'}
			</p>
			<p>
				<strong>Degree: </strong>
				{degree}
			</p>
			<p>
				<strong>Field of Study: </strong>
				{fieldOfStudy}
			</p>
			<p>
				<strong>Description: </strong>
				{description}
			</p>
		</div>
	);
};

export default ProfileEducation;
