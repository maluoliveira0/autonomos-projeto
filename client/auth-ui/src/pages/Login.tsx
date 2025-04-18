import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

const API_URL = 'http://localhost:3000/api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      alert('Login successful');
      navigate('/home');
    } else {
      alert(data.message || 'Login failed');
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/10 p-8 shadow-lg backdrop-blur-sm text-white">
      <div className="flex flex-col justify-center items-center mb-6">
        <div className="w-60 h-60 overflow-hidden flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-full h-full object-cover" />
        </div>
      </div>

      <input
        className="w-full mb-4 p-3 rounded-md bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="w-full mb-4 p-3 rounded-md bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-full"
      >
        LOGIN
      </button>

      <p className="text-center mt-6 text-sm text-white/70">
        Crie sua conta{' '}
        <span
          className="text-pink-300 hover:underline cursor-pointer"
          onClick={() => navigate('/register')}
        >
          Cadastrar
        </span>
      </p>
    </div>
  );
}
