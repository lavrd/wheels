export default class Storage {
  static set(name, object) {
    localStorage.setItem(name, JSON.stringify(object));
  }

  static get(name) {
    return JSON.parse(localStorage.getItem(name));
  }

  static append(name, object) {
    let items = this.get(name);
    if (!!items) items.push(object);
    else items = [object];
    localStorage.setItem(name, JSON.stringify(items));
  }

  static remove(name) {
    localStorage.removeItem(name);
  }

  static splice(name, id) {
    const items = this.get(name);
    if (!!items) {
      items.splice(id, 1);
      if (!!items) {
        this.remove(name);
        return;
      }
    } else return;
    localStorage.setItem(name, JSON.stringify(items));
  }

  static clear() {
    localStorage.clear();
  }
}

export const STORAGE_WHEELS = 'wheels';
