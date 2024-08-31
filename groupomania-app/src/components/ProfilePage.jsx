import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = ({ user }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${user.id}`);
        navigate('/signup'); // Redirect to sign-up page or another page
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  return (
    <div>
      <h1>{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <button onClick={handleDelete}>Delete Account</button>
    </div>
  );
};

export default ProfilePage;
