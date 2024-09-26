import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import ToDoList from './ToDoList';
import Login from './Login';
import Register from './Register';
import './index.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/todos" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/todos" /> : <Register />} />
          <Route path="/todos" element={user ? <ToDoList /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
