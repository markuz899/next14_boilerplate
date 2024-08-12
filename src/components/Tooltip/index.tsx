import React, { Children, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { TooltipProps } from "./interface";
import theme from "@/theme";

/* eslint-disable */
let ROOT_ID = "root-tooltip";

const Tooltip: React.FC<TooltipProps> & {
  setRoot: (APP_NODE: HTMLElement, id: string) => void;
} = ({ content, children, className, flex = false }) => {
  const target = useRef<HTMLSpanElement>(null);
  const tip = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  const [visible, setState] = useState(false);

  const toggleVisibility = (e: any) => {
    if (
      target.current &&
      !target.current.contains(e.target) &&
      tip?.current &&
      !tip?.current.contains(e.target)
    ) {
      setState(false);
    }
  };

  useEffect(() => {
    if (tip.current && target.current) {
      const rect = target.current.getBoundingClientRect();
      const { innerHeight, innerWidth, scrollY } = window;
      const { width, height } = tip.current.getBoundingClientRect();
      const right = innerWidth - (rect.x + rect.width);

      const isMobile = innerWidth <= 768;

      const position = {
        bottom: `${
          window.screen.availHeight -
          rect.top -
          scrollY -
          (isMobile ? 160 : 110)
        }px`,
        left: `${rect.left + rect.width / 2 - width / 2}px`,
      };

      if (width / 2 > rect.x + rect.width / 2 && width > rect.width) {
        position.left = `${rect.left}px`;
        if (arrow.current) arrow.current.style.left = `${rect.width / 2 - 8}px`;
      }

      if (right < width / 2) {
        position.left = `${
          innerWidth - (innerWidth - rect.x) - width + rect.width
        }px`;
        if (arrow.current)
          arrow.current.style.left = `${width - rect.width / 2 - 8}px`;
      }

      if (rect.y < height) {
        const b =
          window.screen.availHeight -
          rect.top -
          scrollY -
          height -
          rect.height -
          8;
        position.bottom = `${b}px`;
        if (arrow.current) {
          arrow.current.style.bottom = `${height - 8}px`;
          arrow.current.style.transform = "rotate(-135deg)";
        }
      }

      Object.assign(tip.current.style, position);
    }
    window.addEventListener("scroll", toggleVisibility);
    document.addEventListener("click", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      document.removeEventListener("click", toggleVisibility);
    };
  });

  const show = () => {
    setState(true);
  };

  const hide = () => {
    setState(false);
  };

  const renderTooltip = () => {
    const ROOT_NODE = document.getElementById(ROOT_ID);
    return ROOT_NODE
      ? createPortal(
          <Tip ref={tip}>
            {content}
            <Arrow ref={arrow} />
          </Tip>,
          ROOT_NODE
        )
      : null;
  };

  return (
    <>
      <Target
        $flex={flex}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        ref={target}
        className={className}
      >
        {Children.toArray(children)}
      </Target>
      {visible && renderTooltip()}
    </>
  );
};

Tooltip.setRoot = (APP_NODE: HTMLElement, id: string) => {
  ROOT_ID = id;
  let node = document.getElementById(ROOT_ID);
  if (!node) {
    node = document.createElement("div");
    node.setAttribute("id", ROOT_ID);
    APP_NODE.insertAdjacentElement("afterend", node);
  }
};

export default Tooltip;

export const delay = keyframes`
    0% {
        opacity: 0;
    }
    75% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
export const Target = styled.span<{ $flex: boolean }>`
  display: ${(p) => (p.$flex ? "flex" : "inline-block")};
`;
export const Tip = styled.div`
  position: absolute;
  padding: 9px;
  left: -800px;
  animation: 0.3s ${delay} ease;
  font-size: 16px;
  max-height: 150px;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 1000;
`;

const Arrow = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: -6px;
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: transparent #dadada #dadada transparent;
`;
