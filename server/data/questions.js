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
    task: 'List all files in the current directory with details',
    description: 'Use the list command with long format to see file details including permissions, owner, size, and modification date',
    expectedCommand: 'ls -l',
    validCommands: ['ls -l', 'ls -la', 'ls -al'],
    hint: 'Use ls with the -l flag for long format listing'
  },
  {
    id: 102,
    type: 'terminal',
    level: 'junior',
    task: 'Navigate to the Documents directory',
    description: 'Change your current directory to Documents using the change directory command',
    expectedCommand: 'cd Documents',
    validCommands: ['cd Documents', 'cd ./Documents'],
    hint: 'Use the cd command followed by the directory name'
  },
  {
    id: 103,
    type: 'terminal',
    level: 'junior',
    task: 'Display the current working directory path',
    description: 'Show the full absolute path of where you are currently located in the file system',
    expectedCommand: 'pwd',
    validCommands: ['pwd'],
    hint: 'Use the command that prints the working directory'
  },
  {
    id: 104,
    type: 'terminal',
    level: 'junior',
    task: 'Find all files named "readme.txt" starting from home',
    description: 'Use the find command to locate all files named readme.txt in your home directory and subdirectories',
    expectedCommand: 'find ~ -name readme.txt',
    validCommands: ['find ~ -name readme.txt', 'find /home/student -name readme.txt', 'find . -name readme.txt'],
    hint: 'Use find command with -name option: find <path> -name <filename>'
  },
  {
    id: 105,
    type: 'terminal',
    level: 'junior',
    task: 'Search for the word "Linux" in readme.txt',
    description: 'Use grep to search for lines containing the word "Linux" in the readme.txt file',
    expectedCommand: 'grep Linux readme.txt',
    validCommands: ['grep Linux readme.txt', 'grep "Linux" readme.txt', 'grep linux readme.txt'],
    hint: 'Use grep followed by the search pattern and filename: grep <pattern> <file>'
  }
];

module.exports = {
  juniorQuestions,
  juniorTerminalTasks
};
