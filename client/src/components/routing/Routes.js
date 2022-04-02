import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Register from '../auth/Register';
import Login from '../auth/Login';
import PrivateRoute from '../auth/PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import Logout from '../auth/Logout';
import CreateProfile from '../profileForms/CreateProfile';
import EditProfile from '../profileForms/EditProfile';
import AddExperience from '../profileForms/AddExperience';
import AddEducation from '../profileForms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import NotFound from '../layout/NotFound';
import Alert from '../layout/Alert';
import Blogs from '../blogs/Blogs';
import AddBlog from '../blogs/AddBlog';

const Routes = () => {
	return (
		<section className='container'>
			<Alert />
			<Switch>
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/profiles' component={Profiles} />
				<Route exact path='/profile/:id' component={Profile} />
				<PrivateRoute exact path='/dashboard' component={Dashboard} />
				<PrivateRoute exact path='/create-profile' component={CreateProfile} />
				<PrivateRoute exact path='/createBlog' component={AddBlog} />
				<PrivateRoute exact path='/edit-profile' component={EditProfile} />
				<PrivateRoute exact path='/add-experience' component={AddExperience} />
				<PrivateRoute exact path='/add-education' component={AddEducation} />
				<PrivateRoute exact path='/blogs' component={Blogs} />
				<Route exact path='/logout' component={Logout} />
				<Route component={NotFound}></Route>
			</Switch>
		</section>
	);
};

export default Routes;
