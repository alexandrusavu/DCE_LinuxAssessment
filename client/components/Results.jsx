import React from 'react';

function Results({ mcqResults, terminalTasks, terminalAnswers, onRestart }) {
  const terminalCorrect = Object.values(terminalAnswers).filter(a => a.correct).length;
  const totalTerminal = terminalTasks.length;
  
  const mcqPercentage = mcqResults.score;
  const terminalPercentage = (terminalCorrect / totalTerminal) * 100;
  const overallScore = Math.round((mcqPercentage + terminalPercentage) / 2);
  
  let performanceLevel = '';
  let performanceColor = '';
  if (overallScore >= 90) {
    performanceLevel = '🌟 Excellent!';
    performanceColor = 'var(--success-color)';
  } else if (overallScore >= 75) {
    performanceLevel = '✅ Good!';
    performanceColor = 'var(--primary-color)';
  } else if (overallScore >= 60) {
    performanceLevel = '👍 Fair';
    performanceColor = 'var(--warning-color)';
  } else {
    performanceLevel = '📚 Needs Improvement';
    performanceColor = 'var(--danger-color)';
  }

  return (
    <div className="screen active" id="results">
      <div className="container">
        <div className="results-container">
          <div className="results-header">
            <i className="fas fa-trophy results-icon"></i>
            <h2><span className="google-title">Assessment Complete!</span></h2>
          </div>
          
          <div className="score-display">
            <div className="score-circle">
              <span className="score-number">{overallScore}</span>
              <span className="score-label">Score</span>
            </div>
          </div>
          
          <div className="results-details">
            <h3>Summary</h3>
            <div className="result-item">
              <span>MCQ Score:</span>
              <span>{mcqResults.correctCount}/{mcqResults.totalQuestions}</span>
            </div>
            <div className="result-item">
              <span>Terminal Tasks:</span>
              <span>{terminalCorrect}/{totalTerminal}</span>
            </div>
            <div className="result-item">
              <span>Overall Performance:</span>
              <span style={{ color: performanceColor }}>{performanceLevel}</span>
            </div>
          </div>

          <div id="mcq-review" className="review-section">
            <h3>MCQ Review</h3>
          
          <div className="mcq-results">
            <h4>MCQ Questions</h4>
            {mcqResults.results.map((result, index) => (
              <div 
                key={result.questionId}
                className={`result-item ${result.correct ? 'correct' : 'incorrect'}`}
              >
                <div className="result-header">
                  <span className="question-number">Question {index + 1}</span>
                  <span className={`result-badge ${result.correct ? 'success' : 'error'}`}>
                    {result.correct ? '✓ Correct' : '✗ Incorrect'}
                  </span>
                </div>
                {!result.correct && (
                  <div className="result-explanation">
                    <strong>Explanation:</strong> {result.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="terminal-results">
            <h4>Terminal Tasks</h4>
            {terminalTasks.map((task, index) => {
              const answer = terminalAnswers[task.id];
              return (
                <div 
                  key={task.id}
                  className={`result-item ${answer?.correct ? 'correct' : 'incorrect'}`}
                >
                  <div className="result-header">
                    <span className="question-number">Task {index + 1}</span>
                    <span className={`result-badge ${answer?.correct ? 'success' : 'error'}`}>
                      {answer?.correct ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <div className="task-description">{task.task}</div>
                  {answer && (
                    <div className="your-answer">
                      <strong>Your command:</strong> <code>{answer.command}</code>
                    </div>
                  )}
                  {!answer?.correct && (
                    <div className="expected-answer">
                      <strong>Expected:</strong> <code>{task.expectedCommand}</code>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <button id="restart-btn" className="btn btn-primary" onClick={onRestart}>
            <i className="fas fa-redo"></i> Take Another Assessment
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Results;
