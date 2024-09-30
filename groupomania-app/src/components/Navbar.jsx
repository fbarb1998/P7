import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Make sure this path is correct
import '../styles/Navbar.css'; // Ensure this CSS file exists

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth(); // Access user state and logout function
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token'); // Fetch auth token from local storage

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Call logout function from Auth context
      localStorage.removeItem('userId'); // Clear user data from local storage
      localStorage.removeItem('token'); // Clear auth token if stored
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Groupomania</Link>
        {user && (
          <button className="navbar-toggle" onClick={toggleNavbar}>
            ☰
          </button>
        )}
      </div>
      <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
        {/* Conditional rendering based on whether the user is logged in or not */}
        {user ? (
          <>
            <Link to="/forum">Forum</Link>
            <Link to="/profile">Profile</Link>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
