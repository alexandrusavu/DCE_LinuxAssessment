# Testing Guide - Linux Assessment Platform

## Pre-flight Checks

Before testing, ensure:
- ✅ Node.js is installed (`node --version`)
- ✅ Dependencies are installed (`npm install`)
- ✅ Server is running (`npm run server`)
- ✅ `client/index.html` is open in browser

## Test Scenarios

### 1. Server Health Check

**Test**: Verify server is running
```bash
curl http://localhost:5000/api/health
```

**Expected Response**:
```json
{
  "status": "OK",
  "message": "Linux Assessment Platform API is running"
}
```

**Status**: ⬜ Pass / ⬜ Fail

---

### 2. Get Available Levels

**Test**: Fetch assessment levels
```bash
curl http://localhost:5000/api/assessment/levels
```

**Expected Response**:
```json
{
  "success": true,
  "levels": [
    {
      "id": "junior",
      "name": "Junior Linux Skills",
      "description": "Basic Linux commands, file navigation, and permissions",
      "available": true
    },
    // ... middle and senior (available: false)
  ]
}
```

**Status**: ⬜ Pass / ⬜ Fail

---

### 3. Get Junior Questions

**Test**: Load junior level assessment
```bash
curl http://localhost:5000/api/assessment/questions/junior
```

**Expected**:
- Returns 10 MCQ questions
- Returns 5 terminal tasks
- Each question has: id, question, options, correctAnswer, explanation
- Each task has: id, task, description, validCommands, hint

**Status**: ⬜ Pass / ⬜ Fail

---

### 4. Frontend Level Selection

**Test**: Open `client/index.html`

**Expected UI**:
- ✅ Header with title and icon
- ✅ Three level cards visible
- ✅ Junior card has "Start Assessment" button
- ✅ Middle and Senior cards show "Coming Soon" badge
- ✅ Junior card is clickable and highlighted

**Actions**:
1. Hover over Junior card (should highlight)
2. Click "Start Assessment"
3. Should navigate to MCQ screen

**Status**: ⬜ Pass / ⬜ Fail

---

### 5. MCQ Assessment Flow

**Test**: Complete MCQ section

**Expected Behavior**:

**Question Navigation**:
- ✅ Question 1/10 displayed
- ✅ Progress bar at 10%
- ✅ 4 options visible
- ✅ Previous button disabled (first question)
- ✅ Next button enabled

**Interaction**:
1. Click an option (should highlight)
2. Click Next (moves to question 2)
3. Progress bar updates to 20%
4. Previous button now enabled
5. Click Previous (back to question 1)
6. Previously selected answer still selected

**Last Question (10/10)**:
- ✅ Progress bar at 100%
- ✅ "Submit MCQ" button appears
- ✅ "Next" button hidden

**Submit**:
- Click "Submit MCQ"
- Navigates to Terminal screen

**Status**: ⬜ Pass / ⬜ Fail

---

### 6. Terminal Simulator - Basic Commands

**Test**: Execute basic terminal commands

**Task 1**: List files
```
Type: ls
Press: Enter
```
**Expected**: Shows simulated directory listing

**Task 2**: Show current directory
```
Type: pwd
Press: Enter
```
**Expected**: Shows `/home/student`

**Task 3**: Create directory
```
Type: mkdir projects
Press: Enter
```
**Expected**: Success message

**Task 4**: Get help
```
Type: help
Press: Enter
```
**Expected**: List of available commands

**Task 5**: Clear screen
```
Type: clear
Press: Enter
```
**Expected**: Terminal clears

**Status**: ⬜ Pass / ⬜ Fail

---

### 7. Terminal Task Validation

**Test**: Complete first terminal task

**Task**: "List all files in the current directory"

**Incorrect Attempt**:
1. Type: `list`
2. Click "Validate Answer"
3. **Expected**: 
   - ❌ Error message
   - Hint displayed
   - Can try again

**Correct Attempt**:
1. Type: `ls`
2. Click "Validate Answer"
3. **Expected**:
   - ✅ Success message
   - "Next Task" button appears
   - "Validate" button hidden

**Status**: ⬜ Pass / ⬜ Fail

---

### 8. Terminal - All Tasks

**Test**: Complete all 5 terminal tasks

**Task 1**: List files → `ls`
**Task 2**: Create directory → `mkdir projects`
**Task 3**: Show path → `pwd`
**Task 4**: Create file → `touch test.txt`
**Task 5**: View file → `cat readme.txt`

After Task 5:
- ✅ "Finish Assessment" button appears
- ✅ Click shows Results screen

**Status**: ⬜ Pass / ⬜ Fail

---

### 9. Results Display

**Test**: View assessment results

**Expected Elements**:

**Header**:
- ✅ Trophy icon
- ✅ "Assessment Complete!" title

**Score Circle**:
- ✅ Large percentage displayed
- ✅ Animated appearance

**Summary Section**:
- ✅ MCQ Score: X/10 (XX%)
- ✅ Terminal Score: X/5 (XX%)
- ✅ Performance level with emoji

**MCQ Review**:
- ✅ All 10 questions listed
- ✅ Each shows user answer
- ✅ Correct answers marked ✓
- ✅ Incorrect answers marked ✗
- ✅ Correct answer shown for wrong answers
- ✅ Explanations provided

**Actions**:
- ✅ "Take Another Assessment" button
- ✅ Clicking reloads page

**Status**: ⬜ Pass / ⬜ Fail

---

### 10. Scoring Calculation

**Test**: Verify score calculation

**Scenario 1**: Perfect Score
- MCQ: 10/10 correct
- Terminal: 5/5 correct
- **Expected**: 100% overall, "🌟 Excellent!"

**Scenario 2**: Good Score
- MCQ: 8/10 correct (80%)
- Terminal: 4/5 correct (80%)
- **Expected**: 80% overall, "✅ Good!"

**Scenario 3**: Fair Score
- MCQ: 7/10 correct (70%)
- Terminal: 3/5 correct (60%)
- **Expected**: 65% overall, "👍 Fair"

**Status**: ⬜ Pass / ⬜ Fail

---

### 11. API - Submit MCQ

**Test**: Submit answers via API

```bash
curl -X POST http://localhost:5000/api/assessment/submit-mcq \
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
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "score": 100,
  "correctCount": 10,
  "totalQuestions": 10,
  "results": [...]
}
```

**Status**: ⬜ Pass / ⬜ Fail

---

### 12. API - Validate Terminal Command

**Test**: Validate a command

```bash
curl -X POST http://localhost:5000/api/terminal/validate \
  -H "Content-Type: application/json" \
  -d '{
    "taskId": 101,
    "command": "ls"
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "correct": true,
  "expectedCommand": "ls",
  "hint": null,
  "message": "Correct! Well done."
}
```

**Status**: ⬜ Pass / ⬜ Fail

---

### 13. Responsive Design

**Test**: Check mobile compatibility

**Desktop (>768px)**:
- ✅ Level cards in grid (3 columns)
- ✅ Buttons side-by-side
- ✅ Terminal full width

**Mobile (<768px)**:
- ✅ Level cards stacked (1 column)
- ✅ Buttons full width and stacked
- ✅ Terminal scrollable
- ✅ Text readable

**Test on**:
- [ ] Desktop browser
- [ ] Tablet (Safari/Chrome)
- [ ] Mobile phone

**Status**: ⬜ Pass / ⬜ Fail

---

### 14. Error Handling

**Test**: Invalid scenarios

**Scenario 1**: Server not running
- Stop server
- Try to start assessment
- **Expected**: Alert "Failed to load assessment"

**Scenario 2**: Invalid level
```bash
curl http://localhost:5000/api/assessment/questions/invalid
```
**Expected**: 404 error message

**Scenario 3**: Invalid command in terminal
- Type: `asdfghjkl`
- Press Enter
- **Expected**: "command not found" message

**Status**: ⬜ Pass / ⬜ Fail

---

### 15. Browser Compatibility

**Test**: Different browsers

Test in:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Check**:
- ✅ Styling renders correctly
- ✅ JavaScript executes
- ✅ API calls work
- ✅ Terminal input functions
- ✅ Animations smooth

**Status**: ⬜ Pass / ⬜ Fail

---

### 16. Performance

**Test**: Load times and responsiveness

**Metrics**:
- Page load: < 1 second
- API response: < 200ms
- Terminal input: Instant
- Screen transitions: Smooth

**Tools**:
```bash
# Test API response time
time curl http://localhost:5000/api/assessment/questions/junior
```

**Expected**: < 0.2 seconds

**Status**: ⬜ Pass / ⬜ Fail

---

### 17. Data Persistence

**Test**: User session data

**Current Behavior** (POC):
- Answers stored in browser memory
- Refresh = lose progress
- No backend storage

**Verify**:
1. Answer 5 MCQ questions
2. Refresh page
3. **Expected**: Back to level selection

**Status**: ⬜ Pass / ⬜ Fail

---

## Test Summary

```
Total Tests: 17
Passed: ____
Failed: ____
Success Rate: ____%
```

## Issues Found

| Test # | Issue Description | Severity | Status |
|--------|------------------|----------|---------|
| | | | |

## Recommendations

Based on testing results:

1. **Critical Issues**: (Must fix)
   - 

2. **Important**: (Should fix)
   - 

3. **Nice to Have**: (Could improve)
   - 

---

## Automated Testing (Future)

Suggested test frameworks:

**Backend**:
```bash
npm install --save-dev jest supertest
```

**Frontend**:
```bash
npm install --save-dev cypress
```

**Example Test** (Jest):
```javascript
describe('Assessment API', () => {
  test('GET /api/health returns OK', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
  });
});
```

---

## Test Sign-off

- Tested by: _______________
- Date: _______________
- Environment: _______________
- Browser(s): _______________
- Node.js Version: _______________

**Overall Assessment**: ⬜ Pass / ⬜ Needs Work / ⬜ Fail

**Ready for Production**: ⬜ Yes / ⬜ No

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________
