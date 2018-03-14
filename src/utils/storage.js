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
    this.set(name, items);
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
    this.set(name, items);
  }

  static clear() {
    localStorage.clear();
  }

  static updateArr(name, id, object) {
    const items = this.get(name);
    if (!items) this.append(name, object);
    else {
      items[id] = object;
      this.set(name, items);
    }
  }
}

export const STORAGE_WHEELS = 'wheels';
