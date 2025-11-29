// Terminal Session Service
class TerminalSessionService {
  constructor() {
    this.sessions = new Map();
    this.SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  }

  createSession(sessionId) {
    const session = {
      id: sessionId,
      currentDir: '/home/student',
      fileSystem: this._initFileSystem(),
      environment: this._initEnvironment(),
      history: [],
      createdItems: new Set(),
      createdAt: Date.now(),
      lastAccess: Date.now()
    };
    
    this.sessions.set(sessionId, session);
    this._scheduleCleanup(sessionId);
    return session;
  }

  getSession(sessionId) {
    let session = this.sessions.get(sessionId);
    
    if (!session) {
      session = this.createSession(sessionId);
    } else {
      session.lastAccess = Date.now();
    }
    
    return session;
  }

  deleteSession(sessionId) {
    return this.sessions.delete(sessionId);
  }

  _scheduleCleanup(sessionId) {
    setTimeout(() => {
      const session = this.sessions.get(sessionId);
      if (session && Date.now() - session.lastAccess > this.SESSION_TIMEOUT) {
        this.sessions.delete(sessionId);
      }
    }, this.SESSION_TIMEOUT);
  }

  _initFileSystem() {
    return {
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
    };
  }

  _initEnvironment() {
    return {
      USER: 'student',
      HOME: '/home/student',
      SHELL: '/bin/bash',
      PATH: '/usr/local/bin:/usr/bin:/bin'
    };
  }
}

export default new TerminalSessionService();
