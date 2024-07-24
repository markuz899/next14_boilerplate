import theme from "@/theme";
import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import { RadioButtonProps, OptionProps } from "./interface";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  onChange = () => {},
  className,
  name = "radio-button",
}) => {
  const initialValue = options.find((item) => item.checked) || options[0];
  const [selected, setValue] = useState<OptionProps>(initialValue);
  const [isClicked, setIsClicked] = useState<any>({
    index: null,
    clicked: false,
  });

  const select = (e: MouseEvent<HTMLButtonElement>, option: OptionProps) => {
    setValue(option);
    onChange({ ...option, name });
  };

  const handleMouseDown = (index: number) => {
    setIsClicked({ index, clicked: true });
  };

  const handleMouseUp = () => {
    setIsClicked({ index: null, clicked: false });
  };

  const handleMouseLeave = () => {
    setIsClicked({ index: null, clicked: false });
  };

  return (
    <Wrapper className={className}>
      <div className="content">
        {options.map((option, index) => (
          <Tab
            type="button"
            key={option.value}
            $active={option.value === selected.value}
            disabled={option.disabled}
            onClick={(e) => select(e, option)}
            className={`${
              isClicked.index == index && isClicked.clicked ? "clicked" : ""
            }`}
            onMouseDown={() => handleMouseDown(index)}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <span>{option.label}</span>
          </Tab>
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
    display: flex;
  }
`;

interface TabProps {
  $active: boolean;
}

const Tab = styled.button<TabProps>`
  width: 100%;
  height: 45px;
  font-size: ${theme.font.size.tiny};
  background-color: ${(props) =>
    props.$active ? theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.$active ? theme.colors.white : theme.colors.black};
  padding: 5px 10px;
  cursor: pointer;
  border: 2px solid
    ${(props) =>
      props.$active ? theme.colors.primary : theme.colors.lightGrey};
  border-radius: ${theme.extra.radiusBig};
  text-align: center;
  margin: 5px;
  transition: all ${theme.extra.transition};
  &:disabled {
    color: ${theme.colors.greyIcon};
    cursor: not-allowed;
  }
  &.clicked {
    transition: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}60;
  }
  &:hover {
    color: ${theme.colors.white};
    background: ${theme.colors.primaryDark};
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
  }
`;
