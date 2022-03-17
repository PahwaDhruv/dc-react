const nodemailer = require('nodemailer');

module.exports = async ({ to, subject, name, url }) => {
	try {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			// host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.AUTH_USER,
				pass: process.env.AUTH_PASS,
			},
		});
		await transporter.sendMail({
			from: `"Dev Central" <${process.env.AUTH_USER}>`,
			to: to,
			// cc: process.env.AUTH_EMAIL,
			subject: subject,
			html: `
            <h3>Hello ${name},</h3>
            <p>Please click <a href=${url} target="_blank">here</a> to verify your email.</p>
			<p>
				<div>Regards</div>
				<h3>Team Dev Central</h3>
			</p>
            `,
		});
	} catch (err) {
		console.log(err);
	}
};
