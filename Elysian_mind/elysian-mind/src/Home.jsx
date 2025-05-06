import React from 'react';
import './Home.css';
import myImage from './assets/logo.png'
import Image2 from './assets/Peaceful.jpg'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <img 
              src={myImage}
              alt="MindHaven Logo" 
            />
            <span>Elysian Mind</span>
          </div>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/about">About</Link>
            <Link to="/login" className="cta-button login">Login</Link>
            <Link to="/signup" className="cta-button signup">Signup</Link>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="hero">
          <div className="hero-overlay"></div>
          <img 
            src={Image2}
            alt="Peaceful scene" 
          />
          <div className="hero-text">
            <h1>Welcome to Elysian Mind</h1>
            <p>Your personal space for mental health and well-being. Join us in celebrating wellness and self-care.</p>
          </div>
        </div>
      </div>

      <div className="footer">
        <p>&copy; 2024 Elysian Mind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;