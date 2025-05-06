import React, { useState } from 'react';
import myImage from './assets/logo.png'
import Image2 from './assets/Peaceful.jpg'
import {Link} from 'react-router-dom'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

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
            <Link to="/contact">Contact</Link>
            <button className="cta-button login">Login</button>
            <button className="cta-button signup">Sign Up</button>
          </div>
        </div>
      </nav>
      <div className="main-content">
      <div className="hero">
        <img src={Image2} alt="Contact" className="hero-img" />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">We're here to help</p>
        </div>
      </div>

      <section className="features">
        <div className="feature-card">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label>Name:</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Message:</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="textarea" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="cta-button signup-button"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
    </div>
  );
};

export default ContactPage;