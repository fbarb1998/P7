import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostDetailPage.css'; // Import your CSS file

const PostDetailPage = () => {
  const { id } = useParams();  // Fetch the post ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]); // Make sure to include 'id' as a dependency

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the auth token from local storage
      const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the token to the headers
        }
      });
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error.response) {
        setError(error.response.data.error || 'Failed to load post.'); // More specific error handling
      } else {
        setError('Failed to load post. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading post...</p>;
  }

  return (
    <div className="post-detail-container">
      {error ? (
        <p className="error-message">{error}</p>
      ) : post ? (
        <>
          <h1 className="post-title">{post.title}</h1>
          {post.mediaUrl && (
            <div className="media-container">
              {/* Render images */}
              {post.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                <img
                  src={`http://localhost:3000${post.mediaUrl}`}
                  alt={post.title}
                  className="post-image"
                />
              ) : post.mediaUrl.match(/\.(mp4)$/i) ? (
                // Handle video
                <video controls className="post-video">
                  <source src={`http://localhost:3000${post.mediaUrl}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p>Unsupported media type.</p>
              )}
            </div>
          )}
          <p className="post-content">{post.content}</p>
        </>
      ) : (
        <p>No post found.</p>
      )}
    </div>
  );
};

export default PostDetailPage;
