const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const sendEmail = require('../../utils/sendEmail');

// @route- POST /api/users/register
// @desc - Register a user
// @access - Public
router.post(
	'/register',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please use a valid email').isEmail(),
		check('password', 'Password must be 6 characters long').isLength({
			min: 6,
		}),
	],
	async (req, res) => {
		//Validate Bad Request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;
		try {
			//Check if user already exists
			let user = await User.findOne({ email });
			if (user) {
				res.status(400).json({
					errors: [
						{
							msg: 'User already exists',
						},
					],
				});
			} else {
				user = new User({ name, email, password });
				//Encrypt Password
				const salt = await bcrypt.genSalt(10);
				user.password = await bcrypt.hash(password, salt);
				//Save user to DB
				await user.save();

				const payload = {
					user: {
						id: user.id,
					},
				};
				jwt.sign(
					payload,
					process.env.SECRET,
					{ expiresIn: 3600 },
					async (err, token) => {
						if (err) throw err;
						// res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 * 1000 });
						await sendEmail({
							to: user.email,
							subject: 'Dev Central - Account Verification',
							name: user.name,
							url: `${process.env.BASE_URL}/api/users/verify/${token}`,
						});
						res
							.status(201)
							.json({ msg: 'Please check your mailbox to verify your email' });
					}
				);
			}
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- POST /api/users/register
// @desc - Register a user
// @access - Public
router.get('/verify/:token', (req, res) => {
	const { token } = req.params;
	if (token) {
		jwt.verify(token, process.env.SECRET, async function (err, decodedToken) {
			if (err) {
				return res.status(400).json({ msg: 'Incorrect or Expired link' });
			}
			const { user } = decodedToken;
			const { id } = user;
			try {
				let existingUser = await User.findOne({ _id: id });
				if (!existingUser) {
					return res.status(400).json({
						msg: 'User not found',
					});
				}
				await existingUser.updateOne({ _id: id, verified: true });
				res.status(200).json({ msg: 'Email Verified Successfully' });
			} catch (error) {
				console.log(error.message);
				res.status(500).send('Internal Server Error');
			}
		});
	} else {
		res.json({ msg: 'Invalid Token' });
	}
});

// @route- POST /api/users/login
// @desc - User login
// @access - Public
router.post(
	'/login',
	[
		check('email', 'Please use a valid email').isEmail(),
		check('password', 'Password is required').exists(),
	],
	async (req, res) => {
		//Validate Bad Request
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			//Check if user already exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				});
			}
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				});
			}

			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(
				payload,
				process.env.SECRET,
				{ expiresIn: 3600 },
				async (err, token) => {
					if (err) throw err;
					if (!user.verified) {
						await sendEmail({
							to: user.email,
							subject: 'Dev Central - Account Verification',
							name: user.name,
							url: `${process.env.BASE_URL}/api/users/verify/${token}`,
						});
						return res.status(200).json({
							msg: 'Email not verified. Please check your mailbox to verify it',
						});
					}
					res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 * 1000 });
					res.status(200).json({ token });
				}
			);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- POST /api/users/logout
// @desc - Logout a user
// @access - Private
router.get('/logout', auth, async (req, res) => {
	req.user = null;
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).json({ msg: 'success' });
});
module.exports = router;
