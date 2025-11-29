const express = require('express');
const router = express.Router();
const { juniorQuestions, juniorTerminalTasks } = require('../data/questions');

// Get assessment questions by level
router.get('/questions/:level', (req, res) => {
  const { level } = req.params;
  
  if (level === 'junior') {
    res.json({
      success: true,
      level: 'junior',
      mcqQuestions: juniorQuestions,
      terminalTasks: juniorTerminalTasks
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Assessment for ${level} level is not yet available`
    });
  }
});

// Submit MCQ answers
router.post('/submit-mcq', (req, res) => {
  const { level, answers } = req.body;
  
  if (level === 'junior') {
    let correctCount = 0;
    const results = juniorQuestions.map((question, index) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      return {
        questionId: question.id,
        correct: isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      };
    });
    
    const score = (correctCount / juniorQuestions.length) * 100;
    
    res.json({
      success: true,
      score: Math.round(score),
      correctCount,
      totalQuestions: juniorQuestions.length,
      results
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid assessment level'
    });
  }
});

// Get all available levels
router.get('/levels', (req, res) => {
  res.json({
    success: true,
    levels: [
      {
        id: 'junior',
        name: 'Junior Linux Skills',
        description: 'Basic Linux commands, file navigation, and permissions',
        available: true
      },
      {
        id: 'middle',
        name: 'Middle Linux Skills',
        description: 'Advanced commands, scripting, and system administration',
        available: false
      },
      {
        id: 'senior',
        name: 'Senior Linux Skills',
        description: 'Expert-level system optimization, security, and troubleshooting',
        available: false
      }
    ]
  });
});

module.exports = router;
