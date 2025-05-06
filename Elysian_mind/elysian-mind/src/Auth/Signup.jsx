import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import myImage from '../assets/logo.png';

const Signup = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName || !email || !password || !age || !gender) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName,email, password, age, gender }),
      });

      if (response.ok) {
        alert('Signup successful! Redirecting to login...');
        navigate('/login');
      } else {
        const error = await response.json();
        setErrorMessage(error.message || 'Signup failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.'+error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1>Create Your Account</h1>
          <p className="subtitle">Begin your journey to mental wellness</p>
          
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                max="120"
              />
            </div>

            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:border-blue-400 focus:bg-white"
              >
                <option value="">Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="signup-link">
              Log in
            </Link>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Elysian Mind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Signup;