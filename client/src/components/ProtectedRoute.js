import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ role, children }) => {
  const user = useSelector((state) => state.Auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
