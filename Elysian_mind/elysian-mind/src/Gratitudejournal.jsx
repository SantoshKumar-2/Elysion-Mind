import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Home, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell,
  X
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import myImage from './assets/logo.png';
import userImg from './assets/user.png';
import api from './util/api';

const GratitudeJournal = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [overview, setOverview] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [acknowledgmentReceived, setAcknowledgmentReceived] = useState(false);
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

  const questions = [
    "Who in your life has supported or inspired you recently?",
    "What about your health or well-being are you most thankful for today?",
    "What challenge have you faced recently, and how has it helped you grow or become stronger?",
    "What personal interest or skill have you enjoyed or improved recently?",
    "What about your surroundings—your home, community, or nature—brings you comfort or joy?"
  ];

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
      case 'home':
        navigate("/dashboard");
        break;
      case 'streaks':
        navigate("/streaks");
        break;
      default:
        break;
    }
  };

  const handleAnswer = async (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    try {
      const response = await api.post('/GratitudeJournal/journal', { prompt: answer });
      console.log(response.data.data.comment);
      const comment = response.data.data.comment;
      const newAcknowledgments = [...acknowledgments];
      newAcknowledgments[currentQuestion] = comment;
      setAcknowledgments(newAcknowledgments);
      
      setAcknowledgmentReceived(true);
    } catch (err) {
      console.error('Error fetching acknowledgment:', err);
    }
  };

  const handleNext = () => {
    setCurrentAnswer('');
    setAcknowledgmentReceived(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsComplete(true);
    }
  };

  useEffect(() => {
    if (isComplete) {
      const getSummary = async () => {
        try {
          const response = await api.post('/GratitudeJournal/journal', {
            final_prompt: answers.join(', ')
          });
          setOverview(response.data.data.summary);
        } catch (err) {
          console.error('Error fetching summary:', err);
        }
      };

      getSummary();
    }
  }, [isComplete, answers]);

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
          <div style={styles.container}>
          <button
    onClick={() => navigate('/streaks')}
    style={{
      position: 'absolute',
      top: '5rem',
      right: '1.5rem',
      padding: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#1E4E8C',
      cursor: 'pointer',
    }}
  >
    <X size={24}/>
  </button>
            <div style={styles.header}>
              <Heart style={styles.icon} />
              <h1 style={styles.title}>Gratitude Journal</h1>
            </div>

            {!isComplete ? (
              <div style={styles.questionContainer}>
                <h2 style={styles.question}>
                  {questions[currentQuestion]}
                </h2>

                <textarea
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onBlur={() => handleAnswer(currentAnswer)}
                  placeholder="Write your answer here..."
                  style={styles.textarea}
                />

                {acknowledgments[currentQuestion] && (
                  <p style={styles.acknowledgment}>
                    {acknowledgments[currentQuestion] || "A moment please. Working on it..."}
                  </p>
                )}
              </div>
            ) : (
              <div style={styles.overviewContainer}>
                <h2 style={styles.overviewTitle}>Your Gratitude Overview</h2>
                <p style={styles.overview}>
                  {overview || "A moment please. Working on it..."}
                </p>
              </div>
            )}

            <div style={styles.footer}>
              {!isComplete && (
                <button
                  onClick={handleNext}
                  disabled={!acknowledgmentReceived}
                  style={acknowledgmentReceived ? styles.buttonEnabled : styles.buttonDisabled}
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              )}

              <div style={styles.progressDots}>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    style={
                      index === currentQuestion
                        ? styles.dotActive
                        : index < currentQuestion
                        ? styles.dotCompleted
                        : styles.dotInactive
                    }
                  />
                ))}
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

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '24px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
  },
  icon: {
    width: '32px',
    height: '32px',
    color: '#1e40af',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1e40af',
  },
  questionContainer: {
    marginBottom: '32px',
  },
  question: {
    fontSize: '20px',
    color: '#1e3a8a',
    marginBottom: '24px',
  },
  textarea: {
    width: '100%',
    height: '128px',
    padding: '16px',
    fontSize: '16px',
    color: '#1e40af',
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    resize: 'none',
    outline: 'none',
  },
  acknowledgment: {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#e0f2fe',
    borderRadius: '8px',
    color: '#1e40af',
    fontSize: '14px',
  },
  overviewContainer: {
    marginBottom: '32px',
  },
  overviewTitle: {
    fontSize: '20px',
    color: '#1e3a8a',
    marginBottom: '16px',
  },
  overview: {
    backgroundColor: '#e0f2fe',
    padding: '16px',
    borderRadius: '8px',
    color: '#1e40af',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonEnabled: {
    padding: '8px 24px',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    padding: '8px 24px',
    backgroundColor: '#93c5fd',
    color: '#ffffff',
    border: 'none',
    borderRadius: '9999px',
    fontSize: '16px',
    cursor: 'not-allowed',
  },
  progressDots: {
    display: 'flex',
    gap: '8px',
  },
  dotActive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#2563eb',
  },
  dotCompleted: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#93c5fd',
  },
  dotInactive: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
  },
};

export default GratitudeJournal;