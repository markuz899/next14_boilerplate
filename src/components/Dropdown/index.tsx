import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import theme from "@/theme";
import { fadeIn, fadeOut } from "@/theme/styled";
import { DropdownProps } from "./interface";

const Dropdown: React.FC<DropdownProps> = ({
  renderTarget,
  renderDropdown,
  showArrow = true,
  width = 200,
  fluid = true,
  onClose = () => {},
  includeTarget = false,
  includeIcon = false,
  leftPosition = -15,
  topPosition,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<React.CSSProperties>({});
  const target = useRef<HTMLDivElement | any>(null);
  const dropdown = useRef<HTMLDivElement | any>(null);

  useEffect(() => {
    setDropdownPosition();
    // eslint-disable-next-line
  }, []);

  const setDropdownPosition = () => {
    if (target.current && dropdown.current) {
      const rect = target.current.getBoundingClientRect();
      const maxWidth = target.current.firstChild?.getBoundingClientRect().width;
      const p: React.CSSProperties = {
        left: leftPosition || 0,
        right: undefined,
        maxWidth,
      };
      if (topPosition) p.top = topPosition;
      if (rect.x + 300 > window.innerWidth) {
        p.left = leftPosition || 0;
        p.right = undefined;
      }
      if (rect.bottom + 100 > window.innerHeight) {
        p.bottom = 30;
      }
      setPosition(p);
    }
  };

  const show = () => {
    setDropdownPosition();
    if (!visible) {
      setVisible(true);
      document.addEventListener("click", hide);
      window.addEventListener("blur", blur);
    }
  };

  const blur = () => {
    setVisible(false);
    document.removeEventListener("click", hide);
    window.removeEventListener("blur", blur);
    onClose();
  };

  const hide = (e: MouseEvent) => {
    if (includeIcon) {
      if (
        (e.target as HTMLElement).tagName === "svg" ||
        (e.target as HTMLElement).tagName === "path"
      )
        return;
    }
    if (dropdown.current && !dropdown.current.contains(e.target as Node)) {
      if (includeTarget && target.current?.contains(e.target as Node)) return;
      setVisible(false);
    }
    if (!dropdown.current) {
      document.removeEventListener("click", hide);
      window.removeEventListener("blur", blur);
    }
    onClose();
  };

  const close = () => {
    setVisible(false);
    onClose();
    document.removeEventListener("click", hide);
    window.removeEventListener("blur", blur);
  };

  return (
    <Box className={className} $fluid={fluid} ref={target}>
      <div className="target">{renderTarget({ show, close, visible })}</div>
      {renderDropdown && (
        <RenderDrop $visible={visible} $fluid={fluid}>
          {showArrow && <Arrow top={topPosition} />}
          <Drop ref={dropdown} position={position} size={width} $fluid={fluid}>
            {renderDropdown({ show, close, visible })}
          </Drop>
        </RenderDrop>
      )}
    </Box>
  );
};

export default React.memo(Dropdown);

const RenderDrop = styled.div<{ $visible: boolean; $fluid: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.$visible ? "visible" : "hidden")};
  animation: ${(props) => (props.$visible ? fadeIn : fadeOut)} 300ms linear;
  transition: visibility 300ms linear;
  z-index: 1090;
  ${(props) => (props.$fluid ? "width: 100%" : "width: fit-content")};
  height: 100%;
`;

const Box = styled.div<{ $fluid: boolean }>`
  position: relative;
  ${(props) => (props.$fluid ? "width: 100%" : "width: fit-content")};
  .target {
    cursor: pointer;
  }
`;

const Drop = styled.div<{
  position: React.CSSProperties;
  size: number;
  $fluid: boolean;
}>`
  border-radius: ${theme.extra.radiusBig};
  position: absolute;
  box-shadow: 0px 2px 4px #393e4629;
  background: white;
  margin: 15px 0;
  font-size: 12px;
  min-width: 100%;
  ${(props) => props.$fluid && "width: 100%;"}
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Arrow = styled.div<{ top?: number }>`
  box-sizing: border-box;
  position: absolute;
  bottom: ${(props) => (props.top ? `${-18 - props.top}px` : "10px")};
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  transform: rotate(225deg);
  background: ${theme.colors.white};
  border-width: 1px;
  border-style: solid;
  border-color: transparent ${(props) => props.theme.body}
    ${(props) => props.theme.body} transparent;
  z-index: 800;
`;
