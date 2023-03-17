import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ children, ...rest }) {
  const user_info = localStorage.getItem('user_info');
  return (
    user_info ? <Outlet /> : <Navigate to='/login' />
  )
}
