import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Icon from "../Icon";
import { TabsProps } from "./interface";
import theme from "@/theme";

const Tabs: React.FC<TabsProps> = ({
  title = "Titolo tabs",
  colorText,
  renderContent,
  isOpen = false,
  showIcon = true,
  noMargin = false,
  noPadding = false,
  iconPosition = "right",
}) => {
  const [state, setState] = useState(isOpen);

  useEffect(() => {
    setState(isOpen);
  }, [isOpen]);

  const toggle = () => {
    setState(!state);
  };

  return (
    <RenderTab
      $isOpen={state}
      $colorText={colorText}
      $noMargin={noMargin}
      $noPadding={noPadding}
    >
      <div className="content-title" onClick={toggle}>
        {showIcon && iconPosition === "left" && (
          <div className="svg">
            <Icon
              name={state ? "less" : "plus"}
              color={theme.colors.primary}
              size={theme.spaces.space4}
            />
          </div>
        )}
        <h2>{title}</h2>
        {showIcon && iconPosition === "right" && (
          <div className="svg">
            <Icon
              name={state ? "less" : "plus"}
              color={theme.colors.primary}
              size={theme.spaces.space4}
            />
          </div>
        )}
      </div>
      <div className="content-tab">{renderContent && renderContent()}</div>
    </RenderTab>
  );
};

export default React.memo(Tabs);

interface RenderTabProps {
  $isOpen: boolean;
  $colorText?: string;
  $noMargin: boolean;
  $noPadding: boolean;
}

const RenderTab = styled.div<RenderTabProps>`
  @keyframes slideDown {
    from {
      transform: translateY(0%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(0%);
      opacity: 0;
    }
  }
  width: 100%;
  background: ${(p) => (p.$noPadding ? "transparent" : p.theme.bodyLight)};
  padding: ${(p) => (p.$noPadding ? "" : theme.spaces.space4)};
  .content-title {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: ${(p) =>
      p.$noMargin ? 0 : !p.$isOpen ? 0 : `0 0 ${theme.spaces.space3} 0`};
    h2 {
      margin: 0;
      font-size: ${theme.font.size.large};
      color: ${(p) => (p.$colorText ? p.$colorText : p.theme.text)};
    }
    .svg {
      cursor: pointer;
    }
  }
  .content-tab {
    transition: max-height 0.3s ease-out;
    display: ${(p) => (p.$isOpen ? "block" : "none")};
    ${(p) => (p.$isOpen ? "animation: slideDown 1s" : "animation: slideUp 1s")}
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .content-title {
      margin: ${theme.spaces.space3} 0;
    }
  }
`;
