import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/index.js';
import { setupMiddleware } from './middleware/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import assessmentRoutes from './routes/assessment.js';
import terminalRoutes from './routes/terminal.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Setup middleware
setupMiddleware(app);

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// API Routes
app.use('/api/assessment', assessmentRoutes);
app.use('/api/terminal', terminalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Linux Assessment Platform API is running',
    environment: config.nodeEnv,
    version: '1.0.0'
  });
});

// Serve index.html for client routes (SPA support)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// 404 handler for API routes only
app.use('/api/*', notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 Server running in ${config.nodeEnv} mode on port ${config.port}`);
  console.log(`📋 API available at http://localhost:${config.port}/api`);
});
