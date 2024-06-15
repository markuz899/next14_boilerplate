class Storage {
  static set(key: string, payload: any): void {
    localStorage.setItem(key, JSON.stringify(payload));
  }

  static get(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static remove(key: string | string[]): void {
    if (Array.isArray(key)) {
      key.forEach((item) => {
        localStorage.removeItem(item);
      });
    } else {
      localStorage.removeItem(key);
    }
  }
}

class Session {
  static set(key: string, payload: any): void {
    sessionStorage.setItem(key, JSON.stringify(payload));
  }

  static get(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  static remove(key: string | string[]): void {
    if (Array.isArray(key)) {
      key.forEach((item) => {
        sessionStorage.removeItem(item);
      });
    } else {
      sessionStorage.removeItem(key);
    }
  }
}

export { Storage, Session };
