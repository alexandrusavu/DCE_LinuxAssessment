#!/bin/bash

# Demo script for Linux Assessment Platform API
# Demonstrates all available API endpoints with ES modules architecture
# Requires: curl, jq (optional for pretty printing)

API_URL="http://localhost:3000/api"

echo "=========================================="
echo "Linux Assessment Platform - API Demo"
echo "ES Modules Architecture | Exam Mode"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq not installed - output will not be formatted${NC}"
    echo -e "${YELLOW}   Install with: brew install jq${NC}"
    echo ""
    JQ_AVAILABLE=false
else
    JQ_AVAILABLE=true
fi

# Function to display response
display_response() {
    if [ "$JQ_AVAILABLE" = true ]; then
        echo "$1" | jq '.'
    else
        echo "$1"
    fi
}

# Check if server is running
echo -e "${BLUE}1. Checking server health...${NC}"
response=$(curl -s ${API_URL}/health)
if [ -z "$response" ]; then
    echo -e "${RED}❌ Server is not running!${NC}"
    echo -e "${YELLOW}   Start with: npm run server${NC}"
    exit 1
fi
display_response "$response"
echo ""

# Get available levels
echo -e "${BLUE}2. Getting available assessment levels...${NC}"
response=$(curl -s ${API_URL}/assessment/levels)
display_response "$response"
echo ""

# Get junior questions
echo -e "${BLUE}3. Loading Junior level questions...${NC}"
if [ "$JQ_AVAILABLE" = true ]; then
    curl -s ${API_URL}/assessment/questions/junior | jq '{level, mcqCount: (.mcqQuestions | length), terminalCount: (.terminalTasks | length), sampleMCQ: .mcqQuestions[0], sampleTask: .terminalTasks[0]}'
else
    curl -s ${API_URL}/assessment/questions/junior
fi
echo ""

# Submit MCQ (sample answers - exam mode)
echo -e "${BLUE}4. Submitting MCQ answers (Exam Mode - No Hints)...${NC}"
response=$(curl -s -X POST ${API_URL}/assessment/submit-mcq \
  -H "Content-Type: application/json" \
  -d '{
    "level": "junior",
    "answers": {
      "1": 0,
      "2": 1,
      "3": 2,
      "4": 1,
      "5": 2,
      "6": 0,
      "7": 1,
      "8": 0,
      "9": 1,
      "10": 0
    }
  }')
display_response "$response"
echo ""

# Generate session ID
SESSION_ID="demo-session-$(date +%s)"

# Execute terminal command
echo -e "${BLUE}5. Executing terminal command (ls -l)...${NC}"
response=$(curl -s -X POST ${API_URL}/terminal/execute \
  -H "Content-Type: application/json" \
  -d "{\"command\": \"ls -l\", \"sessionId\": \"$SESSION_ID\"}")
display_response "$response"
echo ""

# Validate correct command (Exam Mode)
echo -e "${BLUE}6. Validating correct command (Exam Mode - No Hint)...${NC}"
response=$(curl -s -X POST ${API_URL}/terminal/validate \
  -H "Content-Type: application/json" \
  -d "{\"taskId\": 101, \"command\": \"ls -l\", \"sessionId\": \"$SESSION_ID\"}")
display_response "$response"
echo ""

# Validate incorrect command (Exam Mode)
echo -e "${BLUE}7. Validating incorrect command (Exam Mode - No Hint)...${NC}"
response=$(curl -s -X POST ${API_URL}/terminal/validate \
  -H "Content-Type: application/json" \
  -d "{\"taskId\": 101, \"command\": \"wrong\", \"sessionId\": \"$SESSION_ID\"}")
display_response "$response"
echo ""

# Execute pwd command
echo -e "${BLUE}8. Executing pwd command...${NC}"
response=$(curl -s -X POST ${API_URL}/terminal/execute \
  -H "Content-Type: application/json" \
  -d "{\"command\": \"pwd\", \"sessionId\": \"$SESSION_ID\"}")
display_response "$response"
echo ""

# Reset terminal session
echo -e "${BLUE}9. Resetting terminal session...${NC}"
response=$(curl -s -X POST ${API_URL}/terminal/reset \
  -H "Content-Type: application/json" \
  -d "{\"sessionId\": \"$SESSION_ID\"}")
display_response "$response"
echo ""

echo -e "${GREEN}=========================================="
echo "✅ Demo Complete!"
echo "==========================================${NC}"
echo ""
echo -e "${GREEN}🎯 Key Features Demonstrated:${NC}"
echo "  • ES Modules Architecture"
echo "  • Exam Mode (No Hints)"
echo "  • MCQ Assessment with Object Format"
echo "  • Terminal Command Execution"
echo "  • Task Validation (Single Attempt)"
echo "  • Session Management"
echo ""
echo -e "${BLUE}📖 Next steps:${NC}"
echo "  1. Open browser: http://localhost:3000"
echo "  2. Take the Junior assessment"
echo "  3. Complete MCQ (10 questions)"
echo "  4. Complete Terminal Tasks (5 tasks)"
echo "  5. View your results!"
echo ""
echo -e "${YELLOW}💡 Architecture Highlights:${NC}"
echo "  • Port 3000 (API + Frontend)"
echo "  • Service-Oriented Design"
echo "  • Security Middleware (Helmet, Rate Limit)"
echo "  • 16 Terminal Commands Supported"
