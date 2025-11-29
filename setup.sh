#!/bin/bash

echo "🚀 Linux Assessment Platform Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed."
    echo ""
    echo "Please install Node.js first:"
    echo "  - Visit: https://nodejs.org/"
    echo "  - Or use Homebrew: brew install node"
    echo ""
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  1. Start the backend server: npm run server"
echo "  2. Open client/index.html in your browser"
echo ""
echo "Or run both with: npm run dev (requires Python or simple HTTP server)"
