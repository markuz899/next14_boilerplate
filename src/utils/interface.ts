import { AppProps } from "next/app";
import { ReactNode } from "react";

export interface AppGlobalProps extends AppProps {
  authentication: {
    isAuth?: boolean;
  };
}

export interface LayoutProps {
  children: ReactNode;
  global?: any;
  title?: string;
  background?: string;
  className?: string;
}

export interface GlobalPageProps {
  global: {};
}
