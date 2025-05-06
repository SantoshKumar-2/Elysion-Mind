import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import myImage from '../assets/logo.png';
import api from '../util/api.js';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);
      navigate('/dashboard'); // Redirect after successful login
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed, please try again.');
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <img src={myImage} alt="MindHaven Logo" />
            <span>Elysian Mind</span>
          </div>
          <div className="nav-links">
          <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>
            <a href="/login" className="cta-button login">Login</a>
            <a href="/signup" className="cta-button signup">Signup</a>
          </div>
        </div>
      </nav>

      <div className="auth-container">
        <div className="auth-content">
          <h1>Welcome back</h1>
          <p className="subtitle">Please enter your details</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Sign in
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? 
              <a href="/signup" className="signup-link"> Create account</a>
            </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Elysian Mind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;