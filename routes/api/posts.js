const express = require('express')
const router = express.Router()

// @route- GET /api/posts
// @desc - List all posts
// @access - Public
router.get('/', (req, res) => {
    return res.send('Posts Route')
})

module.exports = router