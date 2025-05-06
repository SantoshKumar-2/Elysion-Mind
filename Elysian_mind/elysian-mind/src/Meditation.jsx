import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, Settings, LogOut, Bell, Leaf, Sun, Cloud, Moon, X, RefreshCcw } from 'lucide-react';

// Assume these imports are correctly set up in your project
import api from './util/api.js';
import myImage from './assets/logo.png';
import userImg from './assets/user.png';

const MEDITATION_TYPES = {
  yoga: {
    name: 'Yoga Meditation',
    description: 'Calm and center your mind during yoga practice',
    icon: Leaf,
    defaultDuration: 300,
    breathCycle: { inhale: 4, hold1: 2, exhale: 4, hold2: 2 }
  },
  stress: {
    name: 'Stress Relief',
    description: 'Relax and reduce anxiety',
    icon: Cloud,
    defaultDuration: 600,
    breathCycle: { inhale: 5, hold1: 3, exhale: 5, hold2: 3 }
  },
  focus: {
    name: 'Focus & Concentration',
    description: 'Improve mental clarity and concentration',
    icon: Sun,
    defaultDuration: 900,
    breathCycle: { inhale: 6, hold1: 2, exhale: 6, hold2: 2 }
  },
  sleep: {
    name: 'Sleep Preparation',
    description: 'Relax and prepare for restful sleep',
    icon: Moon,
    defaultDuration: 450,
    breathCycle: { inhale: 4, hold1: 4, exhale: 6, hold2: 4 }
  }
};

const ElysianMindMeditation = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Prepare');
  const [breathCycle, setBreathCycle] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isInMeditation, setIsInMeditation] = useState(false);

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
    let interval = null;
    
    if (isActive && time < totalDuration && breathCycle) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const { inhale, hold1, exhale, hold2 } = breathCycle;
          const cycleDuration = inhale + hold1 + exhale + hold2;
          const cyclePosition = prevTime % cycleDuration;

          if (cyclePosition < inhale) {
            setBreathPhase('Breathe In');
          } else if (cyclePosition < inhale + hold1) {
            setBreathPhase('Hold');
          } else if (cyclePosition < inhale + hold1 + exhale) {
            setBreathPhase('Breathe Out');
          } else {
            setBreathPhase('Hold');
          }
          
          if (prevTime >= totalDuration - 1) {
            setIsComplete(true);
            setIsActive(false);
          }
          
          return prevTime + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, time, totalDuration, breathCycle]);

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

  const startMeditation = (type) => {
    const meditationType = MEDITATION_TYPES[type];
    setSelectedType(type);
    setTotalDuration(meditationType.defaultDuration);
    setBreathCycle(meditationType.breathCycle);
    setIsInMeditation(true);
    resetTimer();
  };

  const resetTimer = () => {
    setTime(0);
    setIsActive(false);
    setBreathPhase('Prepare');
    setIsComplete(false);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#e0f2fe' }}>
          <button 
            onClick={() => {
              if (isInMeditation) {
                setSelectedType(null);
                setIsInMeditation(false);
              } else {
                navigate('/streaks');
              }
            }}
            style={{
              position: 'absolute',
              top: '5rem',
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
          {/* Meditation Timer */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: '#F0F8FF',
            fontFamily: 'Arial, sans-serif',
            position: 'relative'
          }}>
            {!selectedType ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#F0F8FF',
                fontFamily: 'Arial, sans-serif',
                padding: '20px',
                textAlign: 'center'
              }}>
                <h1 style={{ color: '#1E4E8C', marginBottom: '20px' }}>
                  Choose Your Meditation
                </h1>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  gap: '20px'
                }}>
                  {Object.entries(MEDITATION_TYPES).map(([key, type]) => {
                    const Icon = type.icon;
                    return (
                      <div 
                        key={key}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          padding: '20px',
                          width: '250px',
                          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                          transform: 'scale(1)',
                        }}
                        onClick={() => startMeditation(key)}
                      >
                        <Icon size={48} color="#1E4E8C" style={{ marginBottom: '10px' }} />
                        <h2 style={{ color: '#1E4E8C', marginBottom: '10px' }}>{type.name}</h2>
                        <p style={{ color: '#666' }}>{type.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div style={{
                position: 'relative',
                width: '350px',
                height: '350px',
                borderRadius: '50%',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                overflow: 'hidden'
              }}>
                {/* Multiple Blue Waves */}
                {[1, 2, 3, 4].map((wave, index) => (
                  <div 
                    key={wave}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      border: `2px solid rgba(30, 144, 255, ${0.3 - (index * 0.07)})`,
                      animation: `expandWave ${3 + (index * 0.5)}s ease-out infinite`,
                      animationDelay: `${index * 0.5}s`
                    }}
                  />
                ))}

                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1E90FF',
                  borderRadius: '50%',
                  zIndex: 10
                }}>
                  {isComplete ? (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      color: 'white',
                      textAlign: 'center'
                    }}>
                      <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>Goal Achieved!</h2>
                      <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                        {MEDITATION_TYPES[selectedType].name}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '10px'
                      }}>
                        <button 
                          onClick={() => {
                            setSelectedType(null);
                            setIsInMeditation(false);
                          }}
                          style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            color: '#1E4E8C',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background-color 0.3s ease'
                          }}
                        >
                          Choose Another
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h2 style={{ 
                        fontSize: '24px', 
                        color: 'white', 
                        marginBottom: '10px',
                        textAlign: 'center'
                      }}>
                        {breathPhase}
                      </h2>
                      <p style={{ 
                        fontSize: '48px', 
                        color: 'white' 
                      }}>
                        {formatTime(time)}
                      </p>
                      <p style={{
                        fontSize: '16px',
                        color: 'white',
                        marginBottom: '10px'
                      }}>
                        {MEDITATION_TYPES[selectedType].name}
                      </p>
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '20px'
                      }}>
                        <button 
                          onClick={() => setIsActive(!isActive)}
                          style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: 'white',
                            color: '#1E90FF',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                          }}
                        >
                          {isActive ? 'Pause' : 'Start'}
                        </button>
                        <button 
                          onClick={resetTimer}
                          style={{
                            padding: '12px 24px',
                            fontSize: '16px',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background 0.3s ease'
                          }}
                        >
                          <RefreshCcw size={18} /> Reset
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
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

      {/* Keyframes for wave animation */}
      <style>{`
        @keyframes expandWave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ElysianMindMeditation;

