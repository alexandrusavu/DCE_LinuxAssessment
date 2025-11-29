# Linux Assessment Platform - Setup & Usage Guide

## Overview
A web-based platform for testing Linux knowledge with:
- **MCQ Tests**: 10 multiple-choice questions covering basic Linux concepts
- **Terminal Simulator**: 5 hands-on tasks with interactive bash-like terminal
- **Real-time Scoring**: Instant feedback and detailed results

## Current Implementation (POC)
✅ Junior Level Assessment
- Basic Linux commands (ls, cd, pwd, mkdir, etc.)
- File navigation and management
- Permissions basics
- 10 MCQ questions + 5 terminal tasks

## Prerequisites

### Required
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

### For macOS users
Install Node.js using Homebrew (recommended):
```bash
brew install node
```

Or download from: https://nodejs.org/

## Installation

### Option 1: Using setup script (Recommended)
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual setup
```bash
# Install backend dependencies
npm install
```

## Running the Application (React + Vite)

### Start Backend + Frontend concurrently
```bash
npm run dev
```

This starts:
- **Express API** on `http://localhost:3000`
- **Vite React App** on `http://localhost:3001`

Vite proxies API requests from `/api/*` to the backend automatically.

## Project Structure

```
DCE_LinuxAssessment/
├── server/                          # Backend API (ES Modules)
│   ├── index.js                    # Express server entry
│   ├── config/
│   │   └── index.js               # Environment configuration
│   ├── middleware/
│   │   ├── index.js               # Middleware setup
│   │   └── errorHandler.js        # Error handling
│   ├── controllers/
│   │   ├── assessment.controller.js
│   │   └── terminal.controller.js
│   ├── services/                   # Business logic
│   │   ├── assessment.service.js
│   │   ├── terminalCommand.service.js
│   │   └── terminalSession.service.js
│   ├── routes/
│   │   ├── assessment.js
│   │   └── terminal.js
│   ├── utils/
│   │   └── pathUtils.js
│   └── data/
│       └── questions.js            # Questions database
├── client/                          # Frontend (React + Vite)
│   ├── index.html                   # React entry
│   ├── index.jsx                    # React root
│   ├── App.jsx                      # Main component
│   ├── styles.css                   # Styles
│   └── components/                  # React components
├── Visual Demo/                     # Demo videos
├── package.json                     # Dependencies
└── [Documentation Files]            # *.md files
```

## API Endpoints

### Assessment Endpoints
- `GET /api/assessment/levels` - Get available assessment levels
- `GET /api/assessment/questions/:level` - Get questions for specific level
- `POST /api/assessment/submit-mcq` - Submit MCQ answers (exam mode)

### Terminal Endpoints
- `POST /api/terminal/execute` - Execute a terminal command
- `POST /api/terminal/validate` - Validate task solution (exam mode - no hints)
- `POST /api/terminal/reset` - Reset terminal session

### Health Check
- `GET /api/health` - Check server status with version info

## Assessment Flow

1. **Level Selection**: Choose Junior level (others coming soon)
2. **MCQ Test**: Answer 10 multiple-choice questions (Exam Mode)
   - Single attempt per question
   - No hints provided
   - Navigate with Previous/Next buttons
   - Answers saved automatically
   - Submit when complete
3. **Terminal Tasks**: Complete 5 hands-on challenges (Exam Mode)
   - Type commands in the simulated terminal
   - Execute with Enter key
   - Single validation attempt
   - No hints provided
   - Automatic progression (correct or incorrect)
4. **Results**: View comprehensive results
   - Overall score percentage
   - MCQ section breakdown
   - Terminal section performance
   - Detailed explanations for all questions

## Terminal Simulator Features

### Supported Commands
- `ls` - List files
- `pwd` - Print working directory
- `mkdir <name>` - Create directory
- `touch <file>` - Create file
- `cat <file>` - View file contents
- `cd <path>` - Change directory
- `whoami` - Display username
- `date` - Show current date
- `clear` - Clear terminal
- `help` - Show available commands

### Task Validation
The simulator validates your commands against expected solutions:
- ✅ Correct command → proceed to next task
- ❌ Incorrect → receive hints and try again

## Scoring System

### MCQ Section (50% weight)
- 10 questions
- Each correct answer = 10%
- Total: 100 points

### Terminal Section (50% weight)
- 5 tasks
- Each correct task = 20%
- Total: 100 points

### Overall Performance
- **90-100%**: 🌟 Excellent
- **75-89%**: ✅ Good
- **60-74%**: 👍 Fair
- **Below 60%**: 📚 Needs Improvement

## Junior Level Topics

### MCQ Coverage
- Basic Linux commands
- Directory navigation
- File operations
- Permission systems
- Command utilities

### Terminal Tasks
1. List files with `ls`
2. Create directory with `mkdir`
3. Display current path with `pwd`
4. Create file with `touch`
5. View file contents with `cat`

## Development

### Starting Development Server
```bash
npm run server
```

### File Watching (Auto-reload)
Uses `nodemon` for automatic server restart on file changes.

### Adding New Questions
Edit `server/data/questions.js`:

```javascript
// Add MCQ question
{
  id: 11,
  type: 'mcq',
  level: 'junior',
  question: 'Your question here?',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 0,  // Index of correct option
  explanation: 'Why this is correct'
}

// Add terminal task
{
  id: 106,
  type: 'terminal',
  level: 'junior',
  task: 'Task description',
  description: 'Detailed instructions',
  expectedCommand: 'command',
  validCommands: ['command', 'alternative'],
  hint: 'Helpful hint'
}
```

## Troubleshooting

### Server won't start
```bash
# Check if ports 3000/3001 are in use
lsof -ti:3000
lsof -ti:3001

# Kill processes if needed
kill -9 $(lsof -ti:3000)
kill -9 $(lsof -ti:3001)
```

### Cannot connect to API
1. Ensure backend (3000) and Vite (3001) are running (`npm run dev`)
2. Check browser console for errors
3. Verify Vite proxy in `vite.config.js` (`/api` → `http://localhost:3000`)

### Terminal commands not working
1. Check server logs for errors
2. Verify `/api/terminal/execute` endpoint is accessible
3. Check browser console for JavaScript errors

## Future Enhancements

### Planned Features
- 🔄 Middle Level Assessment
- 🔄 Senior Level Assessment
- 🔄 User Authentication
- 🔄 Progress Tracking
- 🔄 Certificate Generation
- 🔄 More Terminal Commands
- 🔄 Time Limits
- 🔄 Randomized Questions
- 🔄 Leaderboard

### Middle Level (Planned)
- Shell scripting
- Process management
- System monitoring
- Package management
- Advanced file operations

### Senior Level (Planned)
- Performance tuning
- Security hardening
- Network configuration
- Troubleshooting
- System optimization

## Contributing

To add new features:
1. Create feature branch
2. Add questions in `server/data/questions.js`
3. Update routes if needed
4. Test thoroughly
5. Submit pull request

## License
MIT License

## Support

For issues or questions:
1. Check this README
2. Review server logs
3. Check browser console
4. Create an issue on GitHub

---

**Happy Learning! 🚀**
