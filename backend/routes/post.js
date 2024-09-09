// routes/post.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const postController = require('../controllers/post');

// Define routes for posts
router.get('/', postController.getPosts);

router.post('/', upload, postController.createPost);

module.exports = router;
