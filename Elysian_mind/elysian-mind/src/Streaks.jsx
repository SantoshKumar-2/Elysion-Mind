import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, FileText, Calendar, Settings, LogOut, Bell } from 'lucide-react';
import myImage from './assets/logo.png';
import userImg from './assets/user.png';
import api from './util/api.js';

const Button = ({ children, onClick, style, disabled }) => (
  <button
    onClick={onClick}
    style={{
      width: '100%',
      padding: '0.5rem 1rem',
      borderRadius: '0.375rem',
      transition: 'all 0.3s',
      backgroundColor: disabled ? '#d1d5db' : '#3b82f6',
      color: disabled ? '#6b7280' : 'white',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      ...style,
    }}
    disabled={disabled}
  >
    {children}
  </button>
);

const CustomCalendar = ({ value, onClickDay, completedDays }) => {
  const [activeTab, setActiveTab] = useState('streaks');
  const [currentDate, setCurrentDate] = useState(value || new Date());
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} style={{ gridColumn: 'span 1' }} />);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const isCompleted = completedDays.some(
        (completedDate) => completedDate.toDateString() === monthDate.toDateString()
      );
      const dayStyle = {
        cursor: 'pointer',
        textAlign: 'center',
        padding: '0.5rem',
        backgroundColor: isCompleted ? '#10b981' : 'transparent',
        color: isCompleted ? 'white' : 'black',
        borderRadius: '0.25rem',
      };
      days.push(
        <div
          key={`day-${day}`}
          style={dayStyle}
          onClick={() => onClickDay(monthDate)}
        >
          {day}
        </div>
      );
    }
    return days;
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.375rem', backgroundColor: 'white' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem' }}>
        {renderCalendarDays()}
      </div>
    </div>
  );
};

const MentalHealthStreakTracker = () => {
  const [streakData, setStreakData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('streaks');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await api.get('/auth/dashboard');
        setUser(userResponse.data);
        setStreakData({
          completedDays: [],
          exercises: [
            { title: 'Meditation', description: 'Practice mindfulness', completed: false },
            { title: 'Gratitude Journal', description: 'Write 5 things you are grateful for', completed: false },
            { title: 'Daily Affirmations', description: 'Repeat positive affirmations', completed: false },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleCompleteExercise = (index) => {
    const updated = { ...streakData };
    updated.exercises[index].completed = true; // Mark the exercise as completed in the state
    setStreakData(updated);
  
    // Add today's date to completedDays if all exercises are completed
    const today = new Date();
    if (updated.exercises.every((exercise) => exercise.completed)) {
      if (!updated.completedDays.some((date) => date.toDateString() === today.toDateString())) {
        updated.completedDays.push(today);
        setStreakData(updated);
        console.log('Streak completed for today!');
      }
    }
  
    // Navigate to the respective route based on the button clicked
    const paths = ['/meditation', '/journaling', '/affirmation'];
    navigate(paths[index]);
  };
  

  const sidebarItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: FileText, label: 'Questionnaire', id: 'questionnaire' },
    { icon: Calendar, label: 'Streaks', id: 'streaks' },
    { icon: Settings, label: 'Settings', id: 'settings' },
    { icon: LogOut, label: 'Logout', id: 'logout' }
  ];

  const handleSidebarClick = (id) => {
    setActiveTab(id);
    switch (id) {
      case 'logout':
        try {
          api.post('/auth/logout');
          navigate("/login");
        } catch (err) {
          console.error('Logout failed', err);
        }
        break;
      case 'home':
        navigate("/dashboard");
        break;
      case 'settings':
        navigate("/settings");
        break;
      case 'questionnaire':
        navigate("/questionnaire");
        break;
      default:
        break;
    }
  };

  if (loading) return <div>Loading...</div>;

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

        {/* Content */}
        <div style={{
          flex: 1,
          maxWidth: '960px',
          margin: '2rem auto',
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          padding: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
            Mental Health Streak Tracker
          </h2>
          <CustomCalendar
            value={new Date()}
            completedDays={streakData.completedDays}
            onClickDay={(date) => console.log('Date clicked:', date)}
          />
          <div style={{
            marginTop: '2rem',
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem'
          }}>
            {streakData.exercises.map((exercise, index) => (
              <div key={exercise.title} style={{
                padding: '1rem',
                borderRadius: '0.375rem',
                backgroundColor: exercise.completed ? '#10b981' : 'white',
                color: exercise.completed ? 'white' : '#1f2937',
                border: '1px solid #d1d5db',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>{exercise.title}</h4>
                  <p style={{ fontSize: '0.875rem', color: exercise.completed ? 'white' : '#4b5563' }}>
                    {exercise.description}
                  </p>
                </div>
                <Button
                  style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '0.25rem' }}
                  disabled={exercise.completed}
                  onClick={() => handleCompleteExercise(index)}
                >
                  {exercise.completed ? 'Completed' : 'Start'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealthStreakTracker;
