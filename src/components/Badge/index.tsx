import React from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import theme, { BASE_COLOR } from "@/theme";
import { BadgeProps } from "./interface";
import { colorBasedOnBg } from "@/utils/utils";

const COLOR_ICON = {
  ghost: theme.colors.primary,
  info: theme.colors.white,
  success: theme.colors.white,
  error: theme.colors.white,
  warning: theme.colors.white,
};

const Badge: React.FC<BadgeProps> = ({
  label,
  onClick,
  className,
  iconClose = true,
  kind = "ghost",
}) => {
  const handleClick = () => {
    if (onClick && label) {
      onClick(label);
    }
  };

  return (
    <StyledBadge className={className} $kind={kind}>
      <div className="text">{label}</div>
      {iconClose && (
        <div className="icon" onClick={handleClick}>
          <Icon
            name="close"
            color={COLOR_ICON[kind]}
            margin="0 0 0 25px"
            size={theme.spaces.space3}
          />
        </div>
      )}
    </StyledBadge>
  );
};

export default Badge;

const COLORS = {
  warning: css`
    background: ${theme.colors.warning};
    border: 2px solid ${theme.colors.warningDark};
  `,
  success: css`
    background: ${theme.colors.success};
    border: 2px solid ${theme.colors.successDark};
  `,
  error: css`
    background: ${theme.colors.error};
    border: 2px solid ${theme.colors.errorDark};
    .text {
      color: ${theme.colors.white}!important;
    }
  `,
  info: css`
    background: ${theme.colors.primary};
    border: 2px solid ${theme.colors.primaryDark};
    .text {
      color: ${theme.colors.white}!important;
    }
  `,
  ghost: css`
    background: ${theme.colors.greyIcon};
    border: 2px solid ${theme.colors.lightGrey};
    .text {
      color: ${theme.colors.dark}!important;
    }
  `,
};

interface Props {
  $kind: "warning" | "success" | "error" | "info" | "ghost";
}

const StyledBadge = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.primary};
  padding: ${theme.spaces.space3} ${theme.spaces.space5};
  border: 2px solid ${theme.colors.primary};
  border-radius: 8px;
  text-transform: uppercase;
  margin-bottom: ${theme.spaces.space2};
  ${(props) => COLORS[props.$kind]};
  .text {
    color: ${(props) =>
      colorBasedOnBg(BASE_COLOR[props.$kind] || theme.colors.white)};
    font-size: ${theme.font.size.minor};
    font-weight: bold;
  }
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    white-space: nowrap;
    flex: 1 0 35%;
    padding: 8px;
    margin-bottom: ${theme.spaces.space1};
    .text {
      font-size: ${theme.font.size.small};
    }
  }
`;
