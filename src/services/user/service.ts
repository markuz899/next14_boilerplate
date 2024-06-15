import { CookieManager } from "@/utils/cookie";
import ApiRequest from "../request";

class UserService {
  static async getUser(token: string) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token || CookieManager.get("auth")}`,
      },
    };
    return await ApiRequest.get("/user/me", options);
  }

  static async login(payload: { username: string; password: string }) {
    const options = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(payload),
    };
    return await ApiRequest.post("/auth/user/login", options);
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
}

export default UserService;
