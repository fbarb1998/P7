import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header.css';
import { AuthContext } from '../context/AuthContext'; // Assuming you have an AuthContext for authentication state

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="app-header">
      <h1>Groupomania</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isAuthenticated ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/posts">Posts</Link></li>
              <li><button onClick={logout}>Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
