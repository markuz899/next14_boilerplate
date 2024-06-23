import React from "react";
import styled from "styled-components";
import icons from "./icons";
import { IconProps } from "./interface";

const Icon: React.FC<IconProps> = ({
  name,
  color = "#DADEE1",
  size = "1rem",
  margin = "0",
  className,
  rotate,
}) => {
  const { d, width, group } = icons[name] || icons.default;
  return (
    <Svg
      color={color}
      height={size}
      margin={margin}
      rotate={rotate}
      className={className}
      x="0px"
      y="0px"
      viewBox={`0 0 ${width} 512`}
    >
      {group || <path d={d} />}
    </Svg>
  );
};

export default React.memo(Icon);

const Svg = styled.svg<{
  color?: string;
  size?: string;
  margin?: string;
  rotate?: string;
}>`
  fill: ${(props) => props.color};
  height: ${(props) => props.size};
  margin: ${(props) => props.margin};
  ${(props) => props.rotate && `transform: rotate(${props.rotate}deg)`}
`;
