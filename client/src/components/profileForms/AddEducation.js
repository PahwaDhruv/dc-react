import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import { addEducation } from '../../redux/actions/profileActions';
import { useHistory } from 'react-router-dom';

const AddEducation = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		school: '',
		degree: '',
		fieldOfStudy: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [disableToDate, toggleToDate] = useState(false);
	const { school, degree, fieldOfStudy, from, to, current, description } =
		formData;

	const handleChange = (e) => {
		// console.log([e.target.name], e.target.value);
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await dispatch(addEducation(formData)).unwrap();
			console.log('res', res);
			dispatch(setAlert('Education Added Successfully', 'success'));
			history.push('/dashboard');
		} catch (err) {
			const { errors } = err;
			if (errors) {
				errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
			}
		}
	};
	return (
		<Fragment>
			<h1 className='large tex-primary'>Add Your Education</h1>
			<p className='lead'>
				<i className='fas fa-branch'></i> Let's add your education
			</p>
			<small>* = required fields</small>

			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						name='school'
						value={school}
						onChange={handleChange}
						placeholder='* School or Institution'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='degree'
						value={degree}
						onChange={handleChange}
						placeholder='* Degree or Certificate'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='fieldOfStudy'
						value={fieldOfStudy}
						onChange={handleChange}
						placeholder='* Field of Study'
					/>
				</div>
				<div className='form-group'>
					<h4>From Date:</h4>
					<input type='date' name='from' value={from} onChange={handleChange} />
				</div>

				<div className='form-group'>
					<p>
						<input
							type='checkbox'
							name='current'
							value={current}
							checked={current}
							onChange={() => {
								setFormData({
									...formData,
									current: !current,
								});
								toggleToDate(!disableToDate);
							}}
						/>{' '}
						Current Institution
					</p>
				</div>
				<div className='form-group'>
					<h4>To Date:</h4>
					<input
						type='date'
						name='to'
						value={to}
						onChange={handleChange}
						disabled={disableToDate ? 'disabled' : ''}
					/>
				</div>
				<div className='form-group'>
					<textarea
						name='description'
						id=''
						cols='30'
						rows='5'
						placeholder='Description'
						value={description}
						onChange={handleChange}
					></textarea>
				</div>
				<input type='submit' value='Submit' className='btn btn-primary my-1' />
				<Link to='/dashboard' className='btn my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default AddEducation;
