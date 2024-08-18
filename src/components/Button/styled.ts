import styled, { css } from "styled-components";
import theme from "../../theme";
import { StyledButtonProps } from "./interface";

const { colors, font, height, spaces, extra } = theme;

export const KIND = {
  primary: css`
    background: ${colors.primary};
    color: ${colors.white};
    border: 2px solid ${colors.primary};
    &:hover {
      background: ${colors.primaryDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.primary}60;
    }
    svg {
      fill: ${colors.white};
    }
  `,
  success: css`
    background: ${colors.success};
    color: ${colors.dark};
    border: 2px solid ${colors.success};
    &:hover {
      background: ${colors.successDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.success}60;
    }
    svg {
      fill: ${colors.white};
    }
  `,
  error: css`
    background: ${colors.error};
    color: ${colors.white};
    border: 2px solid ${colors.error};
    &:hover {
      background: ${colors.errorDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.error}60;
    }
    svg {
      fill: ${colors.white};
    }
  `,
  warning: css`
    background: ${colors.warning};
    color: ${colors.dark};
    border: 2px solid ${colors.warning};
    &:hover {
      background: ${colors.warningDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.warning}60;
    }
    svg {
      fill: ${colors.white};
    }
  `,
  "inverse-primary": css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    svg {
      fill: ${colors.primary};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.primary}60;
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.primary};
      svg {
        transition: all ${extra.transition};
        fill: ${colors.white};
      }
    }
    &:disabled {
      background: ${colors.white};
      color: ${colors.greyIcon};
      border: 2px solid ${colors.greyIcon};
    }
    &:disabled {
      color: ${theme.colors.dark};
    }
  `,
  "inverse-success": css`
    background: ${colors.white};
    color: ${colors.dark};
    border: 2px solid ${colors.success};
    svg {
      fill: ${colors.success};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.success}60;
    }
    &:hover {
      background: ${colors.success};
      svg {
        transition: all ${extra.transition};
        fill: ${colors.white};
      }
    }
  `,
  "inverse-warning": css`
    background: ${colors.white};
    color: ${colors.dark};
    border: 2px solid ${colors.warning};
    svg {
      fill: ${colors.warning};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.warning}60;
    }
    &:hover {
      color: ${theme.colors.dark};
      background: ${colors.warning};
      svg {
        transition: all ${extra.transition};
        fill: ${colors.white};
      }
    }
  `,
  "inverse-error": css`
    background: ${colors.white};
    color: ${colors.error};
    border: 2px solid ${colors.error};
    svg {
      fill: ${colors.error};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.error}60;
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.error};
      svg {
        transition: all ${extra.transition};
        fill: ${colors.white};
      }
    }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.dark};
    border: 2px solid ${colors.grey};
    &:hover {
      border: 2px solid ${colors.darkGrey};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.grey}60;
    }
    svg {
      fill: ${colors.dark};
    }
  `,
  minimal: css`
    background: transparent;
    color: ${colors.primary};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${colors.primaryDark};
    }
    svg {
      fill: ${colors.primary};
    }
  `,
  "minimal-error": css`
    background: transparent;
    color: ${colors.error};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${colors.errorDark};
    }
    svg {
      fill: ${colors.error};
    }
  `,
  "minimal-warning": css`
    background: transparent;
    color: ${colors.warning};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${colors.warningDark};
    }
    svg {
      fill: ${colors.warning};
    }
  `,
  "minimal-success": css`
    background: transparent;
    color: ${colors.success};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${colors.successDark};
    }
    svg {
      fill: ${colors.success};
    }
  `,
  action: css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 2px solid ${colors.greyIcon};
    transition: ${extra.transition};
    svg {
      color: ${colors.primary};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${colors.primary}60;
    }
    &:hover {
      border: 2px solid ${colors.primary};
    }
  `,
};

/* eslint-disable */
export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0;
  font-size: ${font.size.minor};
  font-weight: ${font.weight.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  min-width: ${(props) => height[props.size]};
  min-height: ${(props) => height[props.size]};
  user-select: none;
  width: ${(props) => props.$fluid && "100%"};
  cursor: pointer;
  transition: all ${extra.transition};
  ${(props) => (props.reverse ? `flex-direction: row-reverse;` : null)};
  .iconAfter {
    width: ${theme.spaces.space2};
    margin-left: ${theme.spaces.space1};
  }
  .iconBefore {
    width: ${theme.spaces.space2};
    margin-right: ${theme.spaces.space1};
  }
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${(props) =>
      props.reverse ? `0 0 0 1rem;` : `0 ${props.$round ? "0" : "1rem"} 0 0;`};
  }
  ${(props) =>
    props.$round
      ? `border-radius:50px;`
      : `
    border-radius: 8px;
    `};
  padding: 0 ${spaces.space4};
  &:disabled {
    background: ${colors.greyIcon};
    color: ${colors.dark};
    border: 1px solid ${colors.greyIcon};
    cursor: not-allowed;
    &:hover {
      background: ${theme.colors.darkGrey};
    }
  }
  .loader {
    display: flex;
    svg {
      width: ${spaces.space8};
      display: inline-block;
    }
  }
  ${(props) => KIND[props.kind]}
`;

export const A = styled(StyledButton).attrs({
  as: "a",
})`
  &.btn {
    color: white;
    &:hover {
      color: white;
    }
  }
`;

export const availableKinds = Object.keys(KIND);
/* eslint-enable */
