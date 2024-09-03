import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForumPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePost = async () => {
    try {
      await axios.post('http://localhost:3000/api/posts', { content: newPost });
      setNewPost('');
      // Refresh posts after new post
      const response = await axios.get('http://localhost:3000/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error posting content:', error);
    }
  };

  return (
    <div>
      <h1>Forum</h1>
      <textarea
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        placeholder="Write something..."
      />
      <button onClick={handlePost}>Post</button>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForumPage;
