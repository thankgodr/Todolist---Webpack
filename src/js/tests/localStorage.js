export default class LocalStorage {
    store = {};

    setItem(key, val) {
      this.store[key] = val;
    }

    getItem(key) {
      return this.store[key];
    }

    removeItem(key) { delete this.store[key]; }

    clear() { this.store = {}; }
}