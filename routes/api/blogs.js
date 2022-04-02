const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Blog = require('../../models/Blog');
const Profile = require('../../models/Profile');

// @route- POST /api/blogs
// @desc - Create a Blog
// @access - Private
router.post(
	'/',
	[
		auth,
		[
			check('title', 'Title is required').not().isEmpty(),
			check('body', 'Body is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const profile = await Profile.findOne({ user: req.user.id });
			const BlogData = new Blog({
				title: req.body.title,
				body: req.body.body,
				author: user.name,
				imageUrl: profile ? profile.imageUrl : '',
				user: req.user.id,
			});
			const blog = await BlogData.save();
			res.json(blog);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- GET /api/blogs
// @desc - Get all blogs
// @access - Private
router.get('/', auth, async (req, res) => {
	try {
		const blogs = await Blog.find().sort({ date: -1 });
		res.json(blogs);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Internal Server Error');
	}
});

// @route- GET /api/blogs/:id
// @desc - Get blog by id
// @access - Private
router.get('/:blogId', auth, async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		if (!blog) {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.json(blog);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

// @route- DELETE /api/blogs/:blogId
// @desc - Delete a blogs
// @access - Private
router.delete('/:blogId', auth, async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		if (!blog) {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		//Allow Author only to delete a blog
		if (req.user.id !== blog.user.toString()) {
			return res.status(401).json({ msg: 'User Not Authorized' });
		}
		await blog.remove();
		res.json({ msg: 'Blog Deleted Successfully' });
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

// @route- PUT /api/blogs/like/:blogId
// @desc - Like a blog
// @access - Private
router.put('/like/:blogId', auth, async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		if (!blog) {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		if (
			blog.likes.filter((like) => like.user.toString() === req.user.id).length >
			0
		) {
			return res.status(400).json({ msg: 'Blog already liked' });
		}
		blog.likes.push({ user: req.user.id });
		await blog.save();
		res.json(blog.likes);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

// @route- PUT /api/blogs/unlike/:blogId
// @desc - Unlike a blog
// @access - Private
router.put('/unlike/:blogId', auth, async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		if (!blog) {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		//Check if Blog has already been liked or not
		if (
			blog.likes.filter((like) => like.user.toString() === req.user.id)
				.length === 0
		) {
			return res.status(400).json({ msg: 'Blog has not yet been liked' });
		}
		const idx = blog.likes
			.map((like) => like.user.toString())
			.indexOf(req.user.id);
		blog.likes.splice(idx, 1);
		await blog.save();
		res.json(blog.likes);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

// @route- POST /api/blogs/comment/:blogId
// @desc - Comment on a Blog
// @access - Private
router.post(
	'/comment/:blogId',
	[auth, [check('text', 'text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findById(req.user.id).select('-password');
			const blog = await Blog.findById(req.params.blogId);
			if (!blog) {
				return res.status(404).json({ msg: 'No Blog Found' });
			}
			const commentObj = {
				text: req.body.text,
				name: user.name,
				email: user.email,
				user: req.user.id,
			};
			blog.comments.unshift(commentObj);
			await blog.save();
			res.json(blog.comments);
		} catch (err) {
			console.error(err.message);
			if (err.kind === 'ObjectId') {
				return res.status(404).json({ msg: 'No Blog Found' });
			}
			res.status(500).send('Internal Server Error');
		}
	}
);

// @route- DELETE /api/blogs/comment/:blogId/:commentId
// @desc - Delete a comment
// @access - Private
router.delete('/:blogId/comment/:commentId', auth, async (req, res) => {
	try {
		const blog = await Blog.findById(req.params.blogId);
		if (!blog) {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		const comment = blog.comments.find(
			(comment) => comment.id === req.params.commentId
		);
		if (!comment) {
			return res.status(404).json({ msg: 'No Comment Found' });
		}
		//check user
		if (comment.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		const idx = blog.comments
			.map((comment) => comment.user.toString())
			.indexOf(req.user.id);
		blog.comments.splice(idx, 1);
		await blog.save();
		res.json(blog.comments);
	} catch (err) {
		console.error(err.message);
		if (err.kind === 'ObjectId') {
			return res.status(404).json({ msg: 'No Blog Found' });
		}
		res.status(500).send('Internal Server Error');
	}
});

module.exports = router;
