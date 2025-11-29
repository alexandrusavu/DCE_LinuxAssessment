// Junior Level Linux Assessment Questions
const juniorQuestions = [
  {
    id: 1,
    type: 'mcq',
    level: 'junior',
    question: 'Which command is used to list files and directories in Linux?',
    options: ['ls', 'dir', 'list', 'show'],
    correctAnswer: 0,
    explanation: 'The "ls" command lists directory contents in Linux and Unix systems.'
  },
  {
    id: 2,
    type: 'mcq',
    level: 'junior',
    question: 'What does the "cd" command do?',
    options: ['Copy directory', 'Change directory', 'Create directory', 'Clear display'],
    correctAnswer: 1,
    explanation: 'The "cd" command changes the current working directory.'
  },
  {
    id: 3,
    type: 'mcq',
    level: 'junior',
    question: 'Which command is used to create a new directory?',
    options: ['newdir', 'createdir', 'mkdir', 'md'],
    correctAnswer: 2,
    explanation: 'The "mkdir" command makes a new directory in Linux.'
  },
  {
    id: 4,
    type: 'mcq',
    level: 'junior',
    question: 'What command displays the current working directory?',
    options: ['cwd', 'pwd', 'dir', 'whereami'],
    correctAnswer: 1,
    explanation: 'The "pwd" (print working directory) command shows the full path of the current directory.'
  },
  {
    id: 5,
    type: 'mcq',
    level: 'junior',
    question: 'Which command is used to remove/delete a file?',
    options: ['delete', 'remove', 'rm', 'del'],
    correctAnswer: 2,
    explanation: 'The "rm" command removes files or directories in Linux.'
  },
  {
    id: 6,
    type: 'mcq',
    level: 'junior',
    question: 'What does the "cat" command do?',
    options: ['Concatenate and display file contents', 'Create a file', 'Copy a file', 'Categorize files'],
    correctAnswer: 0,
    explanation: 'The "cat" command concatenates and displays the contents of files.'
  },
  {
    id: 7,
    type: 'mcq',
    level: 'junior',
    question: 'Which command is used to copy files?',
    options: ['copy', 'cp', 'cpy', 'duplicate'],
    correctAnswer: 1,
    explanation: 'The "cp" command copies files or directories in Linux.'
  },
  {
    id: 8,
    type: 'mcq',
    level: 'junior',
    question: 'What permission number gives read, write, and execute permissions?',
    options: ['777', '755', '644', '700'],
    correctAnswer: 0,
    explanation: '777 gives full permissions (rwx) to owner, group, and others. 7 = 4(read) + 2(write) + 1(execute).'
  },
  {
    id: 9,
    type: 'mcq',
    level: 'junior',
    question: 'Which command is used to change file permissions?',
    options: ['chperm', 'chmod', 'perm', 'modify'],
    correctAnswer: 1,
    explanation: 'The "chmod" (change mode) command modifies file permissions in Linux.'
  },
  {
    id: 10,
    type: 'mcq',
    level: 'junior',
    question: 'What does "sudo" stand for?',
    options: ['Super User Do', 'System User Do', 'Secure User Do', 'Switch User Do'],
    correctAnswer: 0,
    explanation: '"sudo" stands for "superuser do" and allows users to run commands with elevated privileges.'
  }
];

// Terminal simulation tasks for junior level
const juniorTerminalTasks = [
  {
    id: 101,
    type: 'terminal',
    level: 'junior',
    task: 'List all files in the current directory',
    description: 'Use the appropriate command to list files and directories',
    expectedCommand: 'ls',
    validCommands: ['ls', 'ls -l', 'ls -la', 'ls -a'],
    hint: 'Think about the basic listing command in Linux'
  },
  {
    id: 102,
    type: 'terminal',
    level: 'junior',
    task: 'Create a directory named "projects"',
    description: 'Use the command to make a new directory called "projects"',
    expectedCommand: 'mkdir projects',
    validCommands: ['mkdir projects'],
    hint: 'Use the mkdir command followed by the directory name'
  },
  {
    id: 103,
    type: 'terminal',
    level: 'junior',
    task: 'Display the current working directory',
    description: 'Show the full path of your current location',
    expectedCommand: 'pwd',
    validCommands: ['pwd'],
    hint: 'Use the command that prints the working directory'
  },
  {
    id: 104,
    type: 'terminal',
    level: 'junior',
    task: 'Create an empty file named "test.txt"',
    description: 'Create a new empty file using the touch command',
    expectedCommand: 'touch test.txt',
    validCommands: ['touch test.txt'],
    hint: 'Use the touch command followed by the filename'
  },
  {
    id: 105,
    type: 'terminal',
    level: 'junior',
    task: 'View the contents of "readme.txt"',
    description: 'Display the contents of a file on the terminal',
    expectedCommand: 'cat readme.txt',
    validCommands: ['cat readme.txt', 'less readme.txt', 'more readme.txt'],
    hint: 'Use cat, less, or more to view file contents'
  }
];

module.exports = {
  juniorQuestions,
  juniorTerminalTasks
};
