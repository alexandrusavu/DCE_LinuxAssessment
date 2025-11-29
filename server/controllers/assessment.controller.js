import { assessmentService } from '../services/assessment.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

export const assessmentController = {
  getLevels: asyncHandler(async (req, res) => {
    const levels = assessmentService.getLevels();
    res.json({ levels });
  }),

  getQuestions: asyncHandler(async (req, res) => {
    const { level } = req.params;
    const mcqQuestions = assessmentService.getQuestions(level);
    const terminalTasks = assessmentService.getTerminalTasks(level);
    res.json({
      success: true,
      level,
      mcqQuestions,
      terminalTasks
    });
  }),

  submitMcq: asyncHandler(async (req, res) => {
    const { level, answers } = req.body;
    
    if (!level || !answers) {
      throw new AppError('Level and answers are required', 400);
    }

    if (typeof answers !== 'object') {
      throw new AppError('Answers must be an object', 400);
    }

    const result = assessmentService.calculateMcqScore(level, answers);
    res.json(result);
  })
};
