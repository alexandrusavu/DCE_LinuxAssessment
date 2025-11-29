# React Migration Guide

## Overview
The Linux Assessment Platform frontend has been successfully migrated from vanilla JavaScript to React.js on the **Experiments** branch. This migration maintains all existing functionality while leveraging React's modern component-based architecture.

## Tech Stack

### Frontend
- **React 18.x** - UI library with hooks and functional components
- **Vite 7.x** - Fast build tool and dev server
- **Port 3001** - Vite development server

### Backend
- **Express.js** - REST API (unchanged)
- **Port 3000** - Backend API server

## Architecture

### Project Structure
```
client/
├── index.html          # React entry HTML (updated)
├── index.jsx           # React root entry point
├── App.jsx             # Main application component
├── styles.css          # Global styles (reused from vanilla JS)
├── components/
│   ├── LevelSelection.jsx       # Level selection screen
│   ├── MCQAssessment.jsx        # Multiple choice questions
│   ├── TerminalAssessment.jsx   # Terminal simulator
│   └── Results.jsx              # Results display
├── app.js              # (Legacy vanilla JS - not used)
└── vite.config.js      # Vite configuration
```

### Component Hierarchy
```
App
├── LevelSelection
├── MCQAssessment
├── TerminalAssessment
└── Results
```

## Key Changes

### 1. Entry Point
**Before (vanilla JS):**
```html
<script src="app.js"></script>
```

**After (React):**
```html
<div id="root"></div>
<script type="module" src="/index.jsx"></script>
```

### 2. State Management
- **Before:** Global variables and DOM manipulation
- **After:** React `useState` hooks for component state
- **App.jsx:** Manages global state (screen navigation, assessment data, results)
- **Components:** Manage local state (current question, terminal input, etc.)

### 3. API Integration
All API calls maintained with `fetch()` API:
- `/api/assessment/questions/:level` - Load assessment
- `/api/assessment/submit-mcq` - Submit MCQ answers
- `/api/terminal/execute` - Execute terminal commands
- `/api/terminal/validate` - Validate terminal tasks

### 4. Routing
Screen navigation handled via state instead of DOM manipulation:
```javascript
const [currentScreen, setCurrentScreen] = useState('level-selection');
```

## Development Scripts

### Start Development Servers
```bash
npm run dev
```
Starts both Express backend (port 3000) and Vite dev server (port 3001) concurrently.

### Individual Servers
```bash
npm run server  # Backend only (nodemon)
npm run client  # Frontend only (Vite)
```

### Build for Production
```bash
npm run build   # Build React app to dist/
npm run preview # Preview production build
```

## Component Details

### LevelSelection.jsx
- Displays available assessment levels (Junior/Middle/Senior)
- Handles level selection and initiates assessment loading
- Props: `onStartAssessment(level)`

### MCQAssessment.jsx
- Question navigation with progress tracking
- Option selection with visual feedback
- Answer persistence across questions
- Props: `questions`, `onSubmit(answers)`

### TerminalAssessment.jsx
- Full-featured terminal simulator with command history
- Real-time command execution via backend API
- Task validation with auto-advance (exam mode)
- Props: `tasks`, `onFinish(answers)`

### Results.jsx
- Comprehensive score breakdown (MCQ + Terminal)
- Performance level indicators
- Detailed review of all questions and tasks
- Props: `mcqResults`, `terminalTasks`, `terminalAnswers`, `onRestart()`

## Configuration

### vite.config.js
```javascript
export default defineConfig({
  plugins: [react()],
  root: 'client',
  server: {
    port: 3001,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    outDir: '../dist'
  }
});
```

## Features Preserved

✅ All MCQ functionality (10 questions with validation)  
✅ Terminal simulator (15+ commands: ls, cd, pwd, cat, etc.)  
✅ Command history navigation (arrow keys)  
✅ Real-time command execution and validation  
✅ Exam mode (no hints, auto-advance on wrong answers)  
✅ Comprehensive results with explanations  
✅ Responsive design  
✅ Progress tracking  
✅ Security features (rate limiting, helmet)  

## Testing Checklist

- [x] Level selection loads correctly
- [x] MCQ navigation works (prev/next)
- [x] MCQ answer selection persists
- [x] MCQ submission triggers terminal assessment
- [x] Terminal commands execute correctly
- [x] Command history works (arrow keys)
- [x] Task validation works
- [x] Auto-advance to next task after validation
- [x] Results display correctly
- [x] Restart functionality works
- [x] API proxy works (Vite → Express)
- [x] All components render without errors

## Migration Benefits

1. **Component Reusability** - Modular React components
2. **Better State Management** - React hooks instead of global variables
3. **Improved Developer Experience** - Fast HMR with Vite
4. **Modern JavaScript** - ES modules, destructuring, etc.
5. **Type Safety Ready** - Easy to add TypeScript later
6. **Better Maintainability** - Clear component boundaries
7. **Testing Ready** - Easy to add React Testing Library

## Next Steps (Optional)

- [ ] Add TypeScript for type safety
- [ ] Implement React Router for better URL management
- [ ] Add React Testing Library tests
- [ ] Implement Context API for global state
- [ ] Add error boundaries for better error handling
- [ ] Optimize bundle size with code splitting
- [ ] Add loading states and skeletons
- [ ] Implement PWA features

## Rollback Plan

To revert to vanilla JavaScript:
1. Switch to `main` branch: `git checkout main`
2. Original vanilla JS code is preserved on main branch
3. Backend remains unchanged across both branches

## Notes

- **Backend unchanged** - All server code remains ES modules
- **Styles reused** - CSS from vanilla JS version works perfectly
- **API compatible** - No backend changes required
- **Branch isolated** - Experiments branch keeps React, main has vanilla JS
- **Concurrently** - Both servers run together for seamless development

## Access URLs

- **Frontend (React):** http://localhost:3001
- **Backend API:** http://localhost:3000/api
- **API Documentation:** See `demo-api.sh` for endpoint examples

---

**Migration Date:** January 2025  
**Branch:** Experiments  
**Status:** ✅ Complete and functional
