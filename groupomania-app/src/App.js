import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.js';
import SignUpPage from './pages/SignUpPage.js';
import UserProfilePage from './pages/UserProfilePage.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import './styles/App.css';


const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile/:userId" element={<UserProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
};


export default App;
