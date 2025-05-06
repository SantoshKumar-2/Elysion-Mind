import React, { useState, useEffect } from 'react';
import { Heart, Smile, Users, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WellnessAssessmentApp = ({ assessmentData }) => {
  const [isResultOpen, setIsResultOpen] = useState(true);
  const [currentAffirmationIndex, setCurrentAffirmationIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const styles = {
    dialog: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#e6f2ff',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      width: '90%',
      maxWidth: '600px',
      maxHeight: '90%',
      overflow: 'auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      zIndex: 1000,
    },
    title: {
      color: '#1a5f7a',
      textAlign: 'center',
      fontSize: '24px',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    summaryContainer: {
      backgroundColor: '#b3e0ff',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
    },
    summaryText: {
      color: '#00456e',
      fontStyle: 'italic',
      fontSize: '16px',
    },
    fieldContainer: {
      backgroundColor: '#d1eaff',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
    },
    fieldLabel: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
      color: '#00456e',
      fontWeight: 'bold',
    },
    fieldDescription: {
      color: '#00456e',
      fontSize: '16px',
    },
    affirmationContainer: {
      textAlign: 'center',
      marginTop: '20px',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    },
    button: {
      backgroundColor: '#0077be',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      padding: '10px 20px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  useEffect(() => {
    const affirmationInterval = setInterval(() => {
      setCurrentAffirmationIndex((prev) =>
        (prev + 1) % (assessmentData.data.affirmations?.length || 1)
      );
    }, 5000);

    return () => clearInterval(affirmationInterval);
  }, [assessmentData.data.affirmations]);

  if (!isResultOpen || !assessmentData) return null;

  const fields = [
    {
      label: 'Personal Well-being',
      icon: <Heart size={28} color="#1a5f7a" />,
      description: assessmentData.data.PersonalWellbeing?.description || 'No data available.',
    },
    {
      label: 'Emotional Challenges',
      icon: <Smile size={28} color="#1a5f7a" />,
      description: assessmentData.data.EmotionalChallenges?.description || 'No data available.',
    },
    {
      label: 'Social Connections',
      icon: <Users size={28} color="#1a5f7a" />,
      description: assessmentData.data.SocialConnections?.description || 'No data available.',
    },
    {
      label: 'Body Image',
      icon: <Eye size={28} color="#1a5f7a" />,
      description: assessmentData.data.BodyImage?.description || 'No data available.',
    },
  ];

  const handleClose = () => {
    setIsResultOpen(false);
    navigate('/questionnaire'); // Redirect to the quiz page
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={styles.dialog}>
      <h2 style={styles.title}>Personal Wellness Assessment</h2>

      {/* Summary */}
      <div style={styles.summaryContainer}>
        <p style={styles.summaryText}>{assessmentData.data.summary}</p>
      </div>

      {/* Fields */}
      {fields.map((field, index) => (
        <div key={index} style={styles.fieldContainer}>
          <div style={styles.fieldLabel}>
            {field.icon}&nbsp;
            {field.label}
          </div>
          <p style={styles.fieldDescription}>{field.description}</p>
        </div>
      ))}

      {/* Affirmations */}
      <div style={styles.affirmationContainer}>
        {assessmentData.data.affirmations && assessmentData.data.affirmations.length > 0 && (
          <p style={styles.fieldDescription}>
            "{assessmentData.data.affirmations[currentAffirmationIndex]}"
          </p>
        )}
      </div>

      {/* Close Button */}
      <div style={styles.buttonContainer}>
      <button onClick={handlePrint} style={styles.button}>
          Print Results
        </button>
        <button onClick={handleClose} style={styles.button}>
          Close
        </button>
      </div>
    </div>
  );
};

export default WellnessAssessmentApp;
