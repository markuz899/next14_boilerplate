import theme from "@/theme";
import { KIND } from "./styled";

type HeightKeys = keyof typeof theme.height;
type KindKeys = keyof typeof KIND;

export interface ButtonProps {
  kind?: KindKeys;
  icon?: string;
  size?: HeightKeys;
  iconSize?: string;
  label?: string;
  children?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  reverse?: boolean;
  round?: boolean;
  fluid?: boolean;
  className?: string;
  loading?: boolean;
  loadingColor?: string;
  disabled?: boolean;
  type?: any;
}

export interface StyledButtonProps {
  size: HeightKeys;
  $fluid?: boolean;
  reverse?: boolean;
  round?: boolean;
  kind: KindKeys;
}
