import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Features from './Features.jsx';
import About from './About.jsx';
import Contact from './Contact.jsx';
import Login from './Auth/Login.jsx';
import Signup from './Auth/Signup.jsx';
import PreviewDashboard from './PreviewDashboard.jsx';
import MentalHealthApp from './Questionnaire.jsx';
import MeditationTimer from './Meditation.jsx';
import WellnessAssessmentApp from './Resultpopup1.jsx';
import ResultsPage from './Resultpages.jsx';
import GratitudeJournal from './Gratitudejournal.jsx';
import ElysianMindSettings from './Settings.jsx';
import PositiveAffirmationApp from './Affirmations.jsx';
import MentalHealthStreakTracker from './Streaks.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<PreviewDashboard/>}/>
        <Route path='/questionnaire' element={<MentalHealthApp/>}/>
        <Route path='/meditation' element={<MeditationTimer/>}/>
        <Route path='/result' element={<WellnessAssessmentApp/>}/>
        <Route path="/results" element={<ResultsPage/>} />
        <Route path='/journaling' element={<GratitudeJournal/>}/>
        <Route path='/settings' element={<ElysianMindSettings/>}/>
        <Route path='/affirmation' element={<PositiveAffirmationApp/>}/>
        <Route path='/streaks' element={<MentalHealthStreakTracker/>}/>
      </Routes>
    </Router>
  );
};

export default App;