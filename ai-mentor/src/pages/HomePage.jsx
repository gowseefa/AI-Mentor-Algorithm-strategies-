import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">AI Mentor</h1>
        <p className="home-subtitle">Convert problem statements into the best algorithm strategies.</p>
        <button className="get-started-button" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default HomePage;
