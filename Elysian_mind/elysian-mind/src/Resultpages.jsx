import React from 'react';
import { useLocation } from 'react-router-dom';
import WellnessAssessmentApp from './Resultpopup1.jsx'; // Adjust the path if needed

const ResultsPage = () => {
  const location = useLocation();
  const resultData = location.state?.resultData;

  console.log('Received resultData:', resultData); // Log this to verify the data

  if (!resultData) {
    return <p>Something went wrong. Please try again.</p>;
  }

  return (
    <div>
      <WellnessAssessmentApp assessmentData={resultData} />
    </div>
  );
};

export default ResultsPage;
