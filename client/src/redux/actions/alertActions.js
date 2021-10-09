import { addAlert, removeAlert } from '../reducers/alertSlice';
import { v4 as uuid } from 'uuid';

export const setAlert =
	(text, type, timeout = 3000) =>
	(dispatch) => {
		const alert = {
			id: uuid(),
			text,
			type,
		};
		dispatch(addAlert(alert));
		setTimeout(() => {
			dispatch(removeAlert(alert.id));
		}, timeout);
	};
