import { juniorQuestions, juniorTerminalTasks } from '../data/questions.js';

class AssessmentService {
  constructor() {
    this.assessments = {
      junior: {
        questions: juniorQuestions,
        terminalTasks: juniorTerminalTasks
      }
    };
  }

  getLevels() {
    return Object.keys(this.assessments);
  }

  getQuestions(level) {
    const assessment = this.assessments[level];
    if (!assessment) {
      throw new Error(`Assessment level '${level}' not found`);
    }
    return assessment.questions;
  }

  getTerminalTasks(level) {
    const assessment = this.assessments[level];
    if (!assessment) {
      throw new Error(`Assessment level '${level}' not found`);
    }
    return assessment.terminalTasks;
  }

  calculateMcqScore(level, answers) {
    const questions = this.getQuestions(level);
    let correctCount = 0;
    const results = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctCount++;
      
      results.push({
        questionId: question.id,
        correct: isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    });

    const score = Math.round((correctCount / questions.length) * 100);

    return {
      success: true,
      score,
      correctCount,
      totalQuestions: questions.length,
      results
    };
  }

  calculateTerminalScore(level, completedTasks) {
    const tasks = this.getTerminalTasks(level);
    const score = completedTasks.length;
    const total = tasks.length;

    return {
      score,
      total,
      percentage: Math.round((score / total) * 100),
      completedTasks
    };
  }
}

export const assessmentService = new AssessmentService();
