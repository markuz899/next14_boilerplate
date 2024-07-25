// DatePicker.interface.ts
export interface DatePickerProps {
  value?: string;
  label?: string;
  placeholder?: string;
  topPlaceholder?: string;
  onChange?: any;
  name?: string;
  isError?: boolean;
  message?: string;
  showTimeSelect?: boolean;
  className?: string;
  maxDate?: Date;
  minDate?: Date;
}
