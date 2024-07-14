export interface BadgeProps {
  label?: string;
  onClick?: (label: string) => void;
  className?: string;
  iconClose?: boolean;
  kind?: "warning" | "success" | "error" | "info" | "ghost";
}
