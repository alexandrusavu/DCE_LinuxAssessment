import React, { useState } from 'react';

function MCQAssessment({ questions, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const selectOption = (questionId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const previousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    const unanswered = questions.filter(q => answers[q.id] === undefined);
    if (unanswered.length > 0) {
      if (!confirm(`You have ${unanswered.length} unanswered question(s). Submit anyway?`)) {
        return;
      }
    }
    onSubmit(answers);
  };

  return (
    <div className="screen active" id="mcq-assessment">
      <div className="container">
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            Question {currentIndex + 1} of {questions.length}
          </div>
        </div>

        <div className="question-container">
          <h2 className="question-text"><span className="google-title">{currentQuestion.question}</span></h2>
          
          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`option ${answers[currentQuestion.id] === index ? 'selected' : ''}`}
                onClick={() => selectOption(currentQuestion.id, index)}
                data-index={index}
              >
                {String.fromCharCode(65 + index)}. {option}
                {answers[currentQuestion.id] === index && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="btn btn-secondary"
            onClick={previousQuestion}
            disabled={currentIndex === 0}
          >
            <i className="fas fa-arrow-left"></i> Previous
          </button>

          {currentIndex === questions.length - 1 ? (
            <button className="btn btn-success" onClick={handleSubmit}>
              Submit MCQ <i className="fas fa-check"></i>
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={nextQuestion}
            >
              Next <i className="fas fa-arrow-right"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MCQAssessment;
