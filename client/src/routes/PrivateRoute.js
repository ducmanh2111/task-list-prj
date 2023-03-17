import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const user_info = localStorage.getItem('user_info');
  if (!user_info) {
    return <Navigate to='/login' replace />
  }

  return children;
}
