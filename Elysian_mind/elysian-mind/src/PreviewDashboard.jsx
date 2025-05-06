import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Activity, 
  Sun, 
  Moon,
  Heart, Smile, Users, Eye
} from 'lucide-react';
import { useNavigate,Link } from "react-router-dom";
import myImage from './assets/logo.png';
import api from './util/api.js';
import userImg from './assets/user.png';

const ElysianMindDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const sidebarItems = [
    { 
      icon: Home, 
      label: 'Home', 
      id: 'home' 
    },
    { 
      icon: FileText, 
      label: 'Questionnaire', 
      id: 'questionnaire' 
    },
    { 
      icon: Calendar, 
      label: 'Streaks', 
      id: 'streaks' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      id: 'settings' 
    },
    { 
      icon: LogOut, 
      label: 'Logout', 
      id: 'logout' 
    }
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
      default:
        break;
    }
  };

  const handleStartSessionClick = () => {
    navigate('/meditation'); // Redirects to the Meditation page
  };

  const handleWriteEntryClick =() =>{
    navigate('/journaling');
  };

  const handleStartWorkOutClick =() =>{
    navigate('/affirmation');
  }

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
        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#e0f2fe' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e3a8a' }}>Welcome back, {user.fullName}!</h2>
            <p style={{ color: '#3b82f6' }}>Let's look after your mental health</p>
          </div>

          {/* Quick Stats */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1.5rem' }}>
  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, flex: '1' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
      <Heart style={{ color: '#3b82f6' }} /><h3 style={{ fontWeight: 'semibold', color: '#1e3a8a' }}>Personal Well Being</h3>
    </div>
    <p style={{ fontSize: '1rem', color: '#3b82f6' }}>Assesses depression-related symptoms by evaluating mood fluctuations, energy levels, and anxiety, helping users gain insights into their emotional well-being.</p>
  </div>

  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, flex: '1' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
      <Smile style={{ color: '#6366f1' }} /><h3 style={{ fontWeight: 'semibold', color: '#1e3a8a' }}>Emotional Challenges</h3>
    </div>
    <p style={{ fontSize: '1rem', color: '#3b82f6' }}>Assesses anxiety symptoms, including nervousness, physical anxiety signs, and avoidance behaviors.</p>
  </div>

  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, flex: '1' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
      <Users style={{ color: '#3b82f6' }} /><h3 style={{ fontWeight: 'semibold', color: '#1e3a8a' }}>Social Connections</h3>
    </div>
    <p style={{ fontSize: '1rem', color: '#3b82f6' }}>Assesses feelings of loneliness and social isolation, including a sense of disconnection, misunderstanding, and lack of emotional support.</p>
  </div>

  <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }, flex: '1' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
      <Eye style={{ color: '#3b82f6' }} /><h3 style={{ fontWeight: 'semibold', color: '#1e3a8a' }}>Body Image</h3>
    </div>
    <p style={{ fontSize: '1rem', color: '#3b82f6' }}>Assesses body dysmorphia, focusing on concerns about appearance, self-criticism, and the emotional distress caused by perceived flaws in one's physical appearance.</p>
  </div>
</div>

          <br/>
          {/* Activities */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Sun style={{ color: '#3b82f6', fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontWeight: 'semibold', color: '#1e3a8a', marginBottom: '0.75rem' }}>Meditation</h3>
              <button style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', ':hover': { backgroundColor: '#2563eb' } }} onClick={handleStartSessionClick}>
                Start Session
              </button>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <FileText style={{ color: '#3b82f6', fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontWeight: 'semibold', color: '#1e3a8a', marginBottom: '0.75rem' }}>Gratitude Journal</h3>
              <button style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', ':hover': { backgroundColor: '#16a34a' } }} onClick={handleWriteEntryClick}>
                Write Entry
              </button>
            </div>
            <div style={{ backgroundColor: 'white', padding: '1.25rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', border: '1px solid #dbeafe', ':hover': { boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <Activity style={{ color: '#3b82f6', fontSize: '2rem' }} />
              </div>
              <h3 style={{ fontWeight: 'semibold', color: '#1e3a8a', marginBottom: '0.75rem' }}>Daily Affirmations</h3>
              <button style={{ width: '100%', backgroundColor: '#3b82f6', color: 'white', padding: '0.5rem', borderRadius: '0.5rem', ':hover': { backgroundColor: '#7e22ce' } }} onClick={handleStartWorkOutClick}>
                Start Now
              </button>
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

export default ElysianMindDashboard;