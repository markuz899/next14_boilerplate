import { Global } from "../Header/interface";

export interface MenuProps {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  toggleTheme?: () => void;
  global: Global;
}

export interface MenuLeftProps {
  $wide: boolean;
  $isMobile: boolean;
}
