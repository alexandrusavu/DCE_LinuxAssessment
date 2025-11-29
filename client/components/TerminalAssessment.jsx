import React, { useState, useEffect, useRef } from 'react';

const API_BASE_URL = '/api';

function TerminalAssessment({ tasks, onFinish }) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [sessionId] = useState('session-' + Date.now());
  const [currentDir, setCurrentDir] = useState('/home/student');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState({});
  const [showNextButton, setShowNextButton] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  const currentTask = tasks[currentTaskIndex];

  useEffect(() => {
    loadTerminalTask(currentTaskIndex);
  }, [currentTaskIndex]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [terminalOutput]);

  const loadTerminalTask = (index) => {
    const task = tasks[index];
    const initialOutput = [];

    if (index === 0) {
      initialOutput.push(
        { type: 'text', content: 'Welcome to the Linux Assessment Terminal Simulator' },
        { type: 'text', content: 'Type commands as you would in a real Linux terminal' },
        { type: 'text', content: 'Use arrow keys (↑/↓) to navigate command history' },
        { type: 'text', content: "Type 'help' for available commands" },
        { type: 'text', content: '' },
        { type: 'task', content: `Task ${index + 1}: ${task.task}` },
        { type: 'text', content: '' }
      );
    } else {
      initialOutput.push(
        { type: 'task', content: `Task ${index + 1}: ${task.task}` },
        { type: 'text', content: '' }
      );
    }

    setTerminalOutput(initialOutput);
    setInputValue('');
    setShowNextButton(false);
    setShowFinishButton(false);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const executeCommand = async () => {
    const command = inputValue.trim();
    if (!command) return;

    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);

    const dirName = currentDir === '/home/student' ? '~' : currentDir;
    setTerminalOutput(prev => [
      ...prev,
      { type: 'command', content: `student@assessment-platform:${dirName}$ ${command}` }
    ]);

    try {
      const response = await fetch(`${API_BASE_URL}/terminal/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, sessionId })
      });

      const data = await response.json();

      if (data.output === '[CLEAR]') {
        setTerminalOutput([]);
      } else if (data.output) {
        // Split multi-line output into separate lines for better rendering
        const lines = data.output.split('\n');
        const newLines = lines.map(line => ({ type: 'output', content: line }));
        setTerminalOutput(prev => [...prev, ...newLines]);
      }

      if (data.currentDir) {
        setCurrentDir(data.currentDir);
      }
    } catch (error) {
      console.error('Error executing command:', error);
      setTerminalOutput(prev => [
        ...prev,
        { type: 'error', content: 'Error: Could not execute command' }
      ]);
    }

    setInputValue('');
  };

  const validateTask = async () => {
    const command = commandHistory[commandHistory.length - 1];

    if (!command) {
      setTerminalOutput(prev => [
        ...prev,
        { type: 'warning', content: 'Please execute a command first, then click Validate' }
      ]);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/terminal/validate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          taskId: currentTask.id,
          command,
          sessionId
        })
      });

      const data = await response.json();

      setTerminalOutput(prev => [
        ...prev,
        {
          type: data.correct ? 'success' : 'error',
          content: `Validation: ${data.message}`
        }
      ]);

      if (data.correct) {
        setAnswers(prev => ({
          ...prev,
          [currentTask.id]: { command, correct: true }
        }));
      } else {
        setAnswers(prev => ({
          ...prev,
          [currentTask.id]: { command, correct: false }
        }));
      }

      // Always show next/finish button after validation (exam mode)
      if (currentTaskIndex < tasks.length - 1) {
        setShowNextButton(true);
      } else {
        setShowFinishButton(true);
      }
    } catch (error) {
      console.error('Error validating task:', error);
      alert('Failed to validate command. Please try again.');
    }
  };

  const nextTask = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const finishAssessment = () => {
    onFinish(answers);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  const dirName = currentDir === '/home/student' ? '~' : currentDir;

  return (
    <div className="screen active" id="terminal-assessment">
      <div className="container">
        <div className="task-info">
          <h3>
            <span className="google-title">Terminal Challenge</span> <span id="task-number">({currentTaskIndex + 1}/{tasks.length})</span>
          </h3>
          <p>{currentTask.description}</p>
          <div className="task-objective">
            <strong>Task:</strong> <span>{currentTask.task}</span>
          </div>
        </div>

        <div className="terminal-simulator">
          <div className="terminal-header">
            <span className="terminal-title">
              <i className="fas fa-terminal"></i> student@assessment-platform:~
            </span>
          </div>
          <div className="terminal-body" ref={outputRef}>
            {terminalOutput.map((line, index) => (
              <div
                key={index}
                className={`terminal-line ${line.type || ''}`}
              >
                {line.content}
              </div>
            ))}
          </div>

          <div className="terminal-input-line">
            <span className="terminal-prompt">
              student@assessment-platform:{dirName}$
            </span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          </div>
        </div>

        <div className="terminal-controls">
          <button
            className="btn btn-primary"
            onClick={validateTask}
            style={{ display: (!showNextButton && !showFinishButton) ? 'inline-flex' : 'none' }}
          >
            <i className="fas fa-check-circle"></i> Validate
          </button>

          {showNextButton && (
            <button className="btn btn-primary" onClick={nextTask}>
              Next Task <i className="fas fa-arrow-right"></i>
            </button>
          )}

          {showFinishButton && (
            <button className="btn btn-success" onClick={finishAssessment}>
              Finish Assessment <i className="fas fa-flag-checkered"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TerminalAssessment;
