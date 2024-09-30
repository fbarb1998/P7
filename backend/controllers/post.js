// Mark a post as read
exports.markPostAsRead = async (req, res) => {
  const { id } = req.params; // Get the post ID from request parameters
  const { userId } = req.body; // Get the user ID from the request body

  try {
    const post = await Post.findByPk(id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' }); // Return 404 if post is not found
    }

    // Check if the user has already marked the post as read
    const hasRead = post.readByUsers.includes(userId);

    // If the user hasn't read the post, add their ID to the readByUsers array
    if (!hasRead) {
      post.readByUsers.push(userId);
    }

    await post.save(); // Save the changes to the database

    res.status(200).json({ message: 'Post marked as read', post }); // Return success message
  } catch (error) {
    console.error('Error marking post as read:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
