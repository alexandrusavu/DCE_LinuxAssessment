# Linux Assessment Platform

A modern, web-based platform for testing Linux knowledge with multiple-choice questions and an interactive bash-like simulator. Built with Node.js, Express, and modern ES modules architecture.

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/) or `brew install node`)

### Installation & Setup
```bash
# 1. Clone the repository
git clone https://github.com/alexandrusavu/DCE_LinuxAssessment.git
cd DCE_LinuxAssessment

# 2. Install dependencies
npm install

# 3. Start the server
npm run server

# 4. Open your browser to http://localhost:3000
```

That's it! The server now serves both the API and the client application.

## ✨ Features

- **Exam Mode Assessment**: No hints, single attempt per question - just like a real certification
- **MCQ Tests**: 10 comprehensive multiple-choice questions
- **Interactive Terminal**: 5 hands-on bash simulation tasks  
- **Real-time Validation**: Instant feedback - correct or incorrect
- **Detailed Results**: Score breakdown with explanations
- **Modern Architecture**: ES modules, service-oriented design, security middleware
- **Junior Level Assessment**: Basic Linux commands and concepts

## 📚 What's Included (POC)

### MCQ Topics
- Basic Linux commands (ls, cd, pwd, mkdir, rm, cp, cat)
- File and directory operations
- Permission systems (chmod)
- Command utilities (sudo)

### Terminal Tasks
1. List files with `ls`
2. Create directories with `mkdir`
3. Display current path with `pwd`
4. Create files with `touch`
5. View file contents with `cat`

## 📖 Documentation

See [SETUP.md](SETUP.md) for detailed documentation including:
- Complete installation guide
- API endpoints
- Project structure
- Development guide
- Troubleshooting

## 🎯 Assessment Flow

1. **Select Level** → Choose Junior (Middle & Senior coming soon)
2. **MCQ Test** → Answer 10 questions about Linux basics
3. **Terminal Tasks** → Complete 5 hands-on challenges
4. **Results** → View your score and review answers

## 🛠 Tech Stack

### Backend
- **Runtime**: Node.js v16+
- **Framework**: Express.js 4.18
- **Architecture**: ES Modules, Service-Oriented
- **Security**: Helmet, Express Rate Limit
- **Logging**: Morgan
- **Dev Tools**: Nodemon, ESLint

### Frontend  
- **HTML5**: Semantic markup
- **CSS3**: Modern responsive design
- **JavaScript**: Vanilla ES6+ (no framework)
- **No build tools**: Direct browser execution

## 📁 Project Structure

```
DCE_LinuxAssessment/
├── server/                          # Backend API (ES Modules)
│   ├── index.js                    # Express server entry
│   ├── config/                     # Configuration
│   │   └── index.js               # Environment settings
│   ├── middleware/                 # Middleware layer
│   │   ├── index.js               # Middleware setup
│   │   └── errorHandler.js        # Error handling
│   ├── controllers/                # HTTP request handlers
│   │   ├── assessment.controller.js
│   │   └── terminal.controller.js
│   ├── services/                   # Business logic
│   │   ├── assessment.service.js
│   │   ├── terminalCommand.service.js
│   │   └── terminalSession.service.js
│   ├── routes/                     # API routes
│   │   ├── assessment.js
│   │   └── terminal.js
│   ├── utils/                      # Utilities
│   │   └── pathUtils.js
│   └── data/                       # Questions database
│       └── questions.js
├── client/                          # Frontend
│   ├── index.html                  # Main page
│   ├── styles.css                  # Styles
│   └── app.js                      # Application logic
├── Visual Demo/                     # Demo videos
└── package.json                     # Dependencies
```

## 🌐 API Endpoints

Base URL: `http://localhost:3000/api`

### Assessment
- `GET /api/assessment/levels` - Get available levels
- `GET /api/assessment/questions/:level` - Get questions for level
- `POST /api/assessment/submit-mcq` - Submit MCQ answers

### Terminal
- `POST /api/terminal/execute` - Execute terminal command
- `POST /api/terminal/validate` - Validate task solution (exam mode)
- `POST /api/terminal/reset` - Reset terminal session

### Health
- `GET /api/health` - Server health check with version info

## 📊 Scoring

- **MCQ**: 10 questions × 10% = 100%
- **Terminal**: 5 tasks × 20% = 100%
- **Overall**: Average of both sections

Performance Levels:
- 🌟 90-100%: Excellent
- ✅ 75-89%: Good
- 👍 60-74%: Fair
- 📚 <60%: Needs Improvement

## 🔮 Roadmap

- [ ] Middle Level Assessment (Advanced commands, scripting)
- [ ] Senior Level Assessment (System admin, security)
- [ ] User Authentication
- [ ] Progress Tracking
- [ ] More Terminal Commands
- [ ] Timed Assessments
- [ ] Certificate Generation
- [ ] Leaderboard

## 🐛 Troubleshooting

**Server won't start?**
```bash
# Kill process on port 3000
kill -9 $(lsof -ti:3000)
npm run server
```

**Can't connect to API?**
- Ensure server is running on port 3000
- Check browser console for errors
- Verify `client/app.js` → `API_BASE_URL: 'http://localhost:3000/api'`

## 📝 License

MIT License

---

**Start your Linux learning journey today! 🐧**
