export interface Page {
  path: string;
  title: string;
  isActive: boolean;
  inHeader: boolean;
}

export interface Agency {
  logo: {
    path: string;
  };
  pages: Page[];
}

export interface Global {
  agency: Agency;
  authentication: {
    isAuth: boolean;
  };
}

export interface HeaderProps {
  global: Global;
  isSmall: boolean;
  state: boolean;
  setState: (state: boolean) => void;
}
