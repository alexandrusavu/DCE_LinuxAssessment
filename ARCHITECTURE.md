# Linux Assessment Platform - Architecture & Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                            │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │       Frontend (React + Vite)                        │  │
│  │            http://localhost:3001                     │  │
│  │                                                       │  │
│  │  • LevelSelection Component                          │  │
│  │  • MCQAssessment Component                           │  │
│  │  • TerminalAssessment Component                      │  │
│  │  • Results Component                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           │ HTTP/JSON (/api proxy)          │
│                           ▼                                 │
└─────────────────────────────────────────────────────────────┘
                            │
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                 Backend Server (Express)                    │
│                  http://localhost:3000                      │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              API Routes                              │  │
│  │                                                       │  │
│  │  • /api/health                                       │  │
│  │  • /api/assessment/*                                 │  │
│  │  • /api/terminal/*                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                           │                                 │
│                           ▼                                 │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           Questions Database                         │  │
│  │                                                       │  │
│  │  • Junior MCQ Questions (10)                         │  │
│  │  • Junior Terminal Tasks (5)                         │  │
│  │  • Validation Logic                                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## User Flow

```
START
  │
  ▼
┌─────────────────────┐
│  Level Selection    │  ← User sees 3 levels
│  - Junior ✓         │    (only Junior available)
│  - Middle (Soon)    │
│  - Senior (Soon)    │
└──────────┬──────────┘
           │ Click "Start Assessment"
           ▼
┌─────────────────────┐
│   MCQ Assessment    │
│                     │
│  Question 1/10      │  ← User answers 10 questions
│  ┌──────────────┐   │
│  │ Option A     │   │  • Navigate with Prev/Next
│  │ Option B     │   │  • Select answers
│  │ Option C     │   │  • Progress bar shows status
│  │ Option D     │   │
│  └──────────────┘   │
│                     │
│  [Prev] [Next]      │
└──────────┬──────────┘
           │ Submit MCQ
           ▼
┌─────────────────────┐
│  Terminal Tasks     │
│                     │
│  Task 1/5: List     │  ← User completes 5 tasks
│  files with ls      │
│                     │
│  ┌────────────────┐ │  • Type commands
│  │ Terminal       │ │  • Execute with Enter
│  │ simulator      │ │  • Get hints if needed
│  │ > ls           │ │  • Validate solutions
│  └────────────────┘ │
│                     │
│  [Hint] [Validate]  │
└──────────┬──────────┘
           │ Finish Assessment
           ▼
┌─────────────────────┐
│   Results Screen    │
│                     │
│      🏆 85%         │  ← User sees detailed results
│                     │
│  MCQ: 8/10 (80%)    │  • Overall score
│  Terminal: 4/5      │  • Section breakdown
│                     │  • Performance level
│  Performance: ✅     │  • Question review
│  Good!              │  • Explanations
│                     │
│  [Review Answers]   │
│  [Restart]          │
└─────────────────────┘
           │
           │ Take Another Assessment
           ▼
         START
```

## API Request Flow

### 1. Get Assessment Questions
```
Frontend                    Backend
   │                           │
   │  GET /api/assessment/     │
   │      questions/junior     │
   ├──────────────────────────►│
   │                           │
   │                           ├─► Load questions.js
   │                           │
   │  ◄──────────────────────┤│
   │  { mcqQuestions: [...], │
   │    terminalTasks: [...] }│
   │                           │
```

### 2. Submit MCQ Answers
```
Frontend                    Backend
   │                           │
   │  POST /api/assessment/    │
   │       submit-mcq          │
   │  { level, answers }       │
   ├──────────────────────────►│
   │                           │
   │                           ├─► Validate answers
   │                           ├─► Calculate score
   │                           │
   │  ◄──────────────────────┤│
   │  { score, results, ...} │
   │                           │
```

### 3. Validate Terminal Command
```
Frontend                    Backend
   │                           │
   │  POST /api/terminal/      │
   │       validate            │
   │  { taskId, command }      │
   ├──────────────────────────►│
   │                           │
   │                           ├─► Check valid commands
   │                           ├─► Return hint if wrong
   │                           │
   │  ◄──────────────────────┤│
   │  { correct, hint, ... } │
   │                           │
```

## Data Flow - Assessment Session

```
User Session State (Frontend)
┌──────────────────────────────────────┐
│ currentLevel: 'junior'               │
│ mcqAnswers: { 1: 0, 2: 1, 3: 2, ...} │
│ terminalAnswers: { 101: {...}, ...} │
│ currentMCQIndex: 0                   │
│ currentTaskIndex: 0                  │
└──────────────────────────────────────┘

Questions Data (Backend)
┌──────────────────────────────────────┐
│ juniorQuestions: [                   │
│   { id, question, options,           │
│     correctAnswer, explanation }     │
│ ]                                    │
│                                      │
│ juniorTerminalTasks: [               │
│   { id, task, validCommands,         │
│     hint, expectedCommand }          │
│ ]                                    │
└──────────────────────────────────────┘
```

## Component Breakdown

### Frontend Components

1. **Level Selection**
   - Shows available assessment levels
   - Highlights available vs coming soon
   - Triggers assessment start

2. **MCQ Assessment**
   - Progress bar
   - Question display
   - Option selection
   - Navigation controls
   - Submit functionality

3. **Terminal Simulator**
   - Task description
   - Interactive terminal
   - Command execution
   - Validation
   - Hint system

4. **Results Display**
   - Score visualization
   - Section breakdown
   - Performance rating
   - Detailed review
   - Restart option

### Backend Routes

1. **Assessment Routes** (`/api/assessment/`)
   - `GET /levels` - List all levels
   - `GET /questions/:level` - Get questions
   - `POST /submit-mcq` - Submit and score

2. **Terminal Routes** (`/api/terminal/`)
   - `POST /execute` - Simulate command
   - `POST /validate` - Check answer

## Security Considerations

Current Implementation (POC):
- ✅ CORS enabled for local development
- ✅ Input validation on commands
- ✅ No actual shell execution (simulated)
- ✅ No user data storage

Future Enhancements:
- [ ] Rate limiting
- [ ] User authentication
- [ ] Session management
- [ ] Input sanitization
- [ ] Database for user progress

## Performance

- Lightweight: No complex dependencies
- Fast: Direct file serving
- Responsive: Real-time feedback
- Scalable: Stateless API design

## Extension Points

To add Middle/Senior levels:
1. Add questions in `server/data/questions.js`
2. Update available flag in `/api/assessment/levels`
3. Frontend automatically picks up new levels

To add more commands:
1. Update `server/routes/terminal.js` execute handler
2. Add command to help text
3. Create validation logic if needed

---

This architecture provides a solid foundation for a scalable, maintainable assessment platform.
