import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzeProblemPage from './pages/AnalyzeProblemPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/history" element={<DashboardPage />} />
        <Route path="/chat" element={<DashboardPage />} />
        <Route path="/quiz" element={<DashboardPage />} />
        <Route path="/performance" element={<DashboardPage />} />
        <Route path="/analyze" element={<AnalyzeProblemPage />} />
      </Routes>
    </Router>
  );
}

export default App;
