import React, { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { setAlert } from '../../redux/actions/alertActions';
import { addExperience } from '../../redux/actions/profileActions';

const AddExperience = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: '',
	});

	const [disableToDate, toggleToDate] = useState(false);
	const { company, title, location, from, to, current, description } = formData;
	const [disableBtn, setDisableBtn] = useState(false);
	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		setDisableBtn(true);
		e.preventDefault();
		try {
			const res = await dispatch(addExperience(formData)).unwrap();
			console.log('res', res);
			dispatch(setAlert('Experience Added Successfully', 'success'));
			history.push('/dashboard');
		} catch (err) {
			const { errors } = err;
			if (errors) {
				errors.forEach((e) => dispatch(setAlert(e.msg, 'danger')));
			}
			setDisableBtn(false);
		}
	};
	return (
		<Fragment>
			<h1 className='large tex-primary'>Add Your Experience</h1>
			<p className='lead'>
				<i className='fas fa-branch'></i> Let's add some Work Experience
			</p>
			<small>* = required fields</small>

			<form className='form' onSubmit={handleSubmit}>
				<div className='form-group'>
					<input
						type='text'
						name='title'
						value={title}
						onChange={handleChange}
						placeholder='* Job Tilte'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='company'
						value={company}
						onChange={handleChange}
						placeholder='Company'
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='location'
						value={location}
						onChange={handleChange}
						placeholder='Location'
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
						Current Job
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
						placeholder='Job Description'
						value={description}
						onChange={handleChange}
					></textarea>
				</div>
				<input
					type='submit'
					className='btn btn-primary my-1'
					value={disableBtn ? 'Please wait...' : 'Submit'}
				/>
				<Link to='/dashboard' className='btn my-1'>
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

export default AddExperience;
