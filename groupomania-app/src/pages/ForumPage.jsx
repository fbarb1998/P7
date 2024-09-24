import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // For navigating to full post details
import axios from 'axios';

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
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts.');
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
      setError('Failed to post content.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Forum</h1>

      {/* Post Form */}
      <form onSubmit={handlePost} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write something..."
            style={{ width: '100%', height: '100px', padding: '10px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ width: '100%', padding: '10px' }}
          />
        </div>
        <button
          type="submit"
          disabled={!title.trim() || !content.trim()}
          style={{ padding: '10px 20px', cursor: 'pointer' }}
        >
          Post
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>

      {/* Display Posts */}
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
              {/* Show title and image only */}
              <Link to={`/posts/${post.id}`}>
                <h2>{post.title}</h2>
              </Link>
              {post.mediaUrl && (
                <img
                  src={`http://localhost:3000${post.mediaUrl}`}
                  alt={post.title}
                  style={{ maxWidth: '100%', marginTop: '10px' }}
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
