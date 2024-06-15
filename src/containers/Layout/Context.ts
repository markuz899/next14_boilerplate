import { Dispatch, SetStateAction, createContext } from "react";

interface LayoutContextType {
  menuState: any;
  setMenuState: Dispatch<SetStateAction<any>>;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export default LayoutContext;
