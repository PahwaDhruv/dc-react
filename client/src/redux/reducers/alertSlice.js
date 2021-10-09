import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	alerts: [],
};

export const alertSlice = createSlice({
	name: 'alert',
	initialState,
	reducers: {
		addAlert: (state, action) => {
			state.alerts.push(action.payload);
		},
		removeAlert: (state, action) => {
			const idx = state.alerts.map((alert) => alert.id).indexOf(action.payload);
			if (idx > -1) {
				state.alerts.splice(idx, 1);
			}
		},
	},
});

export const { addAlert, removeAlert } = alertSlice.actions;

export default alertSlice.reducer;
