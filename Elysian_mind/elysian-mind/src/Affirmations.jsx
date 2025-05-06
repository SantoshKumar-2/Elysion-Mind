import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, Settings, LogOut, Bell, X, Sparkles, Heart, Star, Smile } from 'lucide-react';

import api from './util/api.js';
import myImage from './assets/logo.png';
import userImg from './assets/user.png';

const PositiveAffirmationApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const affirmations = [
    "I am capable of amazing things",
    "My potential is limitless",
    "I believe in myself and my abilities",
    "I am strong, confident, and resilient",
    "Every day, I'm becoming a better version of myself",
    "I radiate positivity and attract goodness",
    "My challenges are opportunities for growth",
    "I am worthy of love, respect, and happiness",
    "I trust my journey and embrace my unique path",
    "My mind is powerful, and my spirit is strong"
  ];

  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/dashboard');
        setUser(response.data);  
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Cycle through affirmations
      const nextIndex = (index + 1) % affirmations.length;
      setCurrentAffirmation(affirmations[nextIndex]);
      setIndex(nextIndex);
    }, 5000); // Change every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [index, affirmations]);

  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: FileText, label: 'Questionnaire', id: 'questionnaire' },
    { icon: Calendar, label: 'Streaks', id: 'streaks' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: LogOut, label: 'Logout', id: 'logout' }
  ];

  const handleSidebarClick = (id) => {
    setActiveTab(id);
    switch(id) {
      case 'logout':
        try {
          api.post('/auth/logout');
          navigate("/login");
        } catch (err) {
          console.error('Logout failed', err);
        }
        break;
      case 'settings':
        navigate("/settings");
        break;
      case 'questionnaire':
        navigate("/questionnaire");
        break;
      case 'streaks':
        navigate("/streaks");
        break;
      case 'home':
        navigate("/dashboard");
        break;
      default:
        break;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f3f4f6', 
      display: 'flex', 
      flexDirection: 'column',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <header style={{ 
        backgroundColor: 'white', 
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)', 
        height: '4rem',
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          height: '4rem' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src={myImage} 
              alt="Logo" 
              style={{ height: '60px', width: 'auto', marginRight: '0.5rem' }} 
            />
            <span style={{ 
              fontSize: '1.25rem', 
              fontWeight: '600', 
              color: '#1f2937' 
            }}>Elysian Mind</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Bell style={{ color: '#1f2937', cursor: 'pointer' }} />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src={userImg} 
                alt="User Avatar" 
                style={{ 
                  borderRadius: '50%', 
                  width: '2.5rem', 
                  height: '2.5rem', 
                  marginRight: '0.75rem', 
                  border: '2px solid #d1d5db' 
                }} 
              />
              <div>
                <p style={{ 
                  fontWeight: '500', 
                  color: '#1f2937',
                  fontSize: '0.875rem' 
                }}>{user.fullName}</p>
                <p style={{ 
                  fontSize: '0.75rem', 
                  color: '#4b5563' 
                }}>Premium User</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '6rem', backgroundColor: 'white', borderRight: '1px solid #dbeafe', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1.5rem 0', gap: '1rem' }}>
          {sidebarItems.map((item) => (
            <div 
              key={item.id}
              style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '0.5rem',
                width: '100%', 
                textAlign: 'center',
                transition: 'all 0.2s',
                ...(activeTab === item.id 
                  ? { backgroundColor: '#dbeafe', color: '#1e3a8a' } 
                  : { ':hover': { backgroundColor: '#f1f5f9', color: '#3b82f6' } })
              }}
              onClick={() => handleSidebarClick(item.id)}
            >
              <item.icon 
                style={{
                  marginBottom: '0.25rem',
                  ...(activeTab === item.id ? { color: '#1e3a8a' } : { color: '#3b82f6' })
                }} 
              />
              <span style={{ fontSize: '0.75rem' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#e0f2fe', position: 'relative' }}>
          {/* Close/Back Button */}
          <button 
            onClick={() => navigate('/streaks')}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '1.5rem',
              padding: '0.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#1E4E8C',
              zIndex: 50
            }}
          >
            <X size={24} />
          </button>

          {/* Affirmation Content */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
          }}>
            <div style={{
              backgroundColor: '#b3d9ff', // Slightly darker blue
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '2rem',
              textAlign: 'center',
              maxWidth: '36rem',
              width: '100%'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Sparkles color="#0066cc" size={40} style={{marginRight: '0.75rem'}} />
                <Heart color="#0066cc" size={40} style={{marginRight: '0.75rem'}} />
                <Star color="#0066cc" size={40} />
              </div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#00366d', // Dark blue
                marginBottom: '1rem'
              }}>
                Repeat After Me
              </h1>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
              }}>
                <p style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  color: '#00366d',
                  fontStyle: 'italic'
                }}>
                  "{currentAffirmation}"
                </p>
              </div>
              <div style={{
                marginTop: '1.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Smile color="#0066cc" size={30} style={{marginRight: '0.75rem'}} />
                <p style={{
                  color: '#00366d',
                  fontWeight: '500'
                }}>
                  Believe in yourself!
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#60a5fa', 
        padding: '1rem 0' 
      }}>
        <p style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          color: 'white', 
          textAlign: 'center',
          fontSize: '0.875rem'
        }}>
          © {new Date().getFullYear()} Elysian Mind. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default PositiveAffirmationApp;