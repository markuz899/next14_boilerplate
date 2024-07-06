import styled, { css, keyframes } from "styled-components";
import theme from ".";

export const setCols = (cols: 1 | 2 | 3 | 4) => {
  const col = {
    1: "100%",
    2: "50%",
    3: "33.33333%",
    4: "25%",
  };
  return col[cols];
};

export const Container = styled.div`
  padding: ${theme.spaces.space4} ${theme.spaces.space12};
  box-sizing: border-box;
  max-width: 1440px;
  min-width: 1440px;
  @media only screen and (max-width: 1440px) {
    max-width: 100%;
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spaces.space6};
    min-width: 100%;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spaces.space1};
    margin: 0;
    min-width: 100%;
  }
`;

export const Content = styled(Container)`
  text-align: center;
  margin: 0 auto;
  h2 {
    font-size: ${theme.font.size.big};
    margin: ${theme.spaces.space4} 0;
  }
  .show-more {
    margin: ${theme.spaces.space8} 0 ${theme.spaces.space12};
  }
  .component-list {
    display: flex;
    flex-flow: row wrap;
    .card {
      flex: 0 0 ${(p) => setCols(3)};
      width: ${(p) => setCols(3)};
      @media only screen and (max-width: ${theme.breakpoints.tablet}) {
        flex: 0 0 50%;
      }
      @media only screen and (max-width: ${theme.breakpoints.mobile}) {
        flex: 0 0 100%;
      }
    }
    .empty-data {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      h2 {
        font-weight: bold;
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    margin: 0;
  }
`;

export const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translate(0px, -30px);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -20px);
  }
  100% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
    transform: translate(0px, 0px);
  }
  50% {
    opacity: 1;
    transform: translate(0px, -20px);
  }
  100% {
    opacity: 0;
    transform: translate(0px, -30px);
  }
`;
