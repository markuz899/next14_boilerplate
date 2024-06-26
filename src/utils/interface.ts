import { AppProps } from "next/app";
import { ReactNode } from "react";

export interface AppGlobalProps extends AppProps {
  reduxStore: any;
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
  global: {
    authentication: any;
    menuState: any;
    setMenuState: (state: any) => void;
    theme: {
      themes: any[];
      setTheme: (theme: any) => void;
    };
    pwa: {
      installPrompt: () => Promise<void>;
      isInstalled: boolean;
      isStandalone: boolean;
      isOffline: boolean;
      canInstall: boolean;
      handleInstallPrompt: () => void;
    };
  };
}
