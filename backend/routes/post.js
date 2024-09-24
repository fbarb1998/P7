// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer'); // Multer middleware for file upload
const postController = require('../controllers/post'); // Ensure this path is correct

// Fetch all posts
router.get('/', postController.getPosts);

// Create a new post
router.post('/', auth, multer, postController.createPost);

// Fetch a single post by ID
router.get('/:id', postController.getPostById);

// Mark a post as read
router.put('/:id/read', postController.markPostAsRead);

module.exports = router;
