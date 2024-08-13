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
      importantDefault,
      name,
      isError = false,
      isWarning = false,
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
      rounded = false,
      clearable = false,
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

    const text = importantDefault
      ? defaultValue
      : !enableControlledInput
      ? state
      : value;
    const dataValue = !enableControlledInput ? hasValue : !!value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (uppercase) v = v.toUpperCase();
      if (!enableControlledInput) {
        setHasValue(!!v);
        setState(v);
      }
      onChange && onChange({ value: v, name, type }, e);
    };

    const toggleSelectAction = () => {
      const { visible, show, close } = inputSelectAction!;
      if (visible) return close();
      show();
    };

    const clearInput = () => {
      setHasValue(false);
      setState("");
      onChange && onChange({ value: "", name, type });
    };

    let after = icon && (
      <After onClick={inputSelectAction ? toggleSelectAction : undefined}>
        <Icon
          name={icon}
          size={theme.font.size.normal}
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
          {showPassword ? (
            <Icon name="eye-not" color={theme.colors.borderComponent} />
          ) : (
            <Icon name="eye" color={theme.colors.borderComponent} />
          )}
        </span>
      );
    }

    if (type == "search" && state.length) {
      after = (
        <After className="cursor-pointer" onClick={clearInput}>
          <Icon
            name={"close-circular"}
            size={theme.font.size.normal}
            color={theme.colors.primary}
          />
        </After>
      );
    }

    let cleared =
      clearable && state.length ? (
        <After className="cursor-pointer" onClick={clearInput}>
          <Icon
            name={"close-circular"}
            size={theme.font.size.normal}
            color={theme.colors.primary}
          />
        </After>
      ) : null;

    if (isError && message) {
      errorTooltip = (
        <Icon name="warning-circular" color={theme.colors.error} />
      );
      errorMessage = <p className="error-msg text-error">*{message}</p>;
    }

    return (
      type !== "hidden" && (
        <Box
          $rounded={rounded}
          $isError={isError || undefined}
          $isWarning={isWarning || undefined}
          className={className}
          $focus={focus}
          withFilter={withFilter}
          $labelBgColor={labelBgColor}
        >
          {iconBefore && (
            <Before>
              <Icon
                name={iconBefore}
                color={theme.colors.primary}
                size={theme.font.size.normal}
              />
            </Before>
          )}
          <Container>
            <input
              ref={inputRef}
              type={showPassword ? "text" : type}
              onChange={handleChange}
              value={text || ""}
              data-value={dataValue}
              name={name}
              autoComplete={autoComplete || name}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              placeholder={`${placeholder} ${required ? "*" : ""}`}
              {...rest}
            />
            {topPlaceholder && (
              <Label $iconBefore={iconBefore} $labelBgColor={labelBgColor}>
                {topPlaceholder && topPlaceholder}{" "}
                {required && <span className="asterisk">*</span>}
              </Label>
            )}
          </Container>
          {errorTooltip}
          {errorMessage}
          {cleared}
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
  $rounded: boolean;
  $isError: any;
  $isWarning: any;
  $focus: any;
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
  border: 2px solid
    ${({ $isError, $isWarning, $focus }) =>
      $isWarning
        ? theme.colors.warning
        : $isError
        ? theme.colors.error
        : $focus
        ? theme.colors.primary
        : theme.colors.borderComponent};
  border-radius: ${({ $rounded }) =>
    $rounded ? theme.extra.radiusRound : theme.extra.radiusBig};
  input {
    box-sizing: border-box;
    background: transparent;
    width: 100%;
    border: 0;
    color: ${({ theme }) => theme.text};
    color: ${(props) => props.$isWarning && theme.colors.warningDark};
    color: ${(props) => props.$isError && theme.colors.error};
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
    transform: translateY(-24px) scale(0.9);
    background: ${({ $labelBgColor, theme }) => $labelBgColor || theme.bg};
    padding: 0 ${theme.spaces.space1};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: ${({ theme }) => theme.text} !important;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input:-webkit-autofill + label,
  input:-webkit-autofill:focus + label {
    transform: translateY(-24px) scale(0.9);
  }
  input:disabled {
    cursor: default;
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
      no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
  }

  input[type="search"]::-webkit-search-cancel-button {
    cursor: pointer;
    display: none;
  }
  .error-msg {
    position: absolute;
    bottom: -22px;
    left: 0;
    font-size: ${theme.font.size.mini};
  }
  .pointer {
    cursor: pointer;
    font-size: ${theme.font.size.mini};
    color: ${theme.colors.lightGrey};
  }
  &:hover {
    transition: all ${theme.extra.transition};
    border: 2px solid
      ${({ $isError, $focus }) =>
        $isError ? theme.colors.error : theme.colors.primary};
  }
`;

const Container = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const After = styled.div`
  margin-left: ${theme.spaces.space2};
`;

const Before = styled.div`
  margin-right: ${theme.spaces.space2};
`;

const Label = styled.label<{ $iconBefore?: string; $labelBgColor?: string }>`
  position: absolute;
  top: 3px;
  left: 6px;
  right: auto;
  max-width: 100%;
  transform-origin: top left;
  margin-top: 8px;
  transition: ${theme.extra.transitionFluid};
  pointer-events: none;
  padding: 0;
  font-size: ${theme.font.size.normal};
  color: ${theme.colors.grey};
  background: ${({ $labelBgColor, theme }) => $labelBgColor || theme.bg};
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
