import terminalCommandService from '../services/terminalCommand.service.js';
import terminalSessionService from '../services/terminalSession.service.js';
import { asyncHandler } from '../middleware/errorHandler.js';
import { AppError } from '../middleware/errorHandler.js';

export const terminalController = {
  execute: asyncHandler(async (req, res) => {
    const { command, sessionId } = req.body;

    if (!command) {
      throw new AppError('Command is required', 400);
    }

    if (!sessionId) {
      throw new AppError('Session ID is required', 400);
    }

    const result = terminalCommandService.execute(sessionId, command);
    res.json(result);
  }),

  validate: asyncHandler(async (req, res) => {
    const { taskId, command, sessionId } = req.body;

    if (taskId === undefined) {
      throw new AppError('Task ID is required', 400);
    }

    if (!command) {
      throw new AppError('Command is required', 400);
    }

    if (!sessionId) {
      throw new AppError('Session ID is required', 400);
    }

    const result = terminalCommandService.validate(taskId, command, sessionId);
    res.json(result);
  }),

  reset: asyncHandler(async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
      throw new AppError('Session ID is required', 400);
    }

    // Delete old session and create new one
    terminalSessionService.deleteSession(sessionId);
    const newSession = terminalSessionService.createSession();
    
    res.json({
      success: true,
      sessionId: newSession.id,
      message: 'Terminal session reset successfully'
    });
  })
};
