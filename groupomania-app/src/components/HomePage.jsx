import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css'; // Ensure this CSS file exists for styling

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Groupomania</h1>
        <p>Your go-to platform for connecting with colleagues and staying updated.</p>
      </header>
      <main className="home-main">
        <section className="home-intro">
          <h2>About Us</h2>
          <p>Groupomania is a modern internal social network designed to enhance communication and engagement within your company.</p>
        </section>
        <section className="home-actions">
          <h2>Get Started</h2>
          <p>Ready to dive in? Choose an option below to get started:</p>
          <div className="home-links">
            <Link to="/login" className="home-link">Login</Link>
            <Link to="/signup" className="home-link">Sign Up</Link>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2024 Groupomania. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
