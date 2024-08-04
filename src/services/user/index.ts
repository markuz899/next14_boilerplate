import UserService from "./service";

class User {
  static async getUser(token: string) {
    try {
      const res = await UserService.getUser(token);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - get user*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
  static async login(payload: { username: string; password: string }) {
    try {
      const res = await UserService.login(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - login user*", err);
      return { error: true, detail: { name: "ValidationError" } };
    }
  }
  static async register(payload: {}) {
    try {
      const res = await UserService.register(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - register user*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
  static async forgotPassword(payload: {}) {
    try {
      const res = await UserService.forgotPassword(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - forgotPassword user*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
  static async resetPassword(payload: {}) {
    try {
      const res = await UserService.resetPassword(payload);
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - resetPassword user*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
  static async pingo() {
    try {
      const res = await UserService.pingo();
      if (!res.ok) throw res;
      return await res.json();
    } catch (err: any) {
      console.error("*err - ping*", err);
      if (err.status === 401) {
        console.log("logout");
      }
      return { error: true };
    }
  }
}

export default User;
