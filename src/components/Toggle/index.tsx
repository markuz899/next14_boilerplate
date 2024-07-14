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
  colorBg = theme.colors.primary,
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
        <SliderSpan className="sliderBg" $colorBg={colorBg} />
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
  width: ${theme.spaces.space10};
  height: ${theme.spaces.space5};
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
      transform: translateX(24px);
      background-color: ${theme.colors.white};
    }
  }
`;

const SliderSpan = styled.span<{ $colorBg?: string }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${theme.colors.borderComponent};
  border: 2px solid transparent;
  transition: 0.4s;
  border-radius: ${theme.spaces.space3};
  opacity: 1;
  &:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 3px;
    bottom: 2px;
    background-color: ${theme.colors.white};
    transition: 0.4s;
    border-radius: 50%;
  }
  &:hover {
    border-color: ${({ $colorBg }) => $colorBg};
  }
`;

const Label = styled.p`
  margin-left: ${theme.spaces.space2};
  color: ${theme.colors.white};
  font-size: ${theme.font.size.tiny};
`;

export default Toggle;
