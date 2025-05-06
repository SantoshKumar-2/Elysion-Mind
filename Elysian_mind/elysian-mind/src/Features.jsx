import React from 'react';
import myImage from './assets/logo.png'
import Image2 from './assets/Peaceful.jpg'
import {Link} from 'react-router-dom'

const FeaturesPage = () => {
  const features = [
    {title: 'Advanced Mood Tracking', text: 'Track your moods with detailed insights and patterns analysis.'},
    {title: 'Guided Meditation', text: 'Access our library of guided meditation sessions.'},
    {title: 'Journal Prompts', text: 'Daily prompts to help you reflect and process your thoughts.'},
    {title: 'Progress Reports', text: 'Weekly and monthly progress reports to track your journey.'}
  ];

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
  <div className="hero-overlay"></div>
    <img src={Image2} alt="Features"/>
    <div className="hero-text">
      <h1>Our Features</h1>
      <p>Discover tools designed for your mental well-being</p>
    </div>
  </div>
  </div>

  <section className="features">
    <div className="feature-grid">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <h3 className="feature-title">{feature.title}</h3>
          <p className="feature-text">{feature.text}</p>
        </div>
      ))}
    </div>
  </section>

<div className="footer">
        <p>&copy; 2024 Elysian Mind. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FeaturesPage;