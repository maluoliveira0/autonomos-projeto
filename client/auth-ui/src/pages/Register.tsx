import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:3000/api/auth';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'professional' }),
    });
    if (response.ok) {
      alert('Registration successful');
      navigate('/');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div className="w-full max-w-sm bg-white/10 p-8 rounded-xl shadow-lg backdrop-blur-sm text-white">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full border-2 border-white flex items-center justify-center text-4xl">
          📝
        </div>
      </div>
      <input
        className="w-full mb-4 p-3 rounded-md bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-300"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={handleRegister}
        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-full"
      >
        REGISTER
      </button>
      <p className="text-center mt-6 text-sm text-white/70">
        Already have an account?{' '}
        <span
          className="text-pink-300 hover:underline cursor-pointer"
          onClick={() => navigate('/')}
        >
          Login
        </span>
      </p>
    </div>
  );
}
