import React, { useEffect, useState } from "react";
import theme from "@/theme";
import styled from "styled-components";
import { ToggleProps } from "./interface";
import PropTypes from "prop-types";
import Icon from "../Icon";

const Toggle: React.FC<ToggleProps> = ({
  name,
  checked,
  onChange,
  onClick,
  className,
  colorBg = theme.colors.primary,
  label,
  disabled = false,
}) => {
  const [state, setState] = useState(checked || false);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setState(checked || false);
  }, [checked]);

  const handleChange = (e: any) => {
    const data: any = { name, value: e.target.checked };
    setState(data.value);
    onChange && onChange(data);
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  return (
    <Wrapper className={className}>
      <Slider
        $disabled={disabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <SliderInput
          $disabled={disabled}
          type="checkbox"
          name={name}
          $colorBg={colorBg}
          checked={state}
          onChange={handleChange}
          onClick={onClick}
          disabled={disabled}
        />
        <SliderSpan
          className={`sliderBg ${isClicked ? "clicked" : ""}`}
          $disabled={disabled}
          $colorBg={colorBg}
          $checked={state}
        >
          <span>
            {/* {state ? (
              <Icon
                name="check"
                color={theme.colors.success}
                margin="4px 0 0 10px"
              />
            ) : (
              <Icon
                name="close"
                color={theme.colors.error}
                size={theme.spaces.space2}
                margin="0px 9px 0 0"
              />
            )} */}
          </span>
        </SliderSpan>
      </Slider>
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  p {
    margin-left: ${theme.spaces.space2};
    color: ${theme.colors.white};
    font-size: ${theme.font.size.tiny};
  }
`;

const Slider = styled.label<{ $disabled: boolean }>`
  position: relative;
  display: inline-block;
  width: ${theme.spaces.space10};
  height: ${theme.spaces.space5};
  > input {
    opacity: 0;
    width: 0;
    height: 0;
    &:disabled {
      background: ${theme.colors.greyIcon};
    }
  }
`;

const SliderInput = styled.input<{ $colorBg?: string; $disabled: boolean }>`
  display: none;
  &:focus + .sliderBg {
    box-shadow: 0 0 1px #2196f3;
  }
  &:checked + .sliderBg {
    background-color: ${(props) => props.$colorBg};
    border: 2px solid ${theme.colors.primaryDark};
    &:before {
      transform: translateX(25px);
      background-color: ${theme.colors.white};
    }
  }
`;

const SliderSpan = styled.span<{
  $colorBg?: string;
  $checked: boolean;
  $disabled: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(p) => (p.$checked ? "flex-start" : "flex-end")};
  position: absolute;
  cursor: ${(p) => (p.$disabled ? "no-drop" : "pointer")};
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.greyIcon};
  transition: 0.4s;
  border-radius: ${theme.spaces.space3};
  border: 2px solid
    ${(p) => (p.$disabled ? theme.colors.greyIcon : theme.colors.greyIcon)};
  opacity: 1;
  &:before {
    position: absolute;
    content: "";
    height: 19px;
    width: 19px;
    left: 1px;
    bottom: 1px;
    background-color: ${theme.colors.white};
    transition: 0.4s;
    border-radius: 50%;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
  }
  &:hover {
    border-color: ${({ $colorBg, $disabled }) =>
      $disabled ? "inherit" : theme.colors.primaryDark};
  }
  &.clicked {
    transition: none;
    box-shadow: 0 0 0 3px ${theme.colors.primary}60;
  }
`;

const Label = styled.p`
  margin-left: ${theme.spaces.space2};
  color: ${theme.colors.white};
  font-size: ${theme.font.size.tiny};
`;

export default Toggle;
