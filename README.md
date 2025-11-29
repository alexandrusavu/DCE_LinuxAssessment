# Linux Assessment Platform

A modern, web-based platform for testing Linux knowledge with multiple-choice questions and an interactive bash-like simulator. Built with Node.js, Express, and modern ES modules.

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

- **MCQ Tests**: 10 comprehensive multiple-choice questions
- **Interactive Terminal**: 5 hands-on bash simulation tasks
- **Real-time Validation**: Instant feedback on answers
- **Detailed Results**: Score breakdown with explanations
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

- **Backend**: Node.js + Express
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Terminal Simulator**: Custom implementation with command validation
- **No build tools required**: Run directly in browser

## 📁 Project Structure

```
DCE_LinuxAssessment/
├── server/              # Backend API
│   ├── index.js        # Express server
│   ├── routes/         # API routes
│   └── data/           # Questions database
├── client/             # Frontend
│   ├── index.html      # Main page
│   ├── styles.css      # Styles
│   └── app.js          # Application logic
└── package.json        # Dependencies
```

## 🌐 API Endpoints

- `GET /api/health` - Server health check
- `GET /api/assessment/levels` - Available levels
- `GET /api/assessment/questions/:level` - Get questions
- `POST /api/assessment/submit-mcq` - Submit answers
- `POST /api/terminal/validate` - Validate terminal command
- `POST /api/terminal/execute` - Execute command simulation

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
# Kill process on port 5000
kill -9 $(lsof -ti:5000)
npm run server
```

**Can't connect to API?**
- Ensure server is running on port 5000
- Check `client/app.js` → `API_BASE_URL`

## 📝 License

MIT License

---

**Start your Linux learning journey today! 🐧**
