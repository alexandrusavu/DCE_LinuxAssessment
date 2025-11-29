# Visual Guide - Linux Assessment Platform

This document describes the visual appearance and user interface of the platform.

**Note**: The platform uses React + Vite for the frontend (port 3001) with an Express backend API (port 3000).

## 🎨 Color Scheme

```
Primary Blue:    #2563eb  (Buttons, highlights)
Success Green:   #10b981  (Correct answers, terminal text)
Warning Orange:  #f59e0b  (Hints, badges)
Danger Red:      #ef4444  (Errors, incorrect answers)
Dark Background: #1e293b  (Terminal background)
Light Gray:      #f8fafc  (Card backgrounds)
Purple Gradient: #667eea → #764ba2 (Page background)
Google Title:    Multicolor gradient (Blue→Red→Yellow→Green) for main title
```

## 📱 Screen Layouts

### 1. Level Selection Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│         🖥️  Linux Assessment Platform (multicolor)      │
│              Test your Linux knowledge and skills       │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│              Select Assessment Level                    │
│                                                         │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐        │
│  │    👤    │    │   👔     │    │    🎓    │        │
│  │          │    │          │    │          │        │
│  │  Junior  │    │  Middle  │    │  Senior  │        │
│  │  Level   │    │  Level   │    │  Level   │        │
│  │          │    │          │    │          │        │
│  │ Basic    │    │ Advanced │    │ Expert   │        │
│  │ commands │    │ scripting│    │ system   │        │
│  │          │    │          │    │          │        │
│  │ [Start]  │    │ Coming   │    │ Coming   │        │
│  │Assessment│    │  Soon    │    │  Soon    │        │
│  └──────────┘    └──────────┘    └──────────┘        │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual Features**:
- Gradient purple background
- White card container with rounded corners
- Three equal-width cards in a grid
- Junior card has blue border (clickable)
- Middle & Senior have orange "Coming Soon" badge
- Icons: 👤 Junior, 👔 Middle, 🎓 Senior

---

### 2. MCQ Assessment Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Progress: ████████░░░░░░░░░░░░░░░░  Question 4 of 10 │
│                                                         │
│  Which command is used to display the current          │
│  working directory?                                     │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │  A. cwd                                         │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  B. pwd                                    ✓    │  │ ← Selected
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  C. dir                                         │  │
│  └─────────────────────────────────────────────────┘  │
│  ┌─────────────────────────────────────────────────┐  │
│  │  D. whereami                                    │  │
│  └─────────────────────────────────────────────────┘  │
│                                                         │
│  [◄ Previous]                              [Next ►]    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual Features**:
- Blue progress bar showing completion %
- Large, readable question text
- 4 option boxes with hover effects
- Selected option highlighted in light blue
- Navigation buttons at bottom
- On last question: "Submit MCQ" button appears

---

### 3. Terminal Simulator Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  Terminal Challenge (1/5)                               │
│                                                         │
│  Use the appropriate command to list files and          │
│  directories                                            │
│                                                         │
│  Task: List all files in the current directory         │
│                                                         │
│  ┌───────────────────────────────────────────────────┐ │
│  │  🖥️  student@linux-assessment:~$                  │ │
│  ├───────────────────────────────────────────────────┤ │
│  │                                                   │ │
│  │  Task 1: List all files in the current directory │ │
│  │                                                   │ │
│  │  student@linux-assessment:~$ ls                  │ │
│  │  Documents Downloads Pictures Videos test.txt    │ │
│  │                                                   │ │
│  │                                                   │ │
│  │                                                   │ │
│  ├───────────────────────────────────────────────────┤ │
│  │  student@linux-assessment:~$ _                   │ │ ← Input
│  └───────────────────────────────────────────────────┘ │
│                                                         │
│  [💡 Get Hint]  [✓ Validate Answer]                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual Features**:
- Dark terminal with green text (classic look)
- Terminal header with username prompt
- Command history displayed above
- Active input line at bottom
- Orange "Get Hint" button
- Blue "Validate Answer" button
- After validation: Green "Next Task" or "Finish Assessment" button

---

### 4. Results Screen

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                      🏆                                 │
│              Assessment Complete!                       │
│                                                         │
│                   ┌─────────┐                          │
│                   │         │                          │
│                   │   85%   │                          │
│                   │  Score  │                          │
│                   │         │                          │
│                   └─────────┘                          │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │                   Summary                        │  │
│  │                                                  │  │
│  │  MCQ Score:              8/10 (80%)             │  │
│  │  Terminal Tasks:         4/5 (80%)              │  │
│  │  Overall Performance:    ✅ Good!               │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │                 MCQ Review                       │  │
│  │                                                  │  │
│  │  Q1: Which command lists files?          ✓      │  │
│  │  Your answer: ls                                │  │
│  │  Explanation: The "ls" command lists...         │  │
│  │                                                  │  │
│  │  Q2: What does "cd" do?                  ✗      │  │
│  │  Your answer: Copy directory                    │  │
│  │  Correct answer: Change directory               │  │
│  │  Explanation: The "cd" command changes...       │  │
│  │                                                  │  │
│  │  ... (8 more questions)                         │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│            [🔄 Take Another Assessment]                │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Visual Features**:
- Large trophy icon at top
- Circular score display with gradient
- Summary section with key metrics
- Performance level with emoji indicator
- Detailed MCQ review section
  - ✓ for correct (green border)
  - ✗ for incorrect (red border)
- Explanations for all questions
- Restart button at bottom

---

## 🎯 Interactive Elements

### Buttons

**Primary Button** (Blue)
```
┌──────────────┐
│ Start Test   │  ← Hover: Darker blue + lift effect
└──────────────┘
```

**Success Button** (Green)
```
┌──────────────┐
│ ✓ Next Task  │  ← Appears after correct answer
└──────────────┘
```

**Warning Button** (Orange)
```
┌──────────────┐
│ 💡 Get Hint  │  ← Shows helpful hint
└──────────────┘
```

### Cards

**Level Card (Available)**
```
┌──────────────┐
│     👤       │
│   Junior     │  ← Blue border
│   Level      │  ← Hover: Lifts up + shadow
│              │
│  [Start]     │
└──────────────┘
```

**Level Card (Unavailable)**
```
┌──────────────┐
│     🎓       │
│   Senior     │  ← Gray border
│   Level      │  ← No hover effect
│              │
│ Coming Soon  │  ← Orange badge
└──────────────┘
```

### Terminal

**Command Input**
```
student@linux-assessment:~$ █
                             ↑
                        Blinking cursor
```

**Success Message**
```
✓ Correct! Well done.    ← Green text
```

**Error Message**
```
✗ Not quite right. Try again.    ← Red text
```

**Hint Message**
```
Hint: Use the mkdir command...    ← Orange text
```

---

## 📐 Layout Specifications

### Desktop (≥768px)
- Container max-width: 1200px
- Level cards: 3 columns grid
- Terminal: Full width
- Buttons: Inline

### Mobile (<768px)
- Level cards: 1 column (stacked)
- Buttons: Full width (stacked)
- Terminal: Full width, scrollable
- Font sizes: Slightly smaller

---

## 🎨 Animations

### Page Transitions
```
Fade In + Slide Up
Duration: 0.3s
Easing: ease-in
```

### Button Hover
```
Lift Effect: translateY(-2px)
Shadow: 0 4px 12px rgba(...)
Duration: 0.3s
```

### Progress Bar
```
Smooth Width Transition
Duration: 0.3s
```

### Score Circle
```
Fade In
Scale from 0.8 to 1
Duration: 0.5s
```

---

## 🖼️ Typography

### Headers
- **Main Title**: 2.5rem, bold
- **Screen Title**: 2rem, bold  
- **Section Title**: 1.5rem, bold

### Body Text
- **Question Text**: 1.3rem, regular
- **Options**: 1.05rem, regular
- **Terminal**: 0.95rem, monospace (Courier New)

### Colors
- **Dark Text**: #0f172a
- **Light Text**: #64748b
- **Terminal Text**: #10b981 (green)

---

## 🔤 Icons

Using Font Awesome 6.4.0:
- `fa-terminal` - Terminal/Code
- `fa-user` - Junior level
- `fa-user-tie` - Middle level
- `fa-user-graduate` - Senior level
- `fa-trophy` - Results/Achievement
- `fa-lightbulb` - Hints
- `fa-check` - Validation
- `fa-redo` - Restart

---

## 🎭 User Feedback

### Hover States
- **Buttons**: Darken + lift + shadow
- **Options**: Light blue background + blue border
- **Cards**: Lift + enhanced shadow

### Active States
- **Selected Option**: Blue background + blue border + bold text
- **Current Input**: Green cursor + focus outline

### Success States
- **Correct Answer**: Green text + ✓ icon
- **Completed Task**: Green "Next" button appears

### Error States
- **Incorrect Answer**: Red text + ✗ icon + hint shown
- **Command Not Found**: Red error message

---

## 📱 Responsive Behavior

### Breakpoint: 768px

**Above 768px** (Desktop/Tablet)
```
┌───────────────────────────────────┐
│  [Card 1]  [Card 2]  [Card 3]    │  ← 3 columns
│  [Button 1] [Button 2] [Button 3] │  ← Inline
└───────────────────────────────────┘
```

**Below 768px** (Mobile)
```
┌──────────┐
│ [Card 1] │  ← 1 column
│ [Card 2] │
│ [Card 3] │
│          │
│[Button 1]│  ← Stacked, full width
│[Button 2]│
│[Button 3]│
└──────────┘
```

---

## ✨ Special Effects

### Gradient Background
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Card Shadows
```css
box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
```

### Score Circle
```css
background: linear-gradient(135deg, #2563eb, #10b981);
box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
```

---

## 🎬 Sample User Journey (Visual)

```
1. Landing Page
   ↓ Click "Start Assessment"

2. Progress Bar: 10%
   Question 1 of 10
   ↓ Select answer → Next

3. Progress Bar: 20%
   Question 2 of 10
   ↓ Continue...

4. Progress Bar: 100%
   Question 10 of 10
   ↓ Submit MCQ

5. Terminal Task 1/5
   Type command → Validate
   ↓ If correct → Next Task

6. Terminal Task 5/5
   Last task validated
   ↓ Finish Assessment

7. Results Screen
   🏆 85% Score
   Detailed breakdown
   ↓ Take Another Assessment

8. Back to Landing Page
```

---

## 📊 Visual Hierarchy

**Primary Focus**: Large, centered, bold
- Score circle: 180px diameter
- Main title: 2.5rem
- Question text: 1.3rem

**Secondary Elements**: Medium, supporting
- Section headers: 1.5rem
- Progress indicators
- Task descriptions

**Tertiary Elements**: Small, auxiliary  
- Hints: 0.9rem, italic
- Explanations: 0.9rem
- Footer text: 0.85rem

---

This visual guide should help you understand what the platform looks like without needing screenshots. The actual implementation follows these design specifications!
