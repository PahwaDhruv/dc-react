import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
	const alertState = useSelector((state) => state.alert);
	const { alerts } = alertState;
	return (
		alerts !== null &&
		alerts.length > 0 &&
		alerts.map((alert) => (
			<div key={alert.id} className={`alert alert-${alert.type}`}>
				{alert.text}
			</div>
		))
	);
};

export default Alert;
