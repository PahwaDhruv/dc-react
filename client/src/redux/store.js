import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import alertReducer from './reducers/alertSlice';
import profileReducer from './reducers/profileSlice';
import blogReducer from './reducers/blogSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
		profile: profileReducer,
		blog: blogReducer,
	},
});
