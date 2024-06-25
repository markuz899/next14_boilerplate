export interface CheckboxProps {
  refer?: React.Ref<HTMLInputElement>;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (
    event: { name: string; value: boolean; checked: boolean; label?: string },
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  buttonMode?: boolean;
  label?: string;
  isError?: boolean;
  message?: string;
  children?: React.ReactNode;
  className?: string;
  htmlFor?: string;
}
