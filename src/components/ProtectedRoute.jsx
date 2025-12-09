import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useEmail } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { email } = useEmail();
  const location = useLocation();

  //if (loading) return null; // or a spinner while checking a token
  console.log("ProtectedRoute email:", email);
  if (!email) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  return children;
}
