import { handleError } from "../error";
import UserService from "./service";

class User {
  static async getUser(token: string) {
    try {
      const res = await UserService.getUser(token);
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - get user*", err);
      return {
        error: true,
        messages: err.message,
      };
    }
  }
  static async login(payload: { username: string; password: string }) {
    try {
      const res = await UserService.login(payload);
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - login user*", err);
      return {
        error: true,
        messages: err.message,
      };
    }
  }
  static async register(payload: {}) {
    try {
      const res = await UserService.register(payload);
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - register user*", err);
      return { error: true, messages: err.message };
    }
  }
  static async forgotPassword(payload: {}) {
    try {
      const res = await UserService.forgotPassword(payload);
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - forgotPassword user*", err);
      return { error: true, messages: err.message };
    }
  }
  static async resetPassword(payload: {}) {
    try {
      const res = await UserService.resetPassword(payload);
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - resetPassword user*", err);
      return { error: true, messages: err.message };
    }
  }
  static async pingo() {
    try {
      const res = await UserService.pingo();
      if (!res.ok) {
        const errorMessage = await handleError(res);
        throw new Error(errorMessage);
      }
      return await res.json();
    } catch (err: any) {
      logger.error("*err - ping*", err);
      return { error: true };
    }
  }
}

export default User;
