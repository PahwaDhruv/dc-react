import React, { Fragment } from 'react';
import { setAlert } from '../../redux/actions/alertActions';
import { deleteExperience } from '../../redux/actions/profileActions';
import { useDispatch } from 'react-redux';

const Experience = ({ experience }) => {
	// console.log('exp', experience);
	const dispatch = useDispatch();
	const experiences = experience.map((exp) => (
		<tr key={exp._id}>
			<td>{exp.company}</td>
			<td className='hide-sm'>{exp.title}</td>
			<td className='hide-sm'>
				{exp.from} - {exp.to !== '' ? exp.to : 'Present'}
			</td>
			<td>
				<button
					className='btn btn-danger'
					onClick={() => handleDelete(exp._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	));

	const handleDelete = async (expId) => {
		try {
			const res = await dispatch(deleteExperience({ expId }));
			console.log('res', res);
			dispatch(setAlert('Experience Removed Successfully', 'success'));
		} catch (err) {
			console.log(err);
			dispatch(
				setAlert(
					'OOPS! Something went wrong. Please try after sometime',
					'danger'
				)
			);
		}
	};
	return (
		experience.length > 0 && (
			<Fragment>
				<h2 className='my-2'>Experience Details:</h2>
				<table className='table'>
					<thead>
						<tr>
							<th>Company</th>
							<th className='hide-sm'>Title</th>
							<th className='hide-sm'>Duration</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{experiences}</tbody>
				</table>
			</Fragment>
		)
	);
};

export default Experience;
