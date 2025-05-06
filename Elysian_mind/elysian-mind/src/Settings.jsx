import React, { useState, useEffect } from 'react';
import { 
  Home, 
  FileText, 
  Calendar, 
  Settings, 
  LogOut, 
  Bell, 
  Trash2, 
  User, 
  Lock, 
  Mail
} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import myImage from './assets/logo.png';
import api from './util/api.js';
import userImg from './assets/user.png';

const ElysianMindSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/auth/dashboard');
        setUser(response.data);
        setFormData({
          fullName: response.data.fullName,
          email: response.data.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
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
      case 'home':
        navigate("/dashboard");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await api.put('/auth/update-profile', {
        fullName: formData.fullName,
        email: formData.email
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed', err);
      alert('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      await api.put('/auth/change-password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      alert('Password changed successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (err) {
      console.error('Password change failed', err);
      alert('Failed to change password');
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.toLowerCase() !== 'delete my account') {
      alert('Confirmation text does not match');
      return;
    }

    try {
      await api.delete('/auth/delete-account');
      navigate("/login");
    } catch (err) {
      console.error('Account deletion failed', err);
      alert('Failed to delete account');
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
        {/* Header (Identical to Dashboard) */}
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
        {/* Sidebar (Identical to Dashboard) */}
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
      {/* Existing header and sidebar code */}
      <main style={{ flex: 1, padding: '1.5rem', backgroundColor: '#e0f2fe', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Existing profile and password sections */}
        <div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1e3a8a', marginBottom: '0.5rem' }}>Account Settings</h2>
            <p style={{ color: '#3b82f6' }}>Manage your account preferences and personal information</p>
          </div>

          {/* Profile Information */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <User style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Profile Information
            </h3>
            <form onSubmit={handleUpdateProfile}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #dbeafe',
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                </div>
                <div>
                  <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #dbeafe',
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                </div>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    padding: '0.5rem', 
                    borderRadius: '0.5rem', 
                    marginTop: '1rem',
                    ':hover': { backgroundColor: '#2563eb' }
                  }}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#1e3a8a', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
              <Lock style={{ marginRight: '0.5rem', color: '#3b82f6' }} />
              Change Password
            </h3>
            <form onSubmit={handleChangePassword}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #dbeafe',
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                </div>
                <div>
                  <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #dbeafe',
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                </div>
                <div>
                  <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={{ 
                      width: '100%', 
                      padding: '0.5rem', 
                      borderRadius: '0.5rem', 
                      border: '1px solid #dbeafe',
                      backgroundColor: '#f3f4f6'
                    }} 
                  />
                </div>
                <button 
                  type="submit"
                  style={{ 
                    backgroundColor: '#3b82f6', 
                    color: 'white', 
                    padding: '0.5rem', 
                    borderRadius: '0.5rem', 
                    marginTop: '1rem',
                    ':hover': { backgroundColor: '#2563eb' }
                  }}
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>

        {/* Delete Account */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', borderColor: '#ef4444' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <Trash2 style={{ marginRight: '0.5rem', color: '#ef4444' }} />
            Delete Account
          </h3>
          <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ color: '#1e3a8a', marginBottom: '0.5rem', display: 'block' }}>
                To confirm deletion, type "DELETE MY ACCOUNT"
              </label>
              <input 
                type="text" 
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '0.5rem', 
                  border: '1px solid #fecaca',
                  backgroundColor: '#fff0f0'
                }} 
              />
            </div>
            <button 
              onClick={handleDeleteAccount}
              style={{ 
                backgroundColor: '#ef4444', 
                color: 'white', 
                padding: '0.5rem', 
                borderRadius: '0.5rem',
                ':hover': { backgroundColor: '#dc2626' }
              }}
            >
              Permanently Delete My Account
            </button>
          </div>
        </div>
      </main>
    </div>
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

export default ElysianMindSettings;