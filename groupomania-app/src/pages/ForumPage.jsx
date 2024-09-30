import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // For navigating to full post details
import axios from 'axios';
import '../styles/ForumPage.css'; // Assuming you create a CSS file for styles

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('userId', localStorage.getItem("userId"));

    if (file) {
      formData.append('media', file);
    }

    try {
      await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        },
      });

      // Reset form fields
      setTitle('');
      setContent('');
      setFile(null);
      setError('');

      // Refresh posts after new post
      fetchPosts();
    } catch (error) {
      console.error('Error posting content:', error);
      setError('Failed to post content. Please try again.');
    }
  };

  return (
    <div className="forum-container">
      <h1>Forum</h1>

      {/* Post Form */}
      <form onSubmit={handlePost} className="post-form">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="form-input"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write something..."
          className="form-textarea"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="file-input"
        />
        <button
          type="submit"
          disabled={!title.trim() || !content.trim()}
          className="post-button"
        >
          Post
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>

      {/* Display Posts */}
      <div className="posts-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              {post.mediaUrl && (
                <img
                  src={`http://localhost:3000${post.mediaUrl}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
};

export default ForumPage;
