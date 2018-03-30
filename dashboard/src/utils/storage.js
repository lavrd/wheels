class Storage {
  static set(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
  }

  static get(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  static clear() {
    localStorage.clear();
  }
}

const STORAGE_SESSION = 'session';

export {Storage, STORAGE_SESSION};
