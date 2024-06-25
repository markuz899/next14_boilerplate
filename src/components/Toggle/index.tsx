import React from "react";
import theme from "@/theme";
import styled from "styled-components";
import { ToggleProps } from "./interface";
import PropTypes from "prop-types";

const Toggle: React.FC<ToggleProps> = ({
  name,
  checked,
  onChange,
  onClick,
  className,
  colorBg = theme.colors.black,
  label,
}) => {
  return (
    <Wrapper className={className}>
      <Slider>
        <SliderInput
          type="checkbox"
          name={name}
          $colorBg={colorBg}
          checked={checked}
          onChange={(e) => onChange && onChange(e.target.checked)}
          onClick={onClick}
        />
        <SliderSpan className="sliderBg" />
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

const Slider = styled.label`
  position: relative;
  display: inline-block;
  width: ${theme.spaces.space7};
  height: ${theme.spaces.space4};

  > input {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const SliderInput = styled.input<{ $colorBg?: string }>`
  display: none;
  &:focus + .sliderBg {
    box-shadow: 0 0 1px #2196f3;
  }
  &:checked + .sliderBg {
    background-color: ${(props) => props.$colorBg};
    &:before {
      transform: translateX(${theme.spaces.space3});
      background-color: ${theme.colors.white};
    }
  }
`;

const SliderSpan = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.error};
  transition: 0.4s;
  border-radius: ${theme.spaces.space2};
  opacity: 1;
  &:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 15px;
    left: 3px;
    bottom: 3px;
    background-color: ${theme.colors.white};
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Label = styled.p`
  margin-left: ${theme.spaces.space2};
  color: ${theme.colors.white};
  font-size: ${theme.font.size.tiny};
`;

export default Toggle;
