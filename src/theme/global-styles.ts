import { createGlobalStyle } from "styled-components";
import theme from ".";

export const GlobalStyle = createGlobalStyle`
  :root{
    --toastify-color-dark: ${theme.colors.dark};
    --toastify-toast-min-height: 50px;
  }
  @keyframes scroll-text {
    0% {
      transform: translateX(0%);
    }
    90% {
      transform: translateX(-100%);
    }
    95% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(0%);
    }
  }
  html,
  body {
    margin: 0;
    background: ${({ theme }) => theme.bg};
    color: ${({ theme }) => theme.text};
    height: 100%;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: ${theme.font.size.normal};
    -webkit-tap-highlight-color: transparent;
  }
  #__next{
    width: 100%;
    height: 100%;
  }
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    color: ${({ theme }) => theme.text};
  }
  h1 {
    font-weight: ${theme.font.weight.bold};
    color: ${({ theme }) => theme.text};
    font-size: ${theme.font.size.large};
  }
  h2 {
    font-weight: ${theme.font.weight.regular};
    color: ${({ theme }) => theme.text};
    font-size: ${theme.font.size.large};
  }
  a {
    text-decoration: none;
    &:hover {
      color: ${theme.colors.lightGrey};
    }
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0;
    line-height: 1.1;
    color: ${({ theme }) => theme.text};
  }
  b, strong {
    ${theme.font.weight.bold}
  }
  button {
    &:focus {
      outline: none;
    }
  }
  .truncate {
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .truncate_mini {
    max-width: 140px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .truncate_two{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    width: 250px;
  }
  .truncate_two_mini{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    max-width: 230px;
  }
  .truncate_five{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    width: 250px;
  }
  .truncate_five_mini{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
    max-width: 230px;
  }
  .cursor-pointer{
    cursor: pointer;
  }
  .line-height-1-5{
    line-height: 1.5;
  }
  .text-center{
    text-align: center;
  }
  .text-uppercase{
    text-transform: uppercase;
  }
  .bold {
    font-weight: bold;
  }
  .d-flex{
    display: flex;
    align-items: center;
  }
  .text-gray{
    color: ${theme.colors.lightGrey}!important;
  }
  .text-dark{
    color: ${theme.colors.black}!important;
  }
  .text-white{
    color: ${theme.colors.white}!important;
  }
  .text-primary{
    color: ${theme.colors.primary}!important;
  }
  .text-error{
    color: ${theme.colors.error}!important;
  }
  .text-success{
    color: ${theme.colors.success}!important;
  }
  .text-warning{
    color: ${theme.colors.warning}!important;
  }
  .text-blue{
    color: ${theme.colors.secondary}!important;
  }
  .text-underlined{
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover{
      color: ${theme.colors.secondary}!important;
    }
  }
  .color-svg-primary{
    fill: ${theme.colors.primary}!important;
  }

  .mlr-20 {
    margin: 0 20px!important;
  }
  .mt-0{
    margin-top: 0;
  }
  .mb-0{
    margin-bottom: 0!important;
  }
  .ml-0{
    margin-left: 0;
  }
  .mr-0{
    margin-right: 0;
  }
  .mt-10{
    margin-top: 10px;
  }
  .mb-10{
    margin-bottom: 10px;
  }
  .ml-10{
    margin-left: 10px;
  }
  .mr-10{
    margin-right: 10px;
  }

  .pt-40{
    padding-top: 40px!important;
  }
  .pt-0{
    padding-top: 0;
  }
  .pb-0{
    padding-bottom: 0;
  }
  .pl-0{
    padding-left: 0;
  }
  .pr-0{
    padding-right: 0;
  }

  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    h2{
      font-size: ${theme.font.size.normal}
    }
    input[type="text"]{
      font-size: 16px;
    }
    .pt-40{
      padding-top: 0px!important;
    }
  }
`;

export const lightTheme = {
  bg: theme.colors.greyIcon,
  navbar: theme.colors.navbar,
  body: theme.colors.white,
  text: theme.colors.dark,
  cardBody: theme.colors.greyIcon,
  cardText: theme.colors.dark,
  cardTextHover: theme.colors.lightDark,
  badgeBody: theme.colors.greyIcon,
  badgeText: theme.colors.dark,
  shadow: theme.extra.shadowDark,
  bodyLight: theme.colors.whiteLight,
};

export const darkTheme = {
  bg: theme.colors.dark,
  navbar: theme.colors.navbar,
  body: theme.colors.dark,
  text: theme.colors.white,
  cardBody: theme.colors.dark,
  cardText: theme.colors.white,
  cardTextHover: theme.colors.lightGrey,
  badgeBody: theme.colors.cardLight,
  badgeText: theme.colors.dark,
  shadow: theme.extra.shadowLight,
  bodyLight: theme.colors.bodyLight,
};
