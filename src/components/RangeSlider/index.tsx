import theme from "@/theme";
import React, { useState } from "react";
import styled from "styled-components";

interface RangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  onChange,
}) => {
  const [value, setValue] = useState<number>(defaultValue || min);
  const [style, setStyle] = useState<any>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <SliderContainer>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
      <ValueDisplay>{value}</ValueDisplay>
    </SliderContainer>
  );
};

export default RangeSlider;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;

  input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: ${theme.spaces.space4};
    background: ${theme.colors.greyIcon};
    outline: none;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: ${theme.extra.radiusBig};
    overflow: hidden;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      border-radius: 50px;
      appearance: none;
      width: ${theme.spaces.space4};
      height: ${theme.spaces.space4};
      background: ${theme.colors.primary};
      border: 2px solid ${theme.colors.primaryLight};
      cursor: pointer;
      position: relative;
      box-shadow: -407px 0 0 400px ${theme.colors.primary}60;
    }
    &::-moz-range-thumb {
      background: ${theme.colors.primary};
      cursor: pointer;
    }
    &::-webkit-slider-runnable-track {
      background: ${theme.colors.greyIcon};
      height: ${theme.spaces.space4};
    }
  }
`;

const ValueDisplay = styled.div`
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
`;
