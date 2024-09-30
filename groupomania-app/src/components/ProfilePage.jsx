import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const userId = localStorage.getItem('userId');
  const authToken = localStorage.getItem('token'); // Assuming auth token is stored

  // Check if authToken and userId exist
  useEffect(() => {
    if (!userId || !authToken) {
      setError('User is not authenticated. Please log in.');
      return;
    }
    fetchUserData();
  }, [userId, authToken]);

  // Fetch user data from API
  const fetchUserData = async () => {
    setLoading(true);
    try {
      if (!userId) {
        throw new Error('User ID not found');
      }

      const response = await axios.get(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`, // Include auth token if needed
        },
      });

      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);

      try {
        if (!userId) {
          throw new Error('User ID not found');
        }

        await axios.delete(`http://localhost:3000/api/auth/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        // Clear user data and token from local storage
        localStorage.removeItem('userId');
        localStorage.removeItem('token');

        // Redirect to signup page after account deletion
        navigate('/signup');
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('Failed to delete account. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData ? (
        <div>
          {/* Display the profile picture */}
          <div style={{ marginBottom: '20px' }}>
            <img
              src={userData.profilePicture || 'default-profile-picture-url'}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>About:</strong> {userData.about || 'No information provided'}</p>
          <p><strong>Total Posts:</strong> {userData.postsCount || 0}</p>
          <p><strong>Total Likes:</strong> {userData.likesCount || 0}</p>


        </div>
      ) : (
        !loading && <p>No user data available.</p>
      )}
      <button onClick={handleDelete} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Account'}
      </button>

    </div>
  );
};

export default ProfilePage;
