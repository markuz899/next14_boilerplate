export interface InputProps {
  type?: string;
  placeholder?: string;
  topPlaceholder?: string;
  value?: string;
  defaultValue?: string;
  name?: string;
  isError?: boolean;
  onChange?: any;
  message?: string;
  showPasswordIcon?: boolean;
  icon?: string;
  iconBefore?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  enableControlledInput?: boolean;
  uppercase?: boolean;
  withFilter?: boolean;
  autoComplete?: string;
  inputSelectAction?: {
    visible: boolean;
    show: () => void;
    close: () => void;
  };
  labelBgColor?: string;
  [key: string]: any;
}

export interface InputRef {
  focus: () => void;
}
