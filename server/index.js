const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const assessmentRoutes = require('./routes/assessment');
const terminalRoutes = require('./routes/terminal');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/assessment', assessmentRoutes);
app.use('/api/terminal', terminalRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Linux Assessment Platform API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
