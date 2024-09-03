import theme from "@/theme";
import React, { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { RadioButtonProps, OptionProps } from "./interface";
import { Button } from "..";
import Icon from "../Icon";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  onChange = () => {},
  className,
  name = "radio-button",
  inline = true,
  defaultValue,
  isError = false,
}) => {
  const initialValue = options.find((item) => item.checked);
  const [selected, setValue] = useState<any>(initialValue || null);

  useEffect(() => {
    if (defaultValue) {
      let t: any = options?.find((item) => item.value.includes(defaultValue));
      setValue(t);
    }
  }, [defaultValue]);

  const select = (e: MouseEvent<HTMLButtonElement>, option: any) => {
    setValue(option);
    onChange({ ...option, name });
  };

  return (
    <Wrapper $inline={inline} $isError={isError} className={className}>
      <div className="content">
        {options.map((option, index) => (
          <Button
            type="button"
            key={option.value}
            kind={option.value == selected?.value ? "primary" : "action"}
            disabled={option.disabled}
            onClick={(e: any) => select(e, option)}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </Wrapper>
  );
};

export default RadioButton;

const Wrapper = styled.div<{ $inline: boolean; $isError: boolean }>`
  width: 100%;
  .content {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: ${(props) => (props.$inline ? "row" : "column")};
    flex-wrap: wrap;
    gap: ${theme.spaces.space2};
    button {
      min-width: 80px;
      border-color: ${({ $isError }) =>
        $isError ? theme.colors.error : "inherit"};
    }
  }
`;
