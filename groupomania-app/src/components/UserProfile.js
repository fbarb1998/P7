import React, { useState, useEffect } from 'react';
import { getUsers, getPosts } from '../services/api';

const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const users = await getUsers(); // Fetch all users
        const currentUser = users.find((user) => user.id === userId); // Find the user by ID
        setUser(currentUser);

        const userPosts = await getPosts(); // Fetch all posts
        setPosts(userPosts.filter((post) => post.userId === userId)); // Filter posts by user ID
      } catch (err) {
        setError('Error fetching user profile or posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {user ? (
        <>
          <h1>{user.name}'s Profile</h1>
          <p>Email: {user.email}</p>
          <h2>Posts</h2>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts available.</p>
          )}
        </>
      ) : (
        <p>User not found.</p>
      )}
    </div>
  );
};

export default UserProfile;
