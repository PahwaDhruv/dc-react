const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route- GET /api/auth
// @desc - Test Auth route
// @access - Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.status(200).json(user);
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
