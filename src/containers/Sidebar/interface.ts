export interface GlobalType {
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
}

export interface MenuProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  toggleTheme?: () => void;
  global: GlobalType;
}

export interface MenuLeftProps {
  $wide: boolean;
  $isMobile: boolean;
}
