import React, { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Tasks from "./components/Tasks";
import TaskDetail from "./components/TaskDetail";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem('user_info');

  useEffect(() => {
    if (!isLoggedIn && !['/login', '/register'].includes(location.pathname)) {
      navigate("/login");
    }
  }, [location, isLoggedIn, navigate])

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
          <Route
            path='/tasks/:taskId'
            element={
              <PrivateRoute>
                <TaskDetail />
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
