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

  static clear() {
    localStorage.clear();
  }
}
