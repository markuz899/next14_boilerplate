import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Icon from "../Icon";
import { InputProps, InputRef } from "./interface";
import theme from "@/theme";

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      type = "text",
      placeholder,
      topPlaceholder,
      value,
      defaultValue,
      name,
      isError = false,
      onChange,
      message,
      showPasswordIcon,
      icon,
      iconBefore,
      className,
      disabled,
      readOnly,
      required,
      enableControlledInput,
      uppercase,
      withFilter,
      autoComplete,
      inputSelectAction,
      labelBgColor,
      ...rest
    },
    ref
  ) => {
    const initialValue = defaultValue || value || "";
    const inputRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<string | undefined>(defaultValue);
    const [hasValue, setHasValue] = useState<boolean>(!!initialValue);
    const [state, setState] = useState<string>(initialValue);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    useEffect(() => {
      if (defaultValue !== valueRef.current) {
        setState(defaultValue || "");
        setHasValue(!!defaultValue);
      }
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (uppercase) v = v.toUpperCase();
      if (!enableControlledInput) {
        setHasValue(!!v);
        setState(v);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const toggleSelectAction = () => {
      const { visible, show, close } = inputSelectAction!;
      if (visible) return close();
      show();
    };

    let after = icon && (
      <After onClick={inputSelectAction ? toggleSelectAction : undefined}>
        <Icon
          name={icon}
          size={theme.font.size.mini}
          color={theme.colors.primary}
        />
      </After>
    );

    let errorTooltip = null;
    let errorMessage = null;

    if (showPasswordIcon) {
      after = (
        <span
          className="pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "NASCONDI" : "MOSTRA"}
        </span>
      );
    }

    if (isError && message) {
      errorTooltip = (
        <Icon name="warning-circular" color={theme.colors.error} />
      );
      errorMessage = <p className="error-msg text-error">*{message}</p>;
    }

    return (
      type !== "hidden" && (
        <Box
          isError={isError || undefined}
          className={className}
          focus={focus.toString()}
          withFilter={withFilter}
          $labelBgColor={labelBgColor}
        >
          {iconBefore && (
            <Before>
              <Icon name={iconBefore} />
            </Before>
          )}
          <Container>
            <input
              ref={inputRef}
              type={showPassword ? "text" : type}
              onChange={handleChange}
              value={!enableControlledInput ? state : value || ""}
              data-value={!enableControlledInput ? hasValue : !!value}
              name={name}
              autoComplete={autoComplete || name}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              placeholder={placeholder}
              {...rest}
            />
            <Label iconBefore={iconBefore}>
              {topPlaceholder && topPlaceholder}{" "}
              {required && <span className="asterisk">*</span>}
            </Label>
          </Container>
          {errorTooltip}
          {errorMessage}
          {after}
        </Box>
      )
    );
  }
);

Input.displayName = "Input";

export default React.memo(Input);

Input.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.any,
  iconBefore: PropTypes.string,
  showPasswordIcon: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  enableControlledInput: PropTypes.bool,
  readOnly: PropTypes.bool,
  uppercase: PropTypes.bool,
  type: PropTypes.string,
  withFilter: PropTypes.bool,
  labelBgColor: PropTypes.string,
};

const Box = styled.div<{
  isError: any;
  focus: any;
  withFilter?: boolean;
  $labelBgColor?: string;
}>`
  position: relative;
  margin-top: ${theme.spaces.space3};
  border-radius: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: ${theme.spaces.space9};
  background: transparent;
  width: 100%;
  padding: 0 ${theme.spaces.space2};
  border: 1px solid
    ${({ isError, focus }) =>
      isError
        ? theme.colors.error
        : focus
        ? theme.colors.primary
        : theme.colors.borderComponent};
  border-radius: ${theme.extra.radiusBig};
  input {
    box-sizing: border-box;
    background: transparent;
    width: 100%;
    border: 0;
    color: ${theme.colors.white};
    color: ${({ isError }) =>
      isError ? theme.colors.error : theme.colors.white};
    min-height: ${theme.spaces.space7};
    padding: 0;
    font-weight: ${theme.font.weight.medium};
    font-size: ${theme.font.size.tiny};
    transition: ${theme.extra.transition};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ withFilter }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${theme.font.size.tiny};
    }
    &:-ms-input-placeholder {
      color: ${({ withFilter }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${theme.font.size.tiny};
    }
    &::-ms-input-placeholder {
      color: ${({ withFilter }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${theme.font.size.tiny};
    }
  }
  input + label,
  input:not([data-value="false"]) + label {
    transform: translateY(-25px) scale(0.9);
    background: ${({ $labelBgColor }) => $labelBgColor};
    padding: 0 ${theme.spaces.space1};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-background-clip: text;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input:-webkit-autofill + label,
  input:-webkit-autofill:focus + label {
    transform: translateY(-25px) scale(0.9);
  }
  input:disabled {
    cursor: default;
  }
  .error-msg {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size: ${theme.font.size.mini};
  }
  .pointer {
    cursor: pointer;
    font-size: ${theme.font.size.mini};
    color: ${theme.colors.lightGrey};
  }
`;

const Container = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
`;

const After = styled.div`
  margin-left: ${theme.spaces.space2};
`;

const Before = styled.div`
  margin-right: ${theme.spaces.space2};
`;

const Label = styled.label<{ iconBefore?: string }>`
  background: ${theme.colors.body};
  position: absolute;
  top: 0px;
  left: 0;
  right: auto;
  max-width: 100%;
  transform-origin: top left;
  margin-top: 8px;
  transition: ${theme.extra.transitionFluid};
  pointer-events: none;
  padding: 0;
  font-size: ${theme.font.size.mini};
  color: ${theme.colors.white};
  span {
    color: ${theme.colors.error};
  }
  .asterisk {
    color: ${theme.colors.primary};
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.font.size.tiny};
  }
`;
