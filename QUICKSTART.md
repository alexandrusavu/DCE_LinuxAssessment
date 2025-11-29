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

# 2. Start the backend server
npm run server
# Server will start on http://localhost:5000

# 3. In a new terminal or just open the file
open client/index.html
# Or double-click client/index.html in Finder
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
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"OK","message":"Linux Assessment Platform API is running"}
```

## Common Issues

### "node: command not found"
- Install Node.js: https://nodejs.org/
- Or use Homebrew: `brew install node`

### "Port 5000 already in use"
```bash
# Find and kill the process
lsof -ti:5000 | xargs kill -9

# Then restart
npm run server
```

### "Cannot GET /api/..."
- Make sure the server is running
- Check that it's on port 5000
- Look for errors in the terminal

## Testing the Platform

1. Server should show: `Server is running on port 5000`
2. Open `client/index.html` in browser
3. You should see three level cards
4. Click "Start Assessment" on Junior level
5. Answer questions and complete terminal tasks

## Next Steps

- Read [README.md](README.md) for overview
- Read [SETUP.md](SETUP.md) for detailed documentation
- Start taking the Junior assessment!

---

Need help? Check the troubleshooting sections in README.md and SETUP.md
