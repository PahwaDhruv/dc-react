import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import alertReducer from './reducers/alertSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		alert: alertReducer,
	},
});
