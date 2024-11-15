import React, { createContext, useEffect, useState } from "react";
import { User } from "@/services";
import { setCookie, deleteCookie } from "cookies-next";
import { AUTH_KEY, USER_KEY } from "@/utils/constants";

interface AuthContextType {
  isAuth: boolean;
  login: (payload: any) => Promise<any>;
  register: (payload: any) => Promise<any>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  isAuth: boolean;
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
});

export const AuthProvider = (props: AuthProviderProps) => {
  const login = async (payload: any) => {
    const userLogin = await User.login(payload);
    if (userLogin?.jwt) {
      setCookie(AUTH_KEY, userLogin.jwt);
      setCookie(USER_KEY, JSON.stringify(userLogin));
      location.replace("/");
    } else {
      console.error("Username o password errati");
      return userLogin;
    }
    return userLogin;
  };

  const register = async (payload: any) => {
    const userRegister = await User.register(payload);
    if (userRegister?.jwt) {
      setCookie(AUTH_KEY, userRegister?.jwt);
      setCookie(USER_KEY, JSON.stringify(userRegister?.user));
      location.replace("/");
    } else {
      console.error("Qualcosa è andato storto");
    }
    return userRegister;
  };

  const logout = async () => {
    location.replace("/login");
    deleteCookie(AUTH_KEY);
    deleteCookie(USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: props.isAuth, logout, register, login }}
      {...props}
    />
  );
};

export const useAuth = () => React.useContext(AuthContext);

export const AuthConsumer = AuthContext.Consumer;
