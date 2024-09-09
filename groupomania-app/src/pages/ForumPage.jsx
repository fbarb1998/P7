import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState('');

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

    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
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

  const handleEditPost = async (postId) => {
    if (!editContent.trim()) {
      setError('Edited content cannot be empty.');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/posts/${postId}`, { content: editContent });
      setEditPostId(null);
      setEditContent('');
      fetchPosts(); // Refresh posts after editing
    } catch (error) {
      console.error('Error editing post:', error);
      setError('Failed to edit post.');
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${postId}`);
      fetchPosts(); // Refresh posts after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Forum</h1>
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

      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
              {editPostId === post.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ width: '100%', height: '100px', padding: '10px' }}
                  />
                  <button
                    onClick={() => handleEditPost(post.id)}
                    style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditPostId(null);
                      setEditContent('');
                    }}
                    style={{ marginTop: '10px', marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.content}</p>
                  {post.mediaUrl && <img src={`http://localhost:3000${post.mediaUrl}`} alt={post.title} style={{ maxWidth: '100%' }} />}
                  <button
                    onClick={() => {
                      setEditPostId(post.id);
                      setEditContent(post.content);
                    }}
                    style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    style={{ marginTop: '10px', marginLeft: '10px', padding: '10px 20px', cursor: 'pointer', backgroundColor: 'red', color: 'white' }}
                  >
                    Delete
                  </button>
                </>
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
