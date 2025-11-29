// Path utility functions
export class PathUtils {
  static resolve(currentDir, path) {
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
    if (path === '~') {
      return '/home/student';
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

  static exists(session, path) {
    return session.fileSystem.hasOwnProperty(path);
  }

  static isDirectory(session, path) {
    const item = session.fileSystem[path];
    return item && item.type === 'dir';
  }

  static isFile(session, path) {
    const item = session.fileSystem[path];
    return item && item.type === 'file';
  }

  static getParent(path) {
    return path.substring(0, path.lastIndexOf('/')) || '/';
  }

  static getBasename(path) {
    return path.split('/').pop();
  }
}
