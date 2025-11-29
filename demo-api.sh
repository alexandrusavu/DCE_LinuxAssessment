#!/bin/bash

# Demo script for Linux Assessment Platform API
# This script demonstrates all available API endpoints

API_URL="http://localhost:5000/api"

echo "======================================"
echo "Linux Assessment Platform - API Demo"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if server is running
echo -e "${BLUE}1. Checking server health...${NC}"
response=$(curl -s ${API_URL}/health)
echo "$response" | jq '.'
echo ""

# Get available levels
echo -e "${BLUE}2. Getting available assessment levels...${NC}"
curl -s ${API_URL}/assessment/levels | jq '.'
echo ""

# Get junior questions
echo -e "${BLUE}3. Loading Junior level questions...${NC}"
curl -s ${API_URL}/assessment/questions/junior | jq '.level, .mcqQuestions[0:2], .terminalTasks[0:2]'
echo ""

# Submit MCQ (sample answers)
echo -e "${BLUE}4. Submitting MCQ answers (sample)...${NC}"
curl -s -X POST ${API_URL}/assessment/submit-mcq \
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
  }' | jq '.'
echo ""

# Execute terminal command
echo -e "${BLUE}5. Executing terminal command (ls)...${NC}"
curl -s -X POST ${API_URL}/terminal/execute \
  -H "Content-Type: application/json" \
  -d '{"command": "ls"}' | jq '.'
echo ""

# Validate correct command
echo -e "${BLUE}6. Validating correct command...${NC}"
curl -s -X POST ${API_URL}/terminal/validate \
  -H "Content-Type: application/json" \
  -d '{"taskId": 101, "command": "ls"}' | jq '.'
echo ""

# Validate incorrect command
echo -e "${BLUE}7. Validating incorrect command...${NC}"
curl -s -X POST ${API_URL}/terminal/validate \
  -H "Content-Type: application/json" \
  -d '{"taskId": 101, "command": "wrong"}' | jq '.'
echo ""

echo -e "${GREEN}======================================"
echo "Demo Complete!"
echo "======================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Open client/index.html in your browser"
echo "  2. Take the Junior assessment"
echo "  3. Check the results!"
