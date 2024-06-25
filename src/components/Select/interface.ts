export interface SelectProps {
  options: { label: string; value: string }[];
  onChange: any;
  onInputChange?: (data: { value: string }) => void;
  placeholder?: string;
  topPlaceholder?: string;
  name?: string;
  showArrow?: boolean;
  enableInput?: boolean;
  onClose?: () => void;
  isError?: boolean;
  message?: string;
  value?: string | string[];
  multiselect?: boolean;
  defaultValues?: string[];
  readOnly?: boolean;
  className?: string;
  withFilter?: boolean;
  disabled?: boolean;
}
