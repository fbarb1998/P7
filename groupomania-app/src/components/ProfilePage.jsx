import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

        const userId = localStorage.getItem('userId');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Retrieve user ID from local storage
  //       const userId = localStorage.getItem('userId');

  //       if (!userId) {
  //         throw new Error('User ID not found');
  //       }

  //       // Fetch user data from API
  //       const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
  //       setUserData(response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //       setError('Failed to fetch user data. Please try again.');
  //     }
  //   };

  //   fetchUserData();
  // });

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      setLoading(true);

      try {
        // Retrieve user ID from local storage
        const userId = localStorage.getItem('userId');

        if (!userId) {
          throw new Error('User ID not found');
        }

        // Send DELETE request to the API
        // FIXME add auth token to delete request
        await axios.delete(`http://localhost:3000/api/${userId}`);

        // Clear user data from local storage
        localStorage.removeItem('userId');
        localStorage.removeItem('authToken'); // If you store auth tokens or other data

        // Log the user out and redirect to the signup page
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

      {/* {userData ? ( */}
        <div>
          {/* Display the profile picture */}
          {/* <div style={{ marginBottom: '20px' }}>
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
          <p><strong>Total Likes:</strong> {userData.likesCount || 0}</p> */}

          <button onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </button>
        </div>
       {/* ) : (
        !loading && <p>No user data available.</p>
     )} */}
    </div>
  );
};

export default ProfilePage;
