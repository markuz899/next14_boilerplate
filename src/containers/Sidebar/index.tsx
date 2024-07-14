import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { MenuLeftProps, MenuProps } from "./interface";
import { CDN_PATH, navItems } from "@/utils/constants";
import { Icon } from "@/components";
import theme from "@/theme";
import Link from "next/link";

const Menu: React.FC<MenuProps> = ({
  state,
  setState,
  isMobile,
  toggleTheme,
  global,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    setIsMenuOpen(state);
  }, [state]);

  const toggle = () => {
    setState(!isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const renderHead = () => (
    <HeadRight onClick={toggle}>
      <div className="agency-logo">
        {global?.agency?.logo?.path && (
          <img
            src={`${CDN_PATH}/${global?.agency?.logo?.path}`}
            alt="Logo svg di sgasgas"
            width={200}
            height={100}
          />
        )}
      </div>
      <Icon className="close-icon" name="close" />
    </HeadRight>
  );

  const renderMenu = () => (
    <List>
      {navItems?.map((item) => {
        return (
          <Link legacyBehavior key={item?.path} href={item?.path}>
            <a className={router.asPath == item?.path ? "active" : ""}>
              <p>{item?.text}</p>
            </a>
          </Link>
        );
      })}
      <Link legacyBehavior href={global.isAuth ? "/wishlist" : "/login"}>
        <a className={path === "/wishlist" ? "active" : ""}>
          <p>Wishlist</p>
        </a>
      </Link>
      <Link legacyBehavior href={global.isAuth ? "/profilo" : "/login"}>
        <a className={path === "/profilo" ? "active" : ""}>
          <p>Profilo</p>
        </a>
      </Link>
    </List>
  );

  return (
    <MenuLeft $wide={isMenuOpen} $isMobile={isMobile}>
      <div className="padder">
        {renderHead()}
        {renderMenu()}
      </div>
    </MenuLeft>
  );
};

export default React.memo(Menu);

const HeadRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-bottom: 1px solid ${theme.colors.borderComponent};
  padding-bottom: ${theme.spaces.space4};
  cursor: pointer;
  .agency-logo {
    img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
    }
  }
  .close-icon {
    position: absolute;
    right: ${theme.spaces.space4};
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .agency-logo {
      img {
        width: 50px;
      }
    }
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: ${theme.zIndex.zIndex2};
  transition: all 0.5s cubic-bezier(0.86, 0, 0.57, 1);
  padding: 0;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.div`
  min-width: 280px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin-top: ${theme.spaces.space2};
  a {
    transition: all 0.4s;
    display: flex;
    padding: ${theme.spaces.space4} 0;
    text-decoration: none;
    color: ${theme.colors.greyIcon};
    text-transform: uppercase;
    p {
      color: ${theme.colors.navbarText};
    }
    div {
      white-space: nowrap;
    }
    &.bordered {
      border-top: 1px solid ${theme.colors.borderComponent};
      border-bottom: 1px solid ${theme.colors.borderComponent};
      padding: ${theme.spaces.space6} 0px;
      margin: ${theme.spaces.space3} 0;
      &:hover {
        border-top: 1px solid ${theme.colors.borderComponent}!important;
        border-bottom: 1px solid ${theme.colors.borderComponent}!important;
      }
    }
    &.active {
      color: ${theme.colors.white};
      p {
        width: fit-content;
        position: relative;
        font-weight: bold;
        &:before {
          content: " ";
          position: absolute;
          bottom: -${theme.spaces.space1};
          width: 100%;
          height: 2px;
          background: rgb(0, 173, 181);
          background: linear-gradient(
            90deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.success} 100%
          );
        }
      }
    }
    &:hover {
      color: ${theme.colors.white};
      p {
        width: fit-content;
        position: relative;
        font-weight: bold;
        &:before {
          content: " ";
          position: absolute;
          bottom: -${theme.spaces.space1};
          width: 100%;
          height: 2px;
          background: rgb(0, 173, 181);
          background: linear-gradient(
            90deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.success} 100%
          );
        }
      }
    }
  }
  .toggle {
    margin-top: ${theme.spaces.space2};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MenuLeft = styled(Container)<{ $wide: boolean; $isMobile: boolean }>`
  ${(props) => (props.$isMobile ? mobile : desktop)};
  background: ${theme.colors.navbar};
  .padder {
    padding: 20px;
  }
`;

const desktop = css<MenuLeftProps>`
  width: ${(props) => (props.$wide ? "320px" : "0")};
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
`;

const mobile = css<MenuLeftProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  top: ${(props) => (props.$wide ? "0" : "calc(-320vw)")};
  overflow-x: hidden;
  overflow-y: hidden;
`;
