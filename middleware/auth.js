const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
	//Get token from cookie
	const token = req.cookies ? req.cookies.jwt : '';
	if (!token) {
		return res.status(401).json({ msg: 'Token not present' });
	}
	//verify token
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		req.user = decodedToken.user;
		next();
	} catch (err) {
		res.status(401).json({ msg: 'Token not valid' });
	}
};
