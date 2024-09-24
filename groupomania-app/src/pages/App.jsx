import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LandingPage from '../components/LandingPage';
import ForumPage from './ForumPage';
import PostDetailPage from '../components/PostDetailPage';
import NewPostPage from './NewPostPage';
import ProfilePage from '../components/ProfilePage';
import LoginPage from './LoginPage';
import SignUpPage from './SignupPage';
import { AuthProvider } from '../context/AuthContext';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from '../components/ProtectedRoute';


const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/forum" element={<ProtectedRoute element={<ForumPage />} />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/new-post" element={<ProtectedRoute element={<NewPostPage />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
