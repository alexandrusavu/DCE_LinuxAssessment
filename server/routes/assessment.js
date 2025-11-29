import express from 'express';
import { assessmentController } from '../controllers/assessment.controller.js';

const router = express.Router();

// Get available assessment levels
router.get('/levels', assessmentController.getLevels);

// Get assessment questions by level
router.get('/questions/:level', assessmentController.getQuestions);

// Submit MCQ answers
router.post('/submit-mcq', assessmentController.submitMcq);

export default router;
