import theme from "@/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { HeaderProps } from "./interface";
import { Icon, Modal } from "@/components";
import { CDN_PATH, navItems } from "@/utils/constants";

const Header: React.FC<HeaderProps> = ({
  global,
  isSmall,
  state,
  setState,
}) => {
  const router = useRouter();
  const path = router.pathname;

  const toggle = () => {
    setState(!state);
  };

  return (
    <Head $isSmall={isSmall}>
      <MenuContent>
        <div className={`menu-icon ${isSmall ? "isSmall" : "notSmall"}`}>
          {isSmall && (
            <div onClick={toggle}>
              <Icon name="hamburger" />
            </div>
          )}
          <Link href="/">
            <div className="agency">
              <Icon name="404" />
            </div>
          </Link>
        </div>
        {!isSmall && (
          <div className="flex">
            <div className="link">
              <div className="navigator">
                <div className="section-link">
                  {navItems?.map((item) => {
                    return (
                      <Link legacyBehavior key={item?.path} href={item?.path}>
                        <a
                          className={`text-uppercase ${
                            router.asPath === item?.path ? "active" : ""
                          }`}
                        >
                          {item?.text}
                        </a>
                      </Link>
                    );
                  })}
                </div>
                <div className="section-icon">
                  <div className="icon">
                    <Link href={global.isAuth ? "/wishlist" : "/login"}>
                      <div
                        className={`icon-container mr-3 ${
                          path.includes("/wishlist") ? "active" : ""
                        }`}
                      >
                        <Icon
                          name="heart"
                          color={theme.colors.white}
                          size={theme.spaces.space5}
                        />
                      </div>
                    </Link>
                  </div>
                  <div className="icon">
                    <Link href={global.isAuth ? "/profilo" : "/login"}>
                      <div
                        className={`icon-container ${
                          path.includes("/profilo") ? "active" : ""
                        }`}
                      >
                        <Icon
                          name="user"
                          color={theme.colors.white}
                          size={theme.spaces.space5}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </MenuContent>
    </Head>
  );
};

export default React.memo(Header);

const Head = styled.div<{ $isSmall: boolean; isOpen?: boolean }>`
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.zIndex1};
  transition: ${theme.extra.transitionFluid};
  background: ${({ theme }) => theme.navbar};
  left: ${(props) => (props.isOpen ? "270px" : "0")};
  right: 0;
  /* min-width: ${theme.breakpoints.first}; */
  ${(p) =>
    p.$isSmall && `padding: ${theme.spaces.space2} ${theme.spaces.space3};`}
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    padding: ${theme.spaces.space2} ${theme.spaces.space3};
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spaces.space2} ${theme.spaces.space3};
  }
`;
const MenuContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .menu-icon {
    padding: 0 ${theme.spaces.space6};
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${theme.colors.white};
    a {
      margin-left: ${theme.spaces.space2};
      font-size: ${theme.font.size.large};
    }
    .agency {
      display: flex;
      justify-content: space-between;
      align-items: center;
      img {
        width: ${theme.extra.logo};
        max-height: 100%;
        height: 100%;
      }
    }
    &.isSmall {
      padding: 0;
      .agency {
        margin-left: 20px;
        img {
          max-height: fit-content;
          width: fit-content;
        }
      }
    }
  }
  .flex {
    padding: ${theme.spaces.space4} ${theme.spaces.space6};
    display: flex;
    &.d-none {
      display: none;
    }
    .link {
      display: flex;
      align-items: center;
      .navigator {
        display: flex;
        align-items: center;
        .section-link {
          margin-right: 20px;
          font-size: ${theme.font.size.tiny};
          a {
            position: relative;
            margin-left: 30px;
            &:first-child {
              margin-left: 0;
            }
            &:hover {
              &:after {
                content: "";
                display: block;
                position: absolute;
                top: -28px;
                width: 100%;
                height: 4px;
                background: ${theme.colors.error};
                border-radius: ${theme.extra.radiusBig};
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
              }
              &.warning {
                &:after {
                  background: ${theme.colors.warning};
                }
              }
            }
            &.active {
              &:after {
                content: "";
                display: block;
                position: absolute;
                top: -26px;
                width: 100%;
                height: 4px;
                background: ${theme.colors.error};
                border-radius: ${theme.extra.radiusBig};
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
              }
              &.warning {
                &:after {
                  background: ${theme.colors.warning};
                }
              }
            }
          }
        }
        .section-icon {
          display: flex;
          margin-left: 20px;
          a {
            margin-right: 20px;
            &:last-child {
              margin-right: 0;
            }
          }
          svg {
            cursor: pointer;
          }
          .icon {
            .icon-container {
              position: relative;
              &.mr-3 {
                margin-right: ${theme.spaces.space6};
              }
              &:hover {
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  top: -20px;
                  width: 100%;
                  height: 4px;
                  background: ${theme.colors.error};
                  border-radius: ${theme.extra.radiusBig};
                  border-top-left-radius: 0px;
                  border-top-right-radius: 0px;
                }
              }
              &.active {
                &:after {
                  content: "";
                  display: block;
                  position: absolute;
                  top: -20px;
                  width: 100%;
                  height: 4px;
                  background: ${theme.colors.error};
                  border-radius: ${theme.extra.radiusBig};
                  border-top-left-radius: 0px;
                  border-top-right-radius: 0px;
                }
              }
            }
          }
        }
        a {
          color: ${theme.colors.navbarText};
          text-decoration: none;
          display: inline-block;
        }
        svg {
          fill: ${theme.colors.navbarText};
        }
        & > * {
          padding: 0 ${theme.spaces.space3};
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .menu-icon {
      padding: 0;
      .agency {
        margin-left: 20px;
        img {
          width: 50px;
          max-height: fit-content;
          width: fit-content;
        }
      }
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .menu-icon {
      padding: 0;
      .agency {
        margin-left: 20px;
        img {
          width: 50px !important;
          max-height: fit-content;
          width: fit-content;
        }
      }
    }
    .flex {
      display: none;
    }
  }
`;
const ContactStyleModal = styled.div`
  text-align: center;
  p {
    color: ${theme.colors.primaryDark};
  }
  .action {
    padding: 0 ${theme.spaces.space6};
    margin-top: ${theme.spaces.space8};
    display: flex;
    justify-content: space-between;
    .box {
      display: flex;
      align-items: center;
      flex-direction: row;
      .column {
        margin-left: ${theme.spaces.space3};
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        p {
          font-size: ${theme.font.size.mini};
          color: ${theme.colors.lightGrey};
        }
        a {
          font-size: ${theme.font.size.normal};
        }
      }
    }
  }
`;
