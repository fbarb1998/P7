import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/PostDetailPage.css'; // Import your CSS file

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(0); // State for storing like count
  const [hasLiked, setHasLiked] = useState(false); // State to track if the user has already liked the post

  useEffect(() => {
    fetchPost();
  }, [id]); // Fetch post when the component mounts or when the post ID changes

  const fetchPost = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the auth token from local storage
      const response = await axios.get(`http://localhost:3000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Add the token to the headers
        }
      });
      setPost(response.data);
      setLikeCount(response.data.likesCount || 0); // Set the like count from the response
      setHasLiked(response.data.hasLiked || false); // Assume you get a flag indicating if the user liked it
    } catch (error) {
      console.error('Error fetching post:', error);
      if (error.response) {
        setError(error.response.data.error || 'Failed to load post.');
      } else {
        setError('Failed to load post. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const likePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/posts/${id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLikeCount(response.data.likesCount);
      setHasLiked(true);
    } catch (error) {
      console.error('Error liking the post:', error);
    }
  };

  const unlikePost = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:3000/api/posts/${id}/unlike`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setLikeCount(response.data.likesCount);
      setHasLiked(false);
    } catch (error) {
      console.error('Error unliking the post:', error);
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
              {post.mediaUrl.match(/\.(jpeg|jpg|png|gif)$/i) ? (
                <img
                  src={`http://localhost:3000${post.mediaUrl}`}
                  alt={post.title}
                  className="post-image"
                />
              ) : post.mediaUrl.match(/\.(mp4)$/i) ? (
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

          {/* Likes and button positioned at the bottom right */}
          <div className="likes-container">
            <span className="likes-count">{likeCount} Likes</span>
            {hasLiked ? (
              <button className="unlike-button" onClick={unlikePost}>
                Unlike
              </button>
            ) : (
              <button className="like-button" onClick={likePost}>
                Like
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No post found.</p>
      )}
    </div>
  );
};

export default PostDetailPage;
