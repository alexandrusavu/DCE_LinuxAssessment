import React, { useState, useEffect } from 'react';

const API_BASE_URL = '/api';

function LevelSelection({ onStartAssessment }) {
  const [levels, setLevels] = useState([
    {
      id: 'junior',
      name: 'Junior Linux Skills',
      description: 'Basic Linux commands, file navigation, and permissions',
      available: true,
      icon: '👤'
    },
    {
      id: 'middle',
      name: 'Middle Linux Skills',
      description: 'Advanced commands, scripting, and system administration',
      available: false,
      icon: '👔'
    },
    {
      id: 'senior',
      name: 'Senior Linux Skills',
      description: 'Expert-level system optimization, security, and troubleshooting',
      available: false,
      icon: '🎓'
    }
  ]);

  return (
    <div className="screen active" id="level-selection">
      <div className="container">
        <div className="header">
          <h1>
            <i className="fas fa-desktop"></i> <span className="google-title">Linux Assessment Platform</span>
          </h1>
          <p className="subtitle">Test your Linux knowledge and skills</p>
        </div>

        <h2>Select Assessment Level</h2>

        <div className="level-cards">
          {levels.map(level => (
            <div 
              key={level.id}
              className={`level-card ${level.available ? 'available' : 'unavailable'}`}
              onClick={() => level.available && onStartAssessment(level.id)}
            >
              <div className="level-icon">{level.icon}</div>
              <h3>{level.name}</h3>
              <p>{level.description}</p>
              {level.available ? (
                <button className="btn btn-primary">
                  Start Assessment <i className="fas fa-arrow-right"></i>
                </button>
              ) : (
                <span className="badge">Coming Soon</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LevelSelection;
