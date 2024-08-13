import React, { useState, Children, ReactNode } from "react";
import styled, { css } from "styled-components";
import theme, { BASE_COLOR } from "@/theme";
import { BannerProps } from "./interface";
import { colorBasedOnBg } from "@/utils/utils";

const { colors } = theme;

const availableKinds = ["warning", "success", "error", "info"] as const;

const Banner: React.FC<BannerProps> = ({
  title = "Banner info",
  content = "",
  kind = "success",
  active = true,
  children,
  className,
}) => {
  const inner = children ? Children.toArray(children) : content;
  let colorKind = kind;
  if (!availableKinds.includes(kind)) colorKind = "info";
  const [visible, setVisible] = useState(active);

  const handleClick = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <Msg className={className} $kind={colorKind} $active={visible}>
        <p className="title">
          {title}
          <span
            className="closebtn"
            tabIndex={-1}
            role="button"
            onClick={handleClick}
            onKeyPress={handleClick}
          >
            &times;
          </span>
        </p>
        <p className="content">{inner}</p>
      </Msg>
    );
  }
  return null;
};

export default Banner;

const COLORS = {
  warning: css`
    background: ${colors.warningDark};
    border: 2px solid ${colors.warning};
  `,
  success: css`
    background: ${colors.successDark};
    border: 2px solid ${colors.success};
  `,
  error: css`
    background: ${colors.errorDark};
    border: 2px solid ${colors.error};
    .title {
      color: ${colors.white}!important;
    }
  `,
  info: css`
    background: ${colors.primaryDark};
    border: 2px solid ${colors.primary};
    .title {
      color: ${colors.white}!important;
    }
  `,
};

interface MsgProps {
  $kind: "warning" | "success" | "error" | "info";
  $active: boolean;
}

const Msg = styled.div<MsgProps>`
  ${(props) => COLORS[props.$kind]};
  max-width: 100%;
  height: auto;
  display: block;
  align-items: center;
  border-radius: 3px;
  padding: ${theme.spaces.space2};
  margin-top: ${theme.spaces.space2};
  margin-bottom: ${theme.spaces.space2};
  .title {
    color: ${(props) =>
      colorBasedOnBg(BASE_COLOR[props.$kind] || theme.colors.white)};
    font-size: ${theme.font.size.minor};
    font-family: Helvetica;
    font-weight: ${theme.font.weight.bold};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    text-align: left;
    .closebtn {
      margin-top: -3px;
      font-size: 26px;
      font-weight: ${theme.font.weight.regular};
      line-height: 16px;
      float: right;
      transition: 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .content {
    color: ${(props) =>
      colorBasedOnBg(BASE_COLOR[props.$kind] || theme.colors.white)};
    font-size: ${theme.font.size.tiny};
    font-family: Helvetica;
    line-height: 1.2;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .title {
      font-size: ${theme.font.size.small};
    }
  }
`;
