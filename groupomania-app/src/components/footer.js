import React from 'react';
import './Footer.css'; // Optional: Create a CSS file for styling

const Footer = () => {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Groupomania. All rights reserved.</p>
      <p>
        <a href="/privacy">Privacy Policy</a> | <a href="/terms">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
