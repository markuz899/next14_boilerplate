import React, { createContext, useEffect, useState } from "react";
import { User } from "@/services";
import { CookieManager } from "@/utils/cookie";
import { AUTH_KEY, USER_KEY } from "@/utils/constants";

interface AuthContextType {
  isAuth: boolean;
  user: any;
  login: (payload: any) => Promise<any>;
  registerService: (payload: any) => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  isAuth?: boolean;
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  user: null,
  login: async () => {},
  registerService: async () => {},
  logout: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      const token = CookieManager.get(AUTH_KEY);
      if (token) {
        // const data = await User.getUser();
        const data: any = {};
        if (data?.error) logout();
        if (data?.id) setUser(data);
      }
    }
    getUser();
  }, []);

  const login = async (payload: any) => {
    let userLogin = await User.login(payload);
    if (userLogin?.jwt) {
      CookieManager.set(AUTH_KEY, userLogin);
      CookieManager.set(USER_KEY, JSON.stringify(userLogin?.user));
      location.replace("/");
    } else {
      console.error("Username o password errati");
      return userLogin;
    }
    return userLogin;
  };

  const register = async (payload: any) => {
    // let userRegister = await User.register(payload);
    let userRegister: any = {};
    if (userRegister?.jwt) {
      CookieManager.set(AUTH_KEY, userRegister?.jwt);
      CookieManager.set(USER_KEY, JSON.stringify(userRegister?.user));
      location.replace("/");
    } else {
      console.error("Qualcosa è andato storto");
    }
    return userRegister;
  };

  const logout = async () => {
    location.replace("/login");
    CookieManager.delete(AUTH_KEY);
    CookieManager.delete(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: !!user, user, logout, registerService: register, login }}
      {...props}
    />
  );
};

export const useAuth = () => React.useContext(AuthContext);

export const AuthConsumer = AuthContext.Consumer;
