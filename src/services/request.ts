import { API_HOST } from "../utils/constants";

/* eslint-disable */
class ApiRequest {
  static async http(path: string, options: {}) {
    const url = `${API_HOST}/api${path}`;
    return await fetch(url, options);
  }

  static async get(path: string, options: {}) {
    return await this.http(path, { method: "GET", ...options });
  }

  static async post(path: string, options: {}) {
    return await this.http(path, { method: "POST", ...options });
  }

  static async put(path: string, options: {}) {
    return await this.http(path, { method: "PUT", ...options });
  }

  static async patch(path: string, options: {}) {
    return await this.http(path, { method: "PATCH", ...options });
  }

  static async delete(path: string, options: {}) {
    return await this.http(path, { method: "DELETE", ...options });
  }
}

export default ApiRequest;
