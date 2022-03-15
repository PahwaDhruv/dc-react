const nodemailer = require('nodemailer');

module.exports = async (user) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.AUTH_EMAIL,
				pass: process.env.AUTH_PASS,
			},
		});
		await transporter.sendMail({
			from: `"Dev Central" <${process.env.AUTH_EMAIL}>`,
			to: user.email,
			// cc: process.env.AUTH_EMAIL,
			subject: 'Dev Central - Account Verification',
			html: `
            <h3>Hello ${user.name},</h3>
            <p>Please click <a href='${process.env.BASE_URL}/user/${user._id}/activate' target="_blank">here</a> to verify your email.</p>
            `,
		});
	} catch (err) {
		console.log(err);
	}
};
