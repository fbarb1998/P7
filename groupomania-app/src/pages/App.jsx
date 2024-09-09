// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import ForumPage from './ForumPage';
import NewPostPage from './NewPostPage';
import ProfilePage from '../components/ProfilePage';
import LoginPage from './LoginPage'; 
import { AuthProvider } from '../context/AuthContext';
import '../styles/App.css'; // Adjust the path if needed
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/new-post" element={<NewPostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
