import React, { useState } from 'react';
import LevelSelection from './components/LevelSelection';
import MCQAssessment from './components/MCQAssessment';
import TerminalAssessment from './components/TerminalAssessment';
import Results from './components/Results';

const API_BASE_URL = '/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState('level-selection');
  const [currentLevel, setCurrentLevel] = useState('');
  const [mcqQuestions, setMcqQuestions] = useState([]);
  const [terminalTasks, setTerminalTasks] = useState([]);
  const [mcqResults, setMcqResults] = useState(null);
  const [terminalAnswers, setTerminalAnswers] = useState({});

  const startAssessment = async (level) => {
    setCurrentLevel(level);
    try {
      const response = await fetch(`${API_BASE_URL}/assessment/questions/${level}`);
      const data = await response.json();
      
      if (data.success) {
        setMcqQuestions(data.mcqQuestions);
        setTerminalTasks(data.terminalTasks);
        setCurrentScreen('mcq-assessment');
      } else {
        alert('Failed to load assessment');
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      alert('Failed to load assessment. Please try again.');
    }
  };

  const submitMCQ = async (answers) => {
    try {
      const response = await fetch(`${API_BASE_URL}/assessment/submit-mcq`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          level: currentLevel,
          answers: answers
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setMcqResults(data);
        setCurrentScreen('terminal-assessment');
      } else {
        alert('Failed to submit MCQ answers');
      }
    } catch (error) {
      console.error('Error submitting MCQ:', error);
      alert('Failed to submit answers. Please try again.');
    }
  };

  const finishAssessment = (answers) => {
    setTerminalAnswers(answers);
    setCurrentScreen('results');
  };

  const restartAssessment = () => {
    setCurrentScreen('level-selection');
    setCurrentLevel('');
    setMcqQuestions([]);
    setTerminalTasks([]);
    setMcqResults(null);
    setTerminalAnswers({});
  };

  return (
    <div className="app">
      {currentScreen === 'level-selection' && (
        <LevelSelection onStartAssessment={startAssessment} />
      )}
      
      {currentScreen === 'mcq-assessment' && (
        <MCQAssessment 
          questions={mcqQuestions}
          onSubmit={submitMCQ}
        />
      )}
      
      {currentScreen === 'terminal-assessment' && (
        <TerminalAssessment 
          tasks={terminalTasks}
          onFinish={finishAssessment}
        />
      )}
      
      {currentScreen === 'results' && (
        <Results 
          mcqResults={mcqResults}
          terminalTasks={terminalTasks}
          terminalAnswers={terminalAnswers}
          onRestart={restartAssessment}
        />
      )}
    </div>
  );
}

export default App;
