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
    svg {
      fill: ${colors.white};
    }
  `,
  success: css`
    background: ${colors.success};
    color: ${colors.white};
    border: 2px solid ${colors.success};
    &:hover {
      background: ${colors.successDark};
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
    svg {
      color: ${colors.white};
    }
  `,
  warning: css`
    background: ${colors.warning};
    color: ${colors.white};
    border: 2px solid ${colors.warning};
    &:hover {
      background: ${colors.warningDark};
    }
    svg {
      color: ${colors.white};
    }
  `,
  "inverse-primary": css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
    svg {
      fill: ${colors.primary};
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.primary};
    }
  `,
  "inverse-success": css`
    background: ${colors.white};
    color: ${colors.success};
    border: 2px solid ${colors.success};
    svg {
      fill: ${colors.success};
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.success};
    }
  `,
  "inverse-warning": css`
    background: ${colors.white};
    color: ${colors.warning};
    border: 2px solid ${colors.warning};
    svg {
      fill: ${colors.warning};
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.warning};
    }
  `,
  "inverse-error": css`
    background: ${colors.white};
    color: ${colors.error};
    border: 2px solid ${colors.error};
    svg {
      fill: ${colors.error};
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.error};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.dark};
    border: 2px solid ${colors.grey};
    &:hover {
      border: 2px solid ${colors.darkGrey};
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
  action: css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 2px solid ${colors.greyIcon};
    transition: ${extra.transition};
    svg {
      color: ${colors.primary};
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
      props.reverse ? `0 0 0 1rem;` : `0 ${props.round ? "0" : "1rem"} 0 0;`};
  }
  ${(props) =>
    props.round
      ? `border-radius:50%;`
      : `
    border-radius: 8px;
    `};
  padding: 0 ${spaces.space4};
  &:disabled {
    background: ${colors.greyIcon};
    color: ${colors.white};
    border: 1px solid ${colors.greyIcon};
    cursor: not-allowed;
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
