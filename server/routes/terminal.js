const express = require('express');
const router = express.Router();
const { juniorTerminalTasks } = require('../data/questions');

// In-memory session storage (in production, use Redis or similar)
const sessions = new Map();

// Initialize or get session
function getSession(sessionId) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, {
      currentDir: '/home/student',
      fileSystem: {
        '/': {
          type: 'dir',
          contents: ['home', 'etc', 'var', 'usr']
        },
        '/home': {
          type: 'dir',
          contents: ['student']
        },
        '/home/student': {
          type: 'dir',
          contents: ['Documents', 'Downloads', 'Pictures', 'Videos', 'readme.txt']
        },
        '/home/student/Documents': {
          type: 'dir',
          contents: ['work', 'personal']
        },
        '/home/student/Downloads': {
          type: 'dir',
          contents: ['archive.zip']
        },
        '/home/student/Pictures': {
          type: 'dir',
          contents: ['vacation.jpg', 'family.png']
        },
        '/home/student/Videos': {
          type: 'dir',
          contents: []
        },
        '/home/student/readme.txt': {
          type: 'file',
          content: 'Welcome to the Linux Assessment Platform!\nThis is a simulated Linux environment.\nPractice your commands here.\n\nTip: Use tab completion and explore the file system!'
        },
        '/etc': {
          type: 'dir',
          contents: ['hosts', 'passwd']
        },
        '/etc/hosts': {
          type: 'file',
          content: '127.0.0.1 localhost\n::1 localhost'
        },
        '/etc/passwd': {
          type: 'file',
          content: 'root:x:0:0:root:/root:/bin/bash\nstudent:x:1000:1000:Student User:/home/student:/bin/bash'
        }
      },
      environment: {
        USER: 'student',
        HOME: '/home/student',
        SHELL: '/bin/bash',
        PATH: '/usr/local/bin:/usr/bin:/bin'
      },
      history: [],
      createdItems: new Set()
    });
  }
  return sessions.get(sessionId);
}

// Path utilities
function resolvePath(currentDir, path) {
  if (path.startsWith('/')) {
    return path;
  }
  if (path === '.') {
    return currentDir;
  }
  if (path === '..') {
    const parts = currentDir.split('/').filter(p => p);
    parts.pop();
    return '/' + parts.join('/') || '/';
  }
  if (path.startsWith('./')) {
    path = path.substring(2);
  }
  if (path.startsWith('../')) {
    const parts = currentDir.split('/').filter(p => p);
    while (path.startsWith('../')) {
      parts.pop();
      path = path.substring(3);
    }
    return '/' + parts.join('/') + (path ? '/' + path : '') || '/';
  }
  return currentDir === '/' ? '/' + path : currentDir + '/' + path;
}

function pathExists(session, path) {
  return session.fileSystem.hasOwnProperty(path);
}

function isDirectory(session, path) {
  const item = session.fileSystem[path];
  return item && item.type === 'dir';
}

function isFile(session, path) {
  const item = session.fileSystem[path];
  return item && item.type === 'file';
}

// Command handlers
const commands = {
  ls: (args, session) => {
    const flags = args.filter(a => a.startsWith('-'));
    const hasLong = flags.some(f => f.includes('l'));
    const hasAll = flags.some(f => f.includes('a'));
    const paths = args.filter(a => !a.startsWith('-'));
    const targetPath = paths.length > 0 ? resolvePath(session.currentDir, paths[0]) : session.currentDir;

    if (!pathExists(session, targetPath)) {
      return `ls: cannot access '${paths[0]}': No such file or directory`;
    }

    if (!isDirectory(session, targetPath)) {
      return paths[0] || targetPath;
    }

    let contents = [...session.fileSystem[targetPath].contents];
    if (hasAll) {
      contents = ['.', '..', ...contents];
    }

    if (hasLong) {
      const entries = contents.map(item => {
        const fullPath = targetPath === '/' ? '/' + item : targetPath + '/' + item;
        const isDir = item === '.' || item === '..' || (pathExists(session, fullPath) && isDirectory(session, fullPath));
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const links = isDir ? '2' : '1';
        const size = isDir ? '4096' : '1024';
        return `${perms} ${links} student student ${size.padStart(6)} Nov 29 12:00 ${item}`;
      });
      return entries.join('\n');
    }

    return contents.join('  ');
  },

  pwd: (args, session) => {
    return session.currentDir;
  },

  cd: (args, session) => {
    if (args.length === 0 || args[0] === '~') {
      session.currentDir = session.environment.HOME;
      return null;
    }

    const targetPath = resolvePath(session.currentDir, args[0]);
    
    if (!pathExists(session, targetPath)) {
      return `cd: ${args[0]}: No such file or directory`;
    }

    if (!isDirectory(session, targetPath)) {
      return `cd: ${args[0]}: Not a directory`;
    }

    session.currentDir = targetPath;
    return null;
  },

  mkdir: (args, session) => {
    if (args.length === 0) {
      return 'mkdir: missing operand\nTry \'mkdir --help\' for more information.';
    }

    const hasParent = args.includes('-p');
    const dirs = args.filter(a => !a.startsWith('-'));

    const results = dirs.map(dir => {
      const fullPath = resolvePath(session.currentDir, dir);
      
      if (pathExists(session, fullPath)) {
        return `mkdir: cannot create directory '${dir}': File exists`;
      }

      const parentPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || '/';
      if (!pathExists(session, parentPath)) {
        if (hasParent) {
          // Create parent directories (simplified)
          return `mkdir: created directory '${dir}'`;
        }
        return `mkdir: cannot create directory '${dir}': No such file or directory`;
      }

      session.fileSystem[fullPath] = { type: 'dir', contents: [] };
      session.fileSystem[parentPath].contents.push(dir.split('/').pop());
      session.createdItems.add(fullPath);
      return null;
    });

    return results.filter(r => r !== null).join('\n') || null;
  },

  touch: (args, session) => {
    if (args.length === 0) {
      return 'touch: missing file operand\nTry \'touch --help\' for more information.';
    }

    const results = args.map(file => {
      const fullPath = resolvePath(session.currentDir, file);
      
      if (pathExists(session, fullPath)) {
        return null; // Just update timestamp in real touch
      }

      const parentPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || '/';
      if (!pathExists(session, parentPath)) {
        return `touch: cannot touch '${file}': No such file or directory`;
      }

      session.fileSystem[fullPath] = { type: 'file', content: '' };
      session.fileSystem[parentPath].contents.push(file.split('/').pop());
      session.createdItems.add(fullPath);
      return null;
    });

    return results.filter(r => r !== null).join('\n') || null;
  },

  cat: (args, session) => {
    if (args.length === 0) {
      return null; // Would wait for stdin
    }

    const results = args.map(file => {
      const fullPath = resolvePath(session.currentDir, file);
      
      if (!pathExists(session, fullPath)) {
        return `cat: ${file}: No such file or directory`;
      }

      if (isDirectory(session, fullPath)) {
        return `cat: ${file}: Is a directory`;
      }

      return session.fileSystem[fullPath].content || '';
    });

    return results.join('\n');
  },

  echo: (args, session) => {
    return args.join(' ');
  },

  whoami: (args, session) => {
    return session.environment.USER;
  },

  date: (args, session) => {
    return new Date().toString();
  },

  uname: (args, session) => {
    if (args.includes('-a')) {
      return 'Linux assessment-platform 5.15.0-generic #1 SMP x86_64 GNU/Linux';
    }
    return 'Linux';
  },

  hostname: (args, session) => {
    return 'assessment-platform';
  },

  env: (args, session) => {
    return Object.entries(session.environment)
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');
  },

  grep: (args, session) => {
    if (args.length < 2) {
      return 'grep: missing operands\nTry \'grep --help\' for more information.';
    }
    const pattern = args[0];
    const file = args[1];
    const fullPath = resolvePath(session.currentDir, file);
    
    if (!pathExists(session, fullPath) || !isFile(session, fullPath)) {
      return `grep: ${file}: No such file or directory`;
    }

    const content = session.fileSystem[fullPath].content;
    const lines = content.split('\n').filter(line => line.includes(pattern));
    return lines.join('\n') || '';
  },

  find: (args, session) => {
    const path = args[0] || '.';
    const targetPath = resolvePath(session.currentDir, path);
    
    if (!pathExists(session, targetPath)) {
      return `find: '${path}': No such file or directory`;
    }

    const results = [targetPath];
    
    function traverse(dirPath) {
      if (isDirectory(session, dirPath)) {
        const contents = session.fileSystem[dirPath].contents;
        contents.forEach(item => {
          const fullPath = dirPath === '/' ? '/' + item : dirPath + '/' + item;
          if (pathExists(session, fullPath)) {
            results.push(fullPath);
            traverse(fullPath);
          }
        });
      }
    }
    
    traverse(targetPath);
    return results.join('\n');
  },

  help: (args, session) => {
    return `Available commands:
  ls      - list directory contents
  cd      - change directory
  pwd     - print working directory
  mkdir   - create directories
  touch   - create files
  cat     - display file contents
  echo    - display text
  grep    - search text patterns
  find    - search for files
  whoami  - print user name
  date    - display date and time
  uname   - print system information
  hostname- print system hostname
  env     - display environment variables
  clear   - clear the terminal
  help    - display this help message`;
  },

  clear: (args, session) => {
    return '[CLEAR]';
  }
};

// Execute command
router.post('/execute', (req, res) => {
  const { command, sessionId = 'default' } = req.body;
  const session = getSession(sessionId);
  
  const trimmed = command.trim();
  if (!trimmed) {
    return res.json({ success: true, output: '', currentDir: session.currentDir });
  }

  session.history.push(trimmed);

  // Parse command and arguments
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  let output = '';
  
  if (commands.hasOwnProperty(cmd)) {
    const result = commands[cmd](args, session);
    output = result === null ? '' : result;
  } else {
    output = `bash: ${cmd}: command not found`;
  }

  res.json({
    success: true,
    output,
    command: trimmed,
    currentDir: session.currentDir,
    sessionId
  });
});

// Validate task
router.post('/validate', (req, res) => {
  const { taskId, command, sessionId = 'default' } = req.body;
  const session = getSession(sessionId);
  
  const task = juniorTerminalTasks.find(t => t.id === taskId);
  
  if (!task) {
    return res.status(404).json({
      success: false,
      message: 'Task not found'
    });
  }
  
  const normalizedCommand = command.trim().toLowerCase();
  
  const isValid = task.validCommands.some(validCmd => 
    normalizedCommand === validCmd.toLowerCase() || 
    normalizedCommand.startsWith(validCmd.toLowerCase() + ' ')
  );
  
  res.json({
    success: true,
    correct: isValid,
    expectedCommand: task.expectedCommand,
    hint: isValid ? null : task.hint,
    message: isValid ? 'Correct! Well done.' : 'Not quite right. Try again.',
    sessionId
  });
});

// Reset session
router.post('/reset', (req, res) => {
  const { sessionId = 'default' } = req.body;
  sessions.delete(sessionId);
  const newSession = getSession(sessionId);
  
  res.json({
    success: true,
    message: 'Session reset',
    currentDir: newSession.currentDir,
    sessionId
  });
});

module.exports = router;
