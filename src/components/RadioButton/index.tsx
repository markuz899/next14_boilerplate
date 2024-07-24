import theme from "@/theme";
import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { RadioButtonProps, OptionProps } from "./interface";
import { Button } from "..";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  onChange = () => {},
  className,
  name = "radio-button",
}) => {
  const initialValue = options.find((item) => item.checked) || options[0];
  const [selected, setValue] = useState<OptionProps>(initialValue);

  const select = (e: MouseEvent<HTMLButtonElement>, option: OptionProps) => {
    setValue(option);
    onChange({ ...option, name });
  };

  return (
    <Wrapper className={className}>
      <div className="content">
        {options.map((option, index) => (
          <Button
            type="button"
            key={option.value}
            kind={option.value === selected.value ? "primary" : "action"}
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

const Wrapper = styled.div`
  width: 100%;
  .content {
    margin: 0 auto;
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${theme.spaces.space2};
  }
`;
