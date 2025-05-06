import React from 'react';
import myImage from './assets/logo.png'
import Image2 from './assets/Peaceful.jpg'
import {Link} from 'react-router-dom'

const AboutPage = () => {
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
            <Link to="/signup" className="cta-button signup">Sign Up</Link>
          </div>
        </div>
      </nav>
      <div className="main-content">
      <div className="hero">
        <img src={Image2} alt="About" className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1 className="hero-title">About Us</h1>
          <p className="hero-subtitle">Learn about our mission and values</p>
        </div>
      </div>
      </div>

      <section className="features">
        <div className="feature-grid">
          <div className="feature-card">
            <h3 className="feature-title">Our Mission</h3>
            <p className="feature-text">To make mental health support accessible, engaging, and effective for everyone.</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">Our Values</h3>
            <ul className="feature-text">
              <li>Accessibility</li>
              <li>Privacy</li>
              <li>Evidence-based Practice</li>
              <li>Continuous Support</li>
            </ul>
          </div>
        </div>
      </section>
    <div className="footer">
        <p>&copy; 2024 Elysian Mind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutPage;