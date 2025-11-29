const express = require('express');
const router = express.Router();
const { juniorTerminalTasks } = require('../data/questions');

// Validate terminal command
router.post('/validate', (req, res) => {
  const { taskId, command } = req.body;
  
  // Find the task
  const task = juniorTerminalTasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }
  
  // Normalize the command (trim whitespace)
  const normalizedCommand = command.trim().toLowerCase();
  
  // Check if command is valid
  const isValid = task.validCommands.some(validCmd => 
    normalizedCommand === validCmd.toLowerCase()
  );
  
  res.json({
    success: true,
    correct: isValid,
    expectedCommand: task.expectedCommand,
    hint: isValid ? null : task.hint,
    message: isValid ? 'Correct! Well done.' : 'Not quite right. Try again.'
  });
});

// Get simulated output for a command (for better user experience)
router.post('/execute', (req, res) => {
  const { command } = req.body;
  const cmd = command.trim().toLowerCase();
  
  // Simulate basic outputs
  let output = '';
  
  if (cmd === 'ls' || cmd.startsWith('ls ')) {
    output = 'Documents  Downloads  Pictures  Videos  projects  test.txt  readme.txt';
  } else if (cmd === 'pwd') {
    output = '/home/student';
  } else if (cmd.startsWith('mkdir ')) {
    const dirname = cmd.substring(6).trim();
    output = `Directory '${dirname}' created successfully`;
  } else if (cmd.startsWith('touch ')) {
    const filename = cmd.substring(6).trim();
    output = `File '${filename}' created successfully`;
  } else if (cmd.startsWith('cat ') || cmd.startsWith('less ') || cmd.startsWith('more ')) {
    const parts = cmd.split(' ');
    const filename = parts[1];
    if (filename === 'readme.txt') {
      output = 'Welcome to the Linux Assessment Platform!\nThis is a simulated Linux environment.\nPractice your commands here.';
    } else {
      output = `${filename}: File contents would be displayed here`;
    }
  } else if (cmd === 'whoami') {
    output = 'student';
  } else if (cmd === 'date') {
    output = new Date().toString();
  } else if (cmd === 'clear') {
    output = '[CLEAR]';
  } else if (cmd === 'help') {
    output = 'Available commands: ls, pwd, mkdir, touch, cat, cd, whoami, date, clear, help';
  } else {
    output = `bash: ${cmd.split(' ')[0]}: command not found`;
  }
  
  res.json({
    success: true,
    output,
    command
  });
});

module.exports = router;
