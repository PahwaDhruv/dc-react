import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated, isLoading } = authState;
	const authLinks = (
		<ul>
			<li>
				<Link to='/dashboard'>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</Link>
			</li>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/logout'>
					<i className='fas fa-sign-out-alt'></i>{' '}
					<span className='hide-sm'>Logout</span>
				</Link>
			</li>
		</ul>
	);
	const guestLinks = (
		<ul>
			<li>
				<Link to='/profiles'>Developers</Link>
			</li>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	return (
		<nav className='navbar bg-dark'>
			<h1>
				<Link to='/'>
					<i className='fas fa-code'></i> DevCentral
				</Link>
			</h1>
			{!isLoading && (
				<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

export default Navbar;
