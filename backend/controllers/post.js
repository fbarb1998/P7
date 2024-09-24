// controllers/postController.js
const Post = require('../models/Post');

// Fetch all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.status(200).json(posts); // Return a 200 status code with the posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    let mediaUrl = null;

    // If a file is uploaded, set the mediaUrl to the file path
    if (req.file) {
      mediaUrl = `/uploads/${req.file.filename}`; // Store the relative path
    }

    // Ensure userId is an integer
    const newPost = await Post.create({
      title,
      content,
      mediaUrl,
      userId: parseInt(userId, 10),
    });

    res.status(201).json({ post: newPost }); // Return the created post with 201 status
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

// Fetch a single post by ID
exports.getPostById = async (req, res) => {
  const { id } = req.params; // Get the post ID from request parameters

  try {
    const post = await Post.findByPk(id); // Use findByPk to get the post by primary key
    if (!post) {
      return res.status(404).json({ error: 'Post not found' }); // Return 404 if post is not found
    }
    res.status(200).json(post); // Return the found post
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mark a post as read
exports.markPostAsRead = async (req, res) => {
  const { id } = req.params; // Get the post ID from request parameters

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' }); // Return 404 if post is not found
    }

    // Assuming you have a 'read' field in your model to mark as read
    post.read = true; // Mark the post as read
    await post.save(); // Save the changes to the database

    res.status(200).json({ message: 'Post marked as read', post }); // Return success message
  } catch (error) {
    console.error('Error marking post as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
