// Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// State
let currentLevel = '';
let mcqQuestions = [];
let terminalTasks = [];
let currentMCQIndex = 0;
let currentTaskIndex = 0;
let mcqAnswers = {};
let terminalAnswers = {};
let currentTaskCompleted = false;

// DOM Elements
const screens = {
    levelSelection: document.getElementById('level-selection'),
    mcqAssessment: document.getElementById('mcq-assessment'),
    terminalAssessment: document.getElementById('terminal-assessment'),
    results: document.getElementById('results')
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

// Setup Event Listeners
function setupEventListeners() {
    // Level selection
    document.querySelectorAll('.level-card.available').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                const level = card.getAttribute('data-level');
                startAssessment(level);
            }
        });
    });

    // MCQ navigation
    document.getElementById('prev-btn').addEventListener('click', previousQuestion);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('submit-mcq-btn').addEventListener('click', submitMCQ);

    // Terminal
    document.getElementById('terminal-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            executeCommand();
        }
    });
    document.getElementById('hint-btn').addEventListener('click', showHint);
    document.getElementById('validate-btn').addEventListener('click', validateTask);
    document.getElementById('next-task-btn').addEventListener('click', nextTask);
    document.getElementById('finish-assessment-btn').addEventListener('click', showResults);

    // Restart
    document.getElementById('restart-btn').addEventListener('click', () => {
        location.reload();
    });
}

// Start Assessment
async function startAssessment(level) {
    currentLevel = level;
    try {
        const response = await fetch(`${API_BASE_URL}/assessment/questions/${level}`);
        const data = await response.json();
        
        if (data.success) {
            mcqQuestions = data.mcqQuestions;
            terminalTasks = data.terminalTasks;
            showScreen('mcqAssessment');
            loadQuestion(0);
        }
    } catch (error) {
        console.error('Error loading assessment:', error);
        alert('Failed to load assessment. Please ensure the server is running on port 5000.');
    }
}

// MCQ Functions
function loadQuestion(index) {
    const question = mcqQuestions[index];
    currentMCQIndex = index;

    // Update progress
    const progress = ((index + 1) / mcqQuestions.length) * 100;
    document.getElementById('progress-fill').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = `Question ${index + 1} of ${mcqQuestions.length}`;

    // Load question
    document.getElementById('question-text').textContent = question.question;
    
    // Load options
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, optionIndex) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.setAttribute('data-index', optionIndex);
        
        if (mcqAnswers[question.id] === optionIndex) {
            optionDiv.classList.add('selected');
        }
        
        optionDiv.addEventListener('click', () => selectOption(question.id, optionIndex));
        optionsContainer.appendChild(optionDiv);
    });

    // Update navigation buttons
    document.getElementById('prev-btn').disabled = index === 0;
    
    if (index === mcqQuestions.length - 1) {
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-mcq-btn').style.display = 'inline-flex';
    } else {
        document.getElementById('next-btn').style.display = 'inline-flex';
        document.getElementById('submit-mcq-btn').style.display = 'none';
    }
}

function selectOption(questionId, optionIndex) {
    mcqAnswers[questionId] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.querySelector(`.option[data-index="${optionIndex}"]`).classList.add('selected');
}

function previousQuestion() {
    if (currentMCQIndex > 0) {
        loadQuestion(currentMCQIndex - 1);
    }
}

function nextQuestion() {
    if (currentMCQIndex < mcqQuestions.length - 1) {
        loadQuestion(currentMCQIndex + 1);
    }
}

async function submitMCQ() {
    try {
        const response = await fetch(`${API_BASE_URL}/assessment/submit-mcq`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                level: currentLevel,
                answers: mcqAnswers
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store MCQ results
            window.mcqResults = data;
            
            // Move to terminal tasks
            showScreen('terminalAssessment');
            loadTerminalTask(0);
        }
    } catch (error) {
        console.error('Error submitting MCQ:', error);
        alert('Failed to submit answers. Please try again.');
    }
}

// Terminal Functions
function loadTerminalTask(index) {
    const task = terminalTasks[index];
    currentTaskIndex = index;
    currentTaskCompleted = false;

    document.getElementById('task-number').textContent = `(${index + 1}/${terminalTasks.length})`;
    document.getElementById('task-description').textContent = task.description;
    document.getElementById('task-objective').textContent = task.task;

    // Clear terminal
    const terminalOutput = document.getElementById('terminal-output');
    terminalOutput.innerHTML = `
        <div class="terminal-line">Task ${index + 1}: ${task.task}</div>
        <div class="terminal-line">&nbsp;</div>
    `;

    // Reset input
    document.getElementById('terminal-input').value = '';
    document.getElementById('terminal-input').focus();

    // Update buttons
    document.getElementById('next-task-btn').style.display = 'none';
    document.getElementById('finish-assessment-btn').style.display = 'none';
    document.getElementById('validate-btn').style.display = 'inline-flex';
}

async function executeCommand() {
    const input = document.getElementById('terminal-input');
    const command = input.value.trim();
    
    if (!command) return;

    const terminalOutput = document.getElementById('terminal-output');
    
    // Add command to output
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    commandLine.innerHTML = `<span style="color: #10b981">student@linux-assessment:~$</span> ${command}`;
    terminalOutput.appendChild(commandLine);

    // Execute command
    try {
        const response = await fetch(`${API_BASE_URL}/terminal/execute`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ command })
        });
        
        const data = await response.json();
        
        if (data.output === '[CLEAR]') {
            terminalOutput.innerHTML = '';
        } else {
            const outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.textContent = data.output;
            terminalOutput.appendChild(outputLine);
        }
    } catch (error) {
        console.error('Error executing command:', error);
        const errorLine = document.createElement('div');
        errorLine.className = 'terminal-line error';
        errorLine.textContent = 'Error: Could not execute command';
        terminalOutput.appendChild(errorLine);
    }

    // Clear input and scroll to bottom
    input.value = '';
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function showHint() {
    const task = terminalTasks[currentTaskIndex];
    const terminalOutput = document.getElementById('terminal-output');
    
    const hintLine = document.createElement('div');
    hintLine.className = 'terminal-line warning';
    hintLine.innerHTML = `<strong>Hint:</strong> ${task.hint}`;
    terminalOutput.appendChild(hintLine);
    
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

async function validateTask() {
    const input = document.getElementById('terminal-input');
    const command = input.value.trim();
    
    if (!command) {
        alert('Please enter a command to validate');
        return;
    }

    const task = terminalTasks[currentTaskIndex];
    
    try {
        const response = await fetch(`${API_BASE_URL}/terminal/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                taskId: task.id,
                command
            })
        });
        
        const data = await response.json();
        const terminalOutput = document.getElementById('terminal-output');
        
        const resultLine = document.createElement('div');
        resultLine.className = `terminal-line ${data.correct ? 'success' : 'error'}`;
        resultLine.innerHTML = `<strong>${data.message}</strong>`;
        terminalOutput.appendChild(resultLine);
        
        if (!data.correct && data.hint) {
            const hintLine = document.createElement('div');
            hintLine.className = 'terminal-line warning';
            hintLine.innerHTML = `Hint: ${data.hint}`;
            terminalOutput.appendChild(hintLine);
        }
        
        if (data.correct) {
            currentTaskCompleted = true;
            terminalAnswers[task.id] = { command, correct: true };
            
            // Show next/finish button
            if (currentTaskIndex < terminalTasks.length - 1) {
                document.getElementById('next-task-btn').style.display = 'inline-flex';
            } else {
                document.getElementById('finish-assessment-btn').style.display = 'inline-flex';
            }
            
            document.getElementById('validate-btn').style.display = 'none';
        }
        
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    } catch (error) {
        console.error('Error validating task:', error);
        alert('Failed to validate command. Please try again.');
    }
}

function nextTask() {
    if (currentTaskIndex < terminalTasks.length - 1) {
        loadTerminalTask(currentTaskIndex + 1);
    }
}

function showResults() {
    showScreen('results');
    
    const mcqResults = window.mcqResults;
    const terminalCorrect = Object.values(terminalAnswers).filter(a => a.correct).length;
    const totalTerminal = terminalTasks.length;
    
    // Calculate overall score
    const mcqPercentage = mcqResults.score;
    const terminalPercentage = (terminalCorrect / totalTerminal) * 100;
    const overallScore = Math.round((mcqPercentage + terminalPercentage) / 2);
    
    // Display scores
    document.getElementById('final-score').textContent = `${overallScore}%`;
    document.getElementById('mcq-score').textContent = `${mcqResults.correctCount}/${mcqResults.totalQuestions} (${mcqResults.score}%)`;
    document.getElementById('terminal-score').textContent = `${terminalCorrect}/${totalTerminal} (${Math.round(terminalPercentage)}%)`;
    
    // Performance level
    let performanceLevel = '';
    let performanceColor = '';
    if (overallScore >= 90) {
        performanceLevel = '🌟 Excellent!';
        performanceColor = 'var(--success-color)';
    } else if (overallScore >= 75) {
        performanceLevel = '✅ Good!';
        performanceColor = 'var(--primary-color)';
    } else if (overallScore >= 60) {
        performanceLevel = '👍 Fair';
        performanceColor = 'var(--warning-color)';
    } else {
        performanceLevel = '📚 Needs Improvement';
        performanceColor = 'var(--danger-color)';
    }
    
    const performanceEl = document.getElementById('performance-level');
    performanceEl.textContent = performanceLevel;
    performanceEl.style.color = performanceColor;
    performanceEl.style.fontWeight = 'bold';
    
    // Show MCQ review
    const mcqAnswersContainer = document.getElementById('mcq-answers');
    mcqAnswersContainer.innerHTML = '';
    
    mcqResults.results.forEach(result => {
        const question = mcqQuestions.find(q => q.id === result.questionId);
        const reviewItem = document.createElement('div');
        reviewItem.className = `review-item ${result.correct ? 'correct' : 'incorrect'}`;
        
        const userAnswerText = question.options[result.userAnswer] || 'Not answered';
        const correctAnswerText = question.options[result.correctAnswer];
        
        reviewItem.innerHTML = `
            <div class="review-question">${question.question}</div>
            <div class="review-answer">Your answer: ${userAnswerText} ${result.correct ? '✓' : '✗'}</div>
            ${!result.correct ? `<div class="review-answer" style="color: var(--success-color)">Correct answer: ${correctAnswerText}</div>` : ''}
            <div class="review-explanation">${result.explanation}</div>
        `;
        
        mcqAnswersContainer.appendChild(reviewItem);
    });
}

// Utility function to switch screens
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}
