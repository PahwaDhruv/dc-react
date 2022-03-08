import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
	const authState = useSelector((state) => state.auth);
	const { isAuthenticated, isLoading } = authState;
	return (
		<Route
			{...rest}
			render={(props) =>
				!isLoading && !isAuthenticated ? (
					<Redirect to='/login' />
				) : (
					<Component {...props}></Component>
				)
			}
		></Route>
	);
};

export default PrivateRoute;
