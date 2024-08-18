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
  agency?: {
    logo?: {
      path?: string;
    };
    pages?: Array<{
      path: string;
      title: string;
      isActive: boolean;
      inHeader: boolean;
    }>;
  };
  isAuth?: boolean;
  pwa?: any;
  authentication: {
    isAuth: boolean;
  };
  handleSelectChange?: any;
}

export interface HeaderProps {
  global: Global;
  isSmall: boolean;
  state: boolean;
  setState: (state: boolean) => void;
}
