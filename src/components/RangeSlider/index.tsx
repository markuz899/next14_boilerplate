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
    width: 100%;
  }
`;

const ValueDisplay = styled.div`
  margin-top: 10px;
  font-size: 1.2em;
  color: #333;
`;
