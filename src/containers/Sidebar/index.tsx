import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { MenuLeftProps, MenuProps } from "./interface";
import { CDN_PATH, mokCategories, navItems } from "@/utils/constants";
import { Icon, Select } from "@/components";
import theme from "@/theme";
import Link from "next/link";
import { useAuth } from "@/context";

const Menu: React.FC<MenuProps> = ({
  state,
  setState,
  isMobile,
  toggleTheme,
  global,
}) => {
  const { pwa, handleSelectChange, authentication } = global;
  const { isAuth } = authentication;
  const { logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const { isInstalled, canInstall, handleInstallPrompt } = pwa;

  useEffect(() => {
    setIsMenuOpen(state);
  }, [state]);

  const toggle = () => {
    setState(!isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const renderHead = () => (
    <Head>
      <div className="w-100">
        <div className="agency">
          <Icon
            name="logo"
            size={theme.spaces.space8}
            margin="0 10px 0 0"
            color={theme.colors.primary}
          />{" "}
        </div>
        <div onClick={toggle}>
          <Icon name="close" color={theme.colors.dark} />
        </div>
      </div>
    </Head>
  );

  const renderMenu = () => (
    <List>
      {/* <div className="content-input">
        <Select
          rounded
          clearable
          enableInput
          name="search"
          showArrow={false}
          onChange={handleSelectChange}
          iconBefore="search"
          placeholder="Di cosa hai bisogno?"
          options={mokCategories}
        />
      </div> */}
      <div className="content-menu">
        {navItems?.map((item) => {
          if (item.shield && !isAuth) {
            return null;
          }
          return (
            <Link legacyBehavior key={item?.path} href={item?.path}>
              <a className={router.asPath == item?.path ? "active" : ""}>
                <p>{item?.text}</p>
              </a>
            </Link>
          );
        })}
        <div className="divider"></div>

        <Link legacyBehavior href={isAuth ? "/profile/info" : "/login"}>
          <a
            className={
              path.includes("/profile/info") || path.includes("/profile/orders")
                ? "active"
                : ""
            }
          >
            <p>{isAuth ? "Profile" : "Login"}</p>
          </a>
        </Link>
      </div>
    </List>
  );

  const renderFooter = () => (
    <Footer>
      <div className="w-100">
        {global?.isAuth && (
          <div className="item" onClick={logout}>
            <p>LOGOUT</p>
          </div>
        )}
        {!isInstalled && canInstall && (
          <div className="install-prompt" onClick={handleInstallPrompt}>
            <p>Install pwa</p>
            <Icon
              name="download"
              color={theme.colors.white}
              margin="0 0 0 10px"
              size={theme.spaces.space3}
            />
          </div>
        )}
      </div>
    </Footer>
  );

  return (
    <MenuLeft $wide={isMenuOpen} $isMobile={isMobile}>
      <div className="padder">
        {/* {isMobile && renderHead()} */}
        {renderMenu()}
        {renderFooter()}
      </div>
    </MenuLeft>
  );
};

export default React.memo(Menu);

const Head = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  .w-100 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spaces.space4};
    .agency {
      display: flex;
      align-items: center;
    }
  }
  .info-credits {
    color: ${theme.colors.lightGrey};
    font-size: ${theme.font.size.small};
    &:hover {
      .credits {
        color: inherit;
      }
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  .w-100 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spaces.space4};
    select {
      user-select: none;
      outline: none;
      background: transparent;
      color: ${({ theme }) => theme.text};
      height: 30px;
      margin: 0 5px;
    }
    .install-prompt {
      display: flex;
      align-items: center;
    }
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  z-index: 2101;
  transition: all 0.5s cubic-bezier(0.86, 0, 0.57, 1);
  padding: 0;
  height: 100svh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const List = styled.div`
  min-width: 280px;
  height: 100svh;
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
      color: ${theme.colors.primary};
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
          background: ${theme.colors.primary};
          background: linear-gradient(
            90deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.error} 100%
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
          background: ${theme.colors.primary};
          background: linear-gradient(
            90deg,
            ${theme.colors.primary} 0%,
            ${theme.colors.error} 100%
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
  .content-menu {
    padding: ${theme.spaces.space4};
    .divider {
      height: 2px;
      background: ${theme.colors.primaryLight};
      width: 100%;
    }
  }
`;

const MenuLeft = styled(Container)<{ $wide: boolean; $isMobile: boolean }>`
  ${(props) => (props.$isMobile ? mobile : desktop)};
  background: ${theme.colors.sidebar};
  .padder {
    padding: 20px;
    height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const desktop = css<MenuLeftProps>`
  width: ${(props) => (props.$wide ? "320px" : "0")};
  position: fixed;
  top: 61px;
  overflow-x: hidden;
  overflow-y: hidden;
  border-right: 1px solid ${theme.colors.greyIcon};
`;

const mobile = css<MenuLeftProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  bottom: ${(props) => (props.$wide ? "-61px" : "calc(-320vw)")};
  overflow-x: hidden;
  overflow-y: hidden;
`;
