# Quick Start Script for Linux Assessment Platform

This script helps you get started with the Linux Assessment Platform quickly.

## For macOS/Linux Users

### If Node.js is NOT installed:
```bash
# Install Node.js using Homebrew
brew install node

# Or download from https://nodejs.org/
```

### Once Node.js is installed:
```bash
# 1. Run setup (installs dependencies)
npm install

# 2. Start the server
npm run server
# Server will start on http://localhost:3000 and serve both API and frontend

# 3. Open your browser
# Navigate to http://localhost:3000
# Or if the browser doesn't open automatically, just visit the URL
```

## Alternative: All-in-One Commands

```bash
# Install and start server
npm install && npm run server
```

Then open `client/index.html` in your browser.

## Verify Installation

Test if the server is running:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status":"OK",
  "message":"Linux Assessment Platform API is running",
  "environment":"development",
  "version":"1.0.0"
}
```

## Common Issues

### "node: command not found"
- Install Node.js: https://nodejs.org/
- Or use Homebrew: `brew install node`

### "Port 3000 already in use"
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Then restart
npm run server
```

### "Cannot GET /api/..."
- Make sure the server is running
- Check that it's on port 5000
- Look for errors in the terminal

## Testing the Platform

1. Server should show: `🚀 Server running in development mode on port 3000`
2. Navigate to `http://localhost:3000` in your browser
3. You should see three level cards (Junior available, others coming soon)
4. Click "Start Assessment" on Junior level
5. Complete 10 MCQ questions (exam mode - no hints)
6. Complete 5 terminal tasks (single attempt per task)
7. View your results and performance rating

## Next Steps

- Read [README.md](README.md) for overview
- Read [SETUP.md](SETUP.md) for detailed documentation
- Start taking the Junior assessment!

---

Need help? Check the troubleshooting sections in README.md and SETUP.md
