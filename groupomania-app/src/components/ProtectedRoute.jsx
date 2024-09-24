// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const { user } = useAuth();
  return user ? Element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
