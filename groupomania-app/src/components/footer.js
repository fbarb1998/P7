import React from 'react';
import '../styles/footer.css'; // 

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
