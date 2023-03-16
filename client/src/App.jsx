import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Menu, MailOutlined } from 'antd';
import { useState } from 'react';

import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Tasks from "./components/Tasks";
import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

const App = () => {
  const [current, setCurrent] = useState('mail');
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  let location = useLocation();

  useEffect(() => {
    if (["/login", "/register"].includes(location.pathname)) {
      dispatch(clearMessage()); // clear message when changing location
    }
  }, [dispatch, location]);

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  return (
    <>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
