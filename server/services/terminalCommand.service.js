// Terminal Command Service
import terminalSessionService from './terminalSession.service.js';
import { PathUtils } from '../utils/pathUtils.js';
import { juniorTerminalTasks } from '../data/questions.js';

class TerminalCommandService {
  constructor() {
    this.commands = {
      ls: this._ls.bind(this),
      pwd: this._pwd.bind(this),
      cd: this._cd.bind(this),
      mkdir: this._mkdir.bind(this),
      touch: this._touch.bind(this),
      cat: this._cat.bind(this),
      echo: this._echo.bind(this),
      whoami: this._whoami.bind(this),
      date: this._date.bind(this),
      uname: this._uname.bind(this),
      hostname: this._hostname.bind(this),
      env: this._env.bind(this),
      grep: this._grep.bind(this),
      find: this._find.bind(this),
      help: this._help.bind(this),
      clear: this._clear.bind(this)
    };
  }

  execute(sessionId, command) {
    const session = terminalSessionService.getSession(sessionId);
    const trimmed = command.trim();

    if (!trimmed) {
      return { output: '', currentDir: session.currentDir };
    }

    session.history.push(trimmed);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    let output = '';

    if (this.commands[cmd]) {
      const result = this.commands[cmd](args, session);
      output = result === null ? '' : result;
    } else {
      output = `bash: ${cmd}: command not found`;
    }

    return {
      output,
      command: trimmed,
      currentDir: session.currentDir
    };
  }

  validate(taskId, command, sessionId) {
    const session = terminalSessionService.getSession(sessionId);
    const normalizedCommand = command.trim().toLowerCase();
    
    // Get the task from juniorTerminalTasks
    const task = juniorTerminalTasks.find(t => t.id === taskId);
    
    if (!task) {
      return {
        success: false,
        correct: false,
        message: 'Task not found',
        sessionId
      };
    }
    
    const isValid = task.validCommands.some(validCmd => 
      normalizedCommand === validCmd.toLowerCase() || 
      normalizedCommand.startsWith(validCmd.toLowerCase() + ' ')
    );

    return {
      success: true,
      correct: isValid,
      expectedCommand: task.expectedCommand,
      message: isValid ? 'Correct! Well done.' : 'Incorrect answer.',
      sessionId
    };
  }

  // Command implementations
  _ls(args, session) {
    const flags = args.filter(a => a.startsWith('-'));
    const hasLong = flags.some(f => f.includes('l'));
    const hasAll = flags.some(f => f.includes('a'));
    const paths = args.filter(a => !a.startsWith('-'));
    const targetPath = paths.length > 0 
      ? PathUtils.resolve(session.currentDir, paths[0]) 
      : session.currentDir;

    if (!PathUtils.exists(session, targetPath)) {
      return `ls: cannot access '${paths[0]}': No such file or directory`;
    }

    if (!PathUtils.isDirectory(session, targetPath)) {
      return paths[0] || targetPath;
    }

    let contents = [...session.fileSystem[targetPath].contents];
    if (hasAll) {
      contents = ['.', '..', ...contents];
    }

    if (hasLong) {
      const entries = contents.map(item => {
        const fullPath = targetPath === '/' ? '/' + item : targetPath + '/' + item;
        const isDir = item === '.' || item === '..' || 
          (PathUtils.exists(session, fullPath) && PathUtils.isDirectory(session, fullPath));
        const perms = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
        const links = isDir ? '2' : '1';
        const size = isDir ? '4096' : '1024';
        return `${perms} ${links} student student ${size.padStart(6)} Nov 29 12:00 ${item}`;
      });
      return entries.join('\n');
    }

    return contents.join('  ');
  }

  _pwd(args, session) {
    return session.currentDir;
  }

  _cd(args, session) {
    if (args.length === 0 || args[0] === '~') {
      session.currentDir = session.environment.HOME;
      return null;
    }

    const targetPath = PathUtils.resolve(session.currentDir, args[0]);
    
    if (!PathUtils.exists(session, targetPath)) {
      return `cd: ${args[0]}: No such file or directory`;
    }

    if (!PathUtils.isDirectory(session, targetPath)) {
      return `cd: ${args[0]}: Not a directory`;
    }

    session.currentDir = targetPath;
    return null;
  }

  _mkdir(args, session) {
    if (args.length === 0) {
      return 'mkdir: missing operand\nTry \'mkdir --help\' for more information.';
    }

    const hasParent = args.includes('-p');
    const dirs = args.filter(a => !a.startsWith('-'));

    const results = dirs.map(dir => {
      const fullPath = PathUtils.resolve(session.currentDir, dir);
      
      if (PathUtils.exists(session, fullPath)) {
        return `mkdir: cannot create directory '${dir}': File exists`;
      }

      const parentPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || '/';
      if (!PathUtils.exists(session, parentPath)) {
        if (!hasParent) {
          return `mkdir: cannot create directory '${dir}': No such file or directory`;
        }
      }

      session.fileSystem[fullPath] = { type: 'dir', contents: [] };
      session.fileSystem[parentPath].contents.push(dir.split('/').pop());
      session.createdItems.add(fullPath);
      return null;
    });

    return results.filter(r => r !== null).join('\n') || null;
  }

  _touch(args, session) {
    if (args.length === 0) {
      return 'touch: missing file operand\nTry \'touch --help\' for more information.';
    }

    const results = args.map(file => {
      const fullPath = PathUtils.resolve(session.currentDir, file);
      
      if (PathUtils.exists(session, fullPath)) {
        return null;
      }

      const parentPath = fullPath.substring(0, fullPath.lastIndexOf('/')) || '/';
      if (!PathUtils.exists(session, parentPath)) {
        return `touch: cannot touch '${file}': No such file or directory`;
      }

      session.fileSystem[fullPath] = { type: 'file', content: '' };
      session.fileSystem[parentPath].contents.push(file.split('/').pop());
      session.createdItems.add(fullPath);
      return null;
    });

    return results.filter(r => r !== null).join('\n') || null;
  }

  _cat(args, session) {
    if (args.length === 0) {
      return null;
    }

    const results = args.map(file => {
      const fullPath = PathUtils.resolve(session.currentDir, file);
      
      if (!PathUtils.exists(session, fullPath)) {
        return `cat: ${file}: No such file or directory`;
      }

      if (PathUtils.isDirectory(session, fullPath)) {
        return `cat: ${file}: Is a directory`;
      }

      return session.fileSystem[fullPath].content || '';
    });

    return results.join('\n');
  }

  _echo(args, session) {
    return args.join(' ');
  }

  _whoami(args, session) {
    return session.environment.USER;
  }

  _date(args, session) {
    return new Date().toString();
  }

  _uname(args, session) {
    if (args.includes('-a')) {
      return 'Linux assessment-platform 5.15.0-generic #1 SMP x86_64 GNU/Linux';
    }
    return 'Linux';
  }

  _hostname(args, session) {
    return 'assessment-platform';
  }

  _env(args, session) {
    return Object.entries(session.environment)
      .map(([key, val]) => `${key}=${val}`)
      .join('\n');
  }

  _grep(args, session) {
    if (args.length < 2) {
      return 'grep: missing operands\nTry \'grep --help\' for more information.';
    }

    const pattern = args[0];
    const file = args[1];
    const fullPath = PathUtils.resolve(session.currentDir, file);
    
    if (!PathUtils.exists(session, fullPath) || !PathUtils.isFile(session, fullPath)) {
      return `grep: ${file}: No such file or directory`;
    }

    const content = session.fileSystem[fullPath].content;
    const lines = content.split('\n').filter(line => line.includes(pattern));
    return lines.join('\n') || '';
  }

  _find(args, session) {
    const path = args[0] || '.';
    const targetPath = PathUtils.resolve(session.currentDir, path);
    
    if (!PathUtils.exists(session, targetPath)) {
      return `find: '${path}': No such file or directory`;
    }

    const results = [targetPath];
    
    const traverse = (dirPath) => {
      if (PathUtils.isDirectory(session, dirPath)) {
        const contents = session.fileSystem[dirPath].contents;
        contents.forEach(item => {
          const fullPath = dirPath === '/' ? '/' + item : dirPath + '/' + item;
          if (PathUtils.exists(session, fullPath)) {
            results.push(fullPath);
            traverse(fullPath);
          }
        });
      }
    };
    
    traverse(targetPath);
    return results.join('\n');
  }

  _help(args, session) {
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
  }

  _clear(args, session) {
    return '[CLEAR]';
  }
}

export default new TerminalCommandService();
