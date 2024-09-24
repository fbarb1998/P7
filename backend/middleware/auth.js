import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          setError('User ID not found. Please log in again.');
          navigate('/login');
          return;
        }

        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setDeleteLoading(true); // Set loading state for deletion

      try {
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found');
        }

        await axios.delete(`http://localhost:3000/api/users/${userId}`);
        localStorage.removeItem('userId');
        localStorage.removeItem('authToken');
        navigate('/signup');
      } catch (error) {
        console.error('Error deleting account:', error);
        setError('Failed to delete account. Please try again.');
      } finally {
        setDeleteLoading(false); // Reset loading state for deletion
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
          <div style={{ marginBottom: '20px' }}>
            <img
              src={userData.profilePicture || 'https://via.placeholder.com/150'} // Use a default placeholder URL
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover' }}
            />
          </div>

          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>About:</strong> {userData.about || 'No information provided'}</p>
          <p><strong>Total Posts:</strong> {userData.postsCount || 0}</p>
          <p><strong>Total Likes:</strong> {userData.likesCount || 0}</p>

          <button onClick={handleDelete} disabled={deleteLoading}>
            {deleteLoading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
      ) : (
        !loading && <p>No user data available.</p>
      )}
    </div>
  );
};

export default ProfilePage;
