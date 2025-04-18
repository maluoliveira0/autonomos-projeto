import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center px-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}