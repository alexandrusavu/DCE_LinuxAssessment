import express from 'express';
import { terminalController } from '../controllers/terminal.controller.js';

const router = express.Router();

// Execute terminal command
router.post('/execute', terminalController.execute);

// Validate terminal task
router.post('/validate', terminalController.validate);

// Reset session
router.post('/reset', terminalController.reset);

export default router;
