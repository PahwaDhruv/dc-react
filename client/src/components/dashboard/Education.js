import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/actions/profileActions';
import { setAlert } from '../../redux/actions/alertActions';
const Education = ({ education }) => {
	const dispatch = useDispatch();
	const qualifications = education.map((edu) => (
		<tr key={edu._id}>
			<td>{edu.school}</td>
			<td className='hide-sm'>{edu.degree}</td>
			<td className='hide-sm'>
				{edu.from} - {edu.to !== '' ? edu.to : 'Present'}
			</td>
			<td>
				<button
					className='btn btn-danger'
					onClick={() => handleDelete(edu._id)}
				>
					Delete
				</button>
			</td>
		</tr>
	));

	const handleDelete = async (eduId) => {
		if (window.confirm('Are you sure you want to delete your education?')) {
			try {
				const res = await dispatch(deleteEducation({ eduId }));
				console.log('res', res);
				dispatch(setAlert('Education Removed Successfully', 'success'));
			} catch (err) {
				console.log(err);
				dispatch(
					setAlert(
						'OOPS! Something went wrong. Please try after sometime',
						'danger'
					)
				);
			}
		}
	};
	return (
		education.length > 0 && (
			<Fragment>
				<h2 className='my-2'>Education Details:</h2>
				<table className='table'>
					<thead>
						<tr>
							<th>Institution</th>
							<th className='hide-sm'>Degree</th>
							<th className='hide-sm'>Duration</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>{qualifications}</tbody>
				</table>
			</Fragment>
		)
	);
};

export default Education;
