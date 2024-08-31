import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from '../components/LandingPage';
import HomePage from '../components/HomePage';
import ProfilePage from '../components/ProfilePage';
import { AuthProvider } from '../context/AuthContext';
import '../styles/App.css'; // Adjust the path if needed
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
