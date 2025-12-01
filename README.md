# Linux Assessment Platform for DCE

A modern, web-based platform for testing Linux knowledge with multiple-choice questions and an interactive bash-like simulator. Backend built with Node.js/Express (ES Modules). Frontend built with React + Vite.

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16+ ([Download](https://nodejs.org/) or `brew install node`)

### Installation & Setup (React + Vite)
```bash
# 1. Clone the repository
git clone https://github.com/alexandrusavu/DCE_LinuxAssessment.git
cd DCE_LinuxAssessment

# 2. Install dependencies
npm install

# 3. Start both backend (3000) and frontend (3001)
npm run dev

# 4. Open your browser to http://localhost:3001
```

Vite serves the React app on port 3001 and proxies `/api` calls to the Express API on port 3000.

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
- **React 18**: Component-based UI
- **Vite 7**: Fast dev server and build
- **CSS3**: Modern responsive design

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
├── client/                          # Frontend (React + Vite)
│   ├── index.html                  # React entry with root div
│   ├── index.jsx                   # React root entry point
│   ├── App.jsx                     # Main React component
│   ├── styles.css                  # Styles
│   └── components/                 # React components
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
- Ensure backend is running on port 3000 and Vite on 3001 (`npm run dev`)
- Check browser console for errors
- Verify `vite.config.js` proxy: `/api` → `http://localhost:3000`

## 🔧 Scripts

- `npm run dev` → Runs backend and Vite client concurrently
- `npm run server` → Runs Express API with Nodemon (port 3000)
- `npm run client` → Runs Vite React dev server (port 3001)
- `npm run build` → Builds React app to `dist/`
- `npm run preview` → Serves built app locally

## 📝 License

MIT License

---

**Start your Linux learning journey today! 🐧**


