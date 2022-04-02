import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated, isLoading } = authState;
	const authLinks = (
		<ul>
			<li>
				<NavLink to='/profiles' activeClassName='selected'>
					Developers
				</NavLink>
			</li>
			<li>
				<NavLink to='/blogs' activeClassName='selected'>
					Blogs
				</NavLink>
			</li>
			<li>
				<NavLink to='/dashboard' activeClassName='selected'>
					<i className='fas fa-user'></i>{' '}
					<span className='hide-sm'>Dashboard</span>
				</NavLink>
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
				<NavLink exact to='/profiles' activeClassName='selected'>
					Developers
				</NavLink>
			</li>
			<li>
				<NavLink to='/register' activeClassName='selected'>
					Register
				</NavLink>
			</li>
			<li>
				<NavLink to='/login' activeClassName='selected'>
					Login
				</NavLink>
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
