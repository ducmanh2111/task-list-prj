import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, redirect } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Tasks from "./components/Tasks";
import PrivateRoute from "./routes/PrivateRoute";
import AuthService from "./services/auth.service";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('user_info');

  
  useEffect(() => {
    if (!isLoggedIn && !['/login', '/register'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [location])

  const signOut = () => {
    AuthService.logout();
    redirect('/login');
  }
  
  return (
    <>
      <div className="container mt-3">
        <Routes>
          <Route
            path='/tasks'
            element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
