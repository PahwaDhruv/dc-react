const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const axios = require('axios');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route- GET /api/profile/me
// @desc - Get current user's profile
// @access - Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			'user',
			['name']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'No Profile Found' });
		}
		res.status(200).json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- POST /api/profile
// @desc - Create or update a user profile
// @access - Private
router.post(
	'/',
	[
		auth,
		[
			check('status', 'Status is required').not().isEmpty(),
			check('skills', 'Skills is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			bio,
			status,
			githubUserName,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;
		//Build Profile Object
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubUserName) profileFields.githubUserName = githubUserName;
		if (skills) {
			profileFields.skills = skills.split(',').map((skill) => skill.trim());
		}
		//Build Social Object
		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.twitter = twitter;
		if (facebook) profileFields.social.facebook = facebook;
		if (linkedin) profileFields.social.linkedin = linkedin;
		if (instagram) profileFields.social.instagram = instagram;
		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				return res.status(200).json(profile);
			}
			profile = new Profile(profileFields);
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- GET /api/profile
// @desc - Get all profiles
// @access - Private
router.get('/', async (req, res) => {
	try {
		const profiles = await Profile.find().populate('user', ['name']);
		res.json(profiles);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- GET /api/profile/user/:userId
// @desc - Get all profiles
// @access - Private
router.get('/user/:userId', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.userId }).populate(
			'user',
			['name']
		);
		if (!profile) {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.json(profile);
	} catch (err) {
		console.log(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Profile not found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

// @route- DELETE /api/profile
// @desc - Delete profile, user and posts
// @access - Private
router.delete('/', auth, async (req, res) => {
	try {
		//Remove user posts
		//Remove profile
		await Profile.findOneAndRemove({ user: req.user.id });
		//Remove user
		await User.findOneAndRemove({ _id: req.user.id });
		res.json({ msg: 'User Deleted' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- PUT /api/profile/experience
// @desc - Add profile experience
// @access - Private
router.put(
	'/experience',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('company', 'Company is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } =
			req.body;

		const newExp = {
			title,
			company,
			location,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.experience.unshift(newExp);
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- DELETE /api/profile/experience/:expId
// @desc - Delete profile experience
// @access - Private
router.delete('/experience/:expId', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		//Get removeIndex
		const idx = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.expId);

		profile.experience.splice(idx, 1);

		await profile.save();
		res.status(200).json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- PUT /api/profile/education
// @desc - Add profile education
// @access - Private
router.put(
	'/education',
	[
		auth,
		[
			check('school', 'School is required').not().isEmpty(),
			check('degree', 'Degree is required').not().isEmpty(),
			check('fieldOfStudy', 'Field of Study is required').not().isEmpty(),
			check('from', 'From Date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldOfStudy, from, to, current, description } =
			req.body;

		const newEdu = {
			school,
			degree,
			fieldOfStudy,
			from,
			to,
			current,
			description,
		};

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			profile.education.unshift(newEdu);
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- DELETE /api/profile/education/:ediId
// @desc - Delete profile education
// @access - Private
router.delete('/education/:eduId', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });
		//Get removeIndex
		const idx = profile.education
			.map((item) => item.id)
			.indexOf(req.params.eduId);

		profile.education.splice(idx, 1);

		await profile.save();
		res.status(200).json(profile);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- GET /api/profile/github/:username
// @desc - Fetch Github repos for a user
// @access - Public
router.get('/github/:username', async (req, res) => {
	const url = `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`;
	try {
		const result = await axios.get(url);
		res.status(200).json(result.data);
	} catch (err) {
		if (err.response && err.response.data) {
			return res.status(404).json({ msg: err.response.data.message });
		}
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
