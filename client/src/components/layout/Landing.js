import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
	return (
		<section className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1 className='x-large'>Dev Central</h1>
					<p className='lead'>
						Create Blog Posts, portfolis and connect with other developers on
						the Internet
					</p>
					<div className='buttons'>
						<Link to='/register' className='btn btn-primary'>
							Register
						</Link>
						<Link to='/login' className='btn'>
							Login
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
