import React from 'react';
import '../styles/header.css'; // Optional: Create a CSS file for styling

const Header = () => {
  return (
    <header className="app-header">
      <h1>Groupomania</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/posts">Posts</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Sign up</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
