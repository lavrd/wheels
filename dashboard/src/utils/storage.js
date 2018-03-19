export default class Storage {
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

export const STORAGE_SESSION = 'session';
