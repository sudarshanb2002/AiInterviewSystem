import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Component/admin/home-page';
import AdminPage from './Component/admin/admin-component';
import SiriWave from './Component/user/siri-wave';
import InterviewPage  from './Component/user/interview-page';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/siri-wave" element={<SiriWave />} />
        <Route path='/interview-page' element={<InterviewPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;