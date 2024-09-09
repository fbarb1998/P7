// controllers/post.js
const Post = require('../models/Post');

// Fetch all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  let mediaUrl = null;

  if (req.file) {
    mediaUrl = `/uploads/${req.file.filename}`;
  }

  try {
    const post = await Post.create({
      title,
      content,
      mediaUrl,
      userId,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
