import React, { useState, useEffect } from 'react';
import { Home, FileText, Calendar, Settings, LogOut, Bell, Activity, Sun, Moon, ChevronRight, ChevronLeft, CheckCircle, Smile, Heart, User, Info } from 'lucide-react';
import { useNavigate, Link } from "react-router-dom";
import myImage from './assets/logo.png';
import api from './util/api.js';
import userImg from './assets/user.png';

const MentalHealthApp = () => {
  const [activeTab, setActiveTab] = useState('questionnaire');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Quiz state
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

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
    { icon: Home, label: 'Home', id: 'home' },
    { icon: FileText, label: 'Questionnaire', id: 'questionnaire' },
    { icon: Calendar, label: 'Streaks', id: 'streaks' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: LogOut, label: 'Logout', id: 'logout' }
  ];

  const handleSidebarClick = (id) => {
    setActiveTab(id);
    switch(id) {
      case 'home':
        navigate("/dashboard");
        break;
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

  // Quiz logic
  const sections = [
    {
      title: 'Personal Well-being',
      icon: User,
      questions: [
        { 
          text: 'How often do you feel sad or down in the last two weeks?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'Almost never or rarely' },
            { label: 'B', description: 'Sometimes, but not often' },
            { label: 'C', description: 'Most days' },
            { label: 'D', description: 'Almost every day' }
          ]
        },
        { 
          text: 'Do you feel like you\'re not good enough or that you\'ve made a lot of mistakes?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'I feel confident and proud of myself' },
            { label: 'B', description: 'Occasional self-doubt' },
            { label: 'C', description: 'Frequent feelings of inadequacy' },
            { label: 'D', description: 'Constant negative self-talk' }
          ]
        },
        { 
          text: 'Do you feel tired, even after a good night\'s sleep?', 
          category: 'depression',
          options: [
            { label: 'A', description: 'I feel energetic and refreshed' },
            { label: 'B', description: 'Occasional tiredness' },
            { label: 'C', description: 'Often feeling exhausted' },
            { label: 'D', description: 'Constant fatigue, no energy' }
          ]
        },
        {
          text:'Do you worry about things more than usual, like school, work or family problems?',
          category:'depression',
          options: [
            { label: 'A', description: ' I don\’t feel worried about things more than usual'},
            { label: 'B', description: 'I worry, but it\'s not too frequent' },
            { label: 'C', description: ' I worry more than usual, but not all the time' },
            { label: 'D', description:  'I feel anxious or worried frequently.' }
          ]
        },
      ]
    },
    {
      title: 'Emotional Challenges',
      icon: Heart,
      questions: [
        { 
          text: 'How often do you feel nervous or worried about school, work or friends?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'Rarely or never' },
            { label: 'B', description: 'Occasionally' },
            { label: 'C', description: 'Frequently' },
            { label: 'D', description: 'Almost constantly' }
          ]
        },
        { 
          text: 'Do you ever feel like your heart is racing or you can\'t breathe because you\'re anxious?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'Never experienced this' },
            { label: 'B', description: 'Happened once or twice' },
            { label: 'C', description: 'Happens sometimes' },
            { label: 'D', description: 'Frequent panic-like symptoms' }
          ]
        },
        { 
          text: 'Do you try to avoid certain places or situations because you feel scared or nervous?', 
          category: 'anxiety',
          options: [
            { label: 'A', description: 'I face situations confidently' },
            { label: 'B', description: 'Minimal avoidance' },
            { label: 'C', description: 'Avoid some uncomfortable situations' },
            { label: 'D', description: 'Frequently avoid many situations' }
          ]
        }
      ]
    },
    {
      title: 'Social Connections',
      icon: Smile,
      questions: [
        { 
          text: 'Do you ever feel alone, even when you\'re with your friends or family?', 
          category: 'loneliness',
          options: [
            { label: 'A', description: 'I feel connected and supported' },
            { label: 'B', description: 'Occasional feelings of isolation' },
            { label: 'C', description: 'Frequent feelings of loneliness' },
            { label: 'D', description: 'Constant sense of disconnection' }
          ]
        },
        { 
          text: 'Do you feel like no one understands how you feel or what you\'re going through?', 
          category: 'loneliness',
          options: [
            { label: 'A', description: 'I feel understood' },
            { label: 'B', description: 'Sometimes misunderstood' },
            { label: 'C', description: 'Often feel misunderstood' },
            { label: 'D', description: 'Always feel completely alone' }
          ]
        }
      ]
    },
    {
      title: 'Self-Image',
      icon: Info,
      questions: [
        { 
          text: 'Do you spend a lot of time thinking about how you look or wishing you looked different?', 
          category: 'body-dysmorphia',
          options: [
            { label: 'A', description: 'I accept my appearance' },
            { label: 'B', description: 'Occasional self-criticism' },
            { label: 'C', description: 'Frequent appearance concerns' },
            { label: 'D', description: 'Constant negative body thoughts' }
          ]
        },
        { 
          text: 'Do you ever feel embarrassed or upset about your appearance?', 
          category: 'body-dysmorphia',
          options: [
            { label: 'A', description: 'Comfortable with myself' },
            { label: 'B', description: 'Mild discomfort occasionally' },
            { label: 'C', description: 'Often feel self-conscious' },
            { label: 'D', description: 'Extreme distress about appearance' }
          ]
        }
      ]
    }
  ];

  const handleSubmit = async () => {
    try {
      // Convert answers to an array of answers only
      const prompt = Object.values(answers);
  
      // Send the prompt array to the backend
      const response = await api.post('/assessment/quiz', { prompt });
      console.log("Medical insights generated",response.data);
      // Redirect to the result page and pass the response data
      navigate('/results', { state: { resultData: response.data } });
    } catch (err) {
      console.error('Error submitting quiz:', err);
    }
  };
  
  
  const handleAnswer = (answer) => {
    const key = `${sections[currentSection].title}-${currentQuestion}`;
    setAnswers(prev => ({ ...prev, [key]: answer }));
  };

  const navigateQuestion = (direction) => {
    const currentSectionQuestions = sections[currentSection].questions.length;

    if (direction === 'next') {
      if (currentQuestion < currentSectionQuestions - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else if (currentSection < sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestion(0);
      } else {
        setCompleted(true);
      }
    } else if (direction === 'prev') {
      if (currentQuestion > 0) {
        setCurrentQuestion(prev => prev - 1);
      } else if (currentSection > 0) {
        setCurrentSection(prev => prev - 1);
        setCurrentQuestion(sections[currentSection - 1].questions.length - 1);
      }
    }
  };

  const getScoreInterpretation = () => {
    const scoreMap = { 'A': 3, 'B': 2, 'C': 1, 'D': 0 };
    const categoryScores = {};

    Object.keys(answers).forEach(key => {
      const category = sections.find(section => 
        key.startsWith(section.title)
      )?.title || 'Unknown';
      
      const score = scoreMap[answers[key]] || 0;
      categoryScores[category] = (categoryScores[category] || 0) + score;
    });

    return categoryScores;
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

        {/* Quiz Content */}
        <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#e0f2fe' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            padding: '30px',
            width: '100%',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            {completed ? (
              <div style={{textAlign: 'center'}}>
                <h2 style={{fontSize: '24px', color: '#1e3a8a', fontWeight: 'bold', marginBottom: '20px'}}>Quiz Results</h2>
                {Object.entries(getScoreInterpretation()).map(([category, score]) => (
                  <div key={category} style={{marginBottom: '15px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <span style={{color: '#2563eb', fontWeight: 'bold'}}>{category}</span>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <span style={{color: '#2563eb', marginRight: '10px'}}>
                          {score} / {sections.find(s => s.title === category).questions.length * 3}
                        </span>
                        <CheckCircle color="#10b981" size={20} />
                      </div>
                    </div>
                    <div style={{
                      width: '100%', 
                      height: '10px', 
                      backgroundColor: '#bae6fd', 
                      borderRadius: '5px', 
                      marginTop: '5px'
                    }}>
                      <div style={{
                        width: `${(score / (sections.find(s => s.title === category).questions.length * 3)) * 100}%`,
                        height: '100%',
                        backgroundColor: '#2563eb',
                        borderRadius: '5px'
                      }}></div>
                    </div>
                  </div>
                ))}
                <p style={{
                  marginTop: '20px', 
                  color: '#2563eb', 
                  fontSize: '14px'
                }}>
                  These results are not a definitive diagnosis. Please submit results for definitive AI-driven diagnosis.
                </p>
                 <button style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      alignItems: 'center'}} onClick={handleSubmit}>
                  Submit results
                 </button>
              </div>
              
            ) : (
              <>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px'}}>
                  {React.createElement(sections[currentSection].icon, { color: "#1e3a8a", size: 30 })}
                  <h2 style={{fontSize: '24px', color: '#1e3a8a', fontWeight: 'bold', marginLeft: '10px'}}>{sections[currentSection].title}</h2>
                </div>
                
                <p style={{fontSize: '18px', color: '#1e3a8a', marginBottom: '20px', lineHeight: '1.5'}}>
                  {sections[currentSection].questions[currentQuestion].text}
                </p>
                
                <div>
                  {sections[currentSection].questions[currentQuestion].options.map((option) => (
                    <button 
                      key={option.label}
                      onClick={() => handleAnswer(option.label)}
                      style={{
                        width: '100%',
                        padding: '12px 15px',
                        marginBottom: '10px',
                        borderRadius: '8px',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        backgroundColor: answers[`${sections[currentSection].title}-${currentQuestion}`] === option.label 
                          ? '#2563eb' 
                          : '#bae6fd',
                        color: answers[`${sections[currentSection].title}-${currentQuestion}`] === option.label 
                          ? 'white' 
                          : '#2563eb',
                      }}
                    >
                      <div>
                        <span style={{fontWeight: 'bold', marginRight: '10px'}}>{option.label}.</span>
                        <span>{option.description}</span>
                      </div>
                      {answers[`${sections[currentSection].title}-${currentQuestion}`] === option.label && (
                        <CheckCircle size={20} />
                      )}
                    </button>
                  ))}
                </div>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center'}}>
                  {(currentSection > 0 || currentQuestion > 0) && (
                    <button 
                      onClick={() => navigateQuestion('prev')}
                      style={{
                        backgroundColor: 'transparent',
                        color: '#2563eb',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <ChevronLeft /> Previous
                    </button>
                  )}
                  
                  <button 
                    onClick={() => navigateQuestion('next')}
                    style={{
                      backgroundColor: '#2563eb',
                      color: 'white',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      opacity: answers[`${sections[currentSection].title}-${currentQuestion}`] ? 1 : 0.5,
                      cursor: answers[`${sections[currentSection].title}-${currentQuestion}`] ? 'pointer' : 'not-allowed'
                    }}
                    disabled={!answers[`${sections[currentSection].title}-${currentQuestion}`]}
                  >
                    {currentSection === sections.length - 1 && currentQuestion === sections[currentSection].questions.length - 1 
                      ? 'Complete' 
                      : 'Next'} 
                    <ChevronRight />
                  </button>
                </div>
                
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                  {sections.map((_, index) => (
                    <div 
                      key={index} 
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        margin: '0 4px',
                        backgroundColor: index < currentSection ? '#2563eb' : '#bae6fd'
                      }}
                    ></div>
                  ))}
                </div>
              </>
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
    </div>
  );
};

export default MentalHealthApp;

