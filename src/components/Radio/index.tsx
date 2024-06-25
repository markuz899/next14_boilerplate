import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme";
// import Tooltip from '../Tooltip';
import Icon from "../Icon";
import { RadioProps } from "./interface";

const Radio: React.FC<RadioProps> = ({
  name,
  label,
  options,
  onChange,
  inline = false,
  defaultValue = null,
  isError = false,
  message,
}) => {
  const [state, setState] = useState<any>(defaultValue);

  useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    newValue: any
  ) => {
    if (newValue !== state) {
      setState(newValue);
      onChange({ label: name, value: newValue, name }, e);
    }
  };

  return (
    <RadioGroup inline={inline ? 1 : 0}>
      {label && <Placeholder>{label}</Placeholder>}
      <Options inline={inline ? 1 : 0} $isError={isError}>
        {options.map((option) => (
          <label key={`${option.label}`}>
            <input type="radio" name={name} value={option.value} />
            <Option
              onClick={(e) => handleOnClick(e, option.value)}
              active={state === option.value ? "si" : undefined}
            >
              <div className="selector" />
              <span>{option.label}</span>
            </Option>
          </label>
        ))}
      </Options>
      {isError && (
        <div>
          {/* <Tooltip content={message} className="alertTooltip"> */}
          <Icon name="help-circular" color={theme.colors.error} />
          {/* </Tooltip> */}
        </div>
      )}
    </RadioGroup>
  );
};

Radio.displayName = "Radio";

export default Radio;

/* eslint-disable */
const RadioGroup = styled.div<{ inline: any }>`
  display: flex;
  flex-direction: ${(props) => (props.inline == 1 ? "row" : "column")};
`;

const Placeholder = styled.span`
  font-weight: bold;
`;

const Options = styled.div<{ inline: any; $isError: boolean | undefined }>`
  display: flex;
  flex-direction: ${(props) => (props.inline == 1 ? "row" : "column")};
  color: ${(props) => (props.$isError ? theme.colors.error : "inherit")};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  label {
    margin: ${(props) => (props.inline ? "0 5px" : "5px 0")};
  }
`;

const Option = styled.div<{ active: any }>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  .selector {
    border: 1px solid ${theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 1px solid
      ${(props) =>
        props.active ? theme.colors.primary : theme.colors.greyIcon};
    &:hover {
      opacity: 0.8;
    }
    &:after {
      content: "";
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${(props) =>
        props.active ? theme.colors.primary : "transparent"};
    }
  }
  span {
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    margin: 0 ${theme.spaces.space4} 0 ${theme.spaces.space3};
    display: inline-block;
    font-size: ${theme.font.size.tiny};
  }
`;
