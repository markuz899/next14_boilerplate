import styled, { css } from "styled-components";
import theme from "../../theme";
import { StyledButtonProps } from "./interface";

const { colors, font, height, spaces, extra } = theme;

export const KIND = {
  primary: css`
    background: ${colors.primary};
    color: ${colors.white};
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
    border: 1px solid ${colors.success};
    &:hover {
      background: ${colors.lightSuccess};
    }
    svg {
      fill: ${colors.white};
    }
  `,
  inverse: css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
    svg {
      fill: ${colors.primary};
    }
    &:hover {
      color: ${theme.colors.white};
      background: ${colors.primary};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${colors.dark};
    border: 1px solid ${colors.grey};
    &:hover {
      border: 1px solid ${colors.darkGrey};
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
      color: ${colors.primaryHover};
    }
    svg {
      fill: ${colors.primary};
    }
  `,
  action: css`
    background: ${colors.white};
    color: ${colors.primary};
    border: 1px solid ${colors.greyIcon};
    transition: ${extra.transition};
    svg {
      color: ${colors.primary};
    }
    &:hover {
      border: 1px solid ${colors.primary};
    }
  `,
  error: css`
    background: ${colors.error};
    color: ${colors.white};
    border: 1px solid ${colors.error};
    &:hover {
      background: ${colors.errorLight};
    }
    svg {
      color: ${colors.white};
    }
  `,
  warning: css`
    background: ${colors.warning};
    color: ${colors.white};
    border: 1px solid ${colors.warning};
    &:hover {
      background: ${colors.warningLight};
    }
    svg {
      color: ${colors.white};
    }
  `,
  ligth: css`
    background: ${colors.primaryLight};
    color: ${colors.white};
    border: 1px solid ${colors.primaryLight};
    &:hover {
      background: ${colors.primaryLight};
    }
    svg {
      color: ${colors.white};
    }
  `,
  ghostPrimary: css`
    background: transparent;
    color: ${colors.dark};
    border: 1px solid ${colors.greyIcon};
    &:hover {
      /* border: 1px solid ${colors.darkGrey}; */
    }
    svg {
      fill: ${colors.primary};
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
  width: ${(props) => props.fluid && "100%"};
  cursor: pointer;
  transition: all ${extra.transition};
  ${(props) => props.reverse && `flex-direction: row-reverse;`};
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
      props.reverse
        ? `0 0 0 1rem;`
        : `0 ${props.round || !props.hasLabel ? "0" : "1rem"} 0 0;`};
  }
  ${(props) =>
    props.round
      ? `border-radius:50%;`
      : `
    border-radius: 8px;
    `};
  padding: 0 ${(props) => (props.hasLabel ? spaces.space4 : "0")};
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
