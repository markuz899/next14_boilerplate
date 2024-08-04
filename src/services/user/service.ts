import { CookieManager } from "@/utils/cookie";
import ApiRequest from "../request";
import { AUTH_KEY } from "@/utils/constants";

class UserService {
  static async getUser(token: string) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token || CookieManager.get(AUTH_KEY)}`,
      },
    };
    return await ApiRequest.get("/auth/me", options);
  }

  static async login(payload: { username: string; password: string }) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await ApiRequest.post("/auth/login", options);
  }

  static async register(payload: {}) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await ApiRequest.post("/auth/user/register", options);
  }

  static async forgotPassword(payload: {}) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await ApiRequest.post("/auth/user/forgot-password", options);
  }

  static async resetPassword(payload: {}) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await ApiRequest.post("/auth/user/reset-password", options);
  }

  static async pingo() {
    const options = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    return await fetch("https://jsonplaceholder.typicode.com/todos", options);
  }
}

export default UserService;
