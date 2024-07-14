export interface TabsProps {
  title?: string;
  colorText?: string;
  renderContent?: () => React.ReactNode;
  isOpen?: boolean;
  showIcon?: boolean;
  noMargin?: boolean;
  noPadding?: boolean;
  iconPosition?: "left" | "right";
}
