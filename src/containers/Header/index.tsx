import theme from "@/theme";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { HeaderProps } from "./interface";
import { Button, Clicker, Icon, Input, Select } from "@/components";
import { CDN_PATH, mokCategories, navItems } from "@/utils/constants";

const Header: React.FC<HeaderProps> = ({
  global,
  isSmall,
  state,
  setState,
}) => {
  const { authentication } = global;
  const { isAuth } = authentication;
  const router = useRouter();
  const path = router.pathname;

  const toggle = () => {
    setState(!state);
  };

  return (
    <Head $isSmall={isSmall}>
      <MenuContent $isSmall={isSmall}>
        <div className={`menu-icon ${isSmall ? "isSmall" : "notSmall"}`}>
          {isSmall && (
            <Clicker radius>
              <div onClick={toggle}>
                <Icon
                  name="hamburger"
                  size={theme.spaces.space5}
                  color={theme.colors.primary}
                />
              </div>
            </Clicker>
          )}
          <Link href="/">
            <div className="agency">
              <Icon
                name="logo"
                color={theme.colors.primary}
                size={theme.spaces.space8}
                margin="0 10px 0 0"
              />
            </div>
          </Link>
        </div>
        {!isSmall && (
          <>
            <div className="flex nopadd">
              <Select
                rounded
                clearable
                enableInput
                name="city"
                showArrow={false}
                onChange={() => {}}
                iconBefore="search"
                placeholder="Cosa stai cercando?"
                options={mokCategories}
              />
            </div>
            <div className="flex">
              <div className="link">
                <div className="navigator">
                  <div className="section-link">
                    {navItems?.map((item) => {
                      return (
                        <Link legacyBehavior key={item?.path} href={item?.path}>
                          <Button
                            round
                            size="sm"
                            kind={
                              router.asPath === item?.path
                                ? "primary"
                                : "inverse-primary"
                            }
                          >
                            {item?.text}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                  {isAuth && (
                    <div className="section-icon">
                      <div className="icon">
                        <Link href={isAuth ? "/profilo" : "/login"}>
                          <div
                            className={`icon-container ${
                              path.includes("/profilo") ? "active" : ""
                            }`}
                          >
                            <Icon
                              name="user"
                              color={theme.colors.primary}
                              size={theme.spaces.space5}
                            />
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </MenuContent>
    </Head>
  );
};

export default React.memo(Header);

const Head = styled.div<{ $isSmall: boolean; isOpen?: boolean }>`
  position: sticky;
  top: 0;
  z-index: 2100;
  transition: ${theme.extra.transitionFluid};
  background: ${({ theme }) => theme.navbar};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  left: ${(props) => (props.isOpen ? "270px" : "0")};
  right: 0;
  border-bottom: 1px solid ${theme.colors.greyIcon};
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
const MenuContent = styled.div<{ $isSmall: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $isSmall }) => ($isSmall ? 0 : theme.spaces.space2)};
  .menu-icon {
    padding: 0 ${theme.spaces.space6};
    cursor: pointer;
    display: flex;
    align-items: center;
    color: ${theme.colors.navbarText};
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
      width: 100%;
      justify-content: space-between;
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
    padding: ${theme.spaces.space5} ${theme.spaces.space6};
    &.nopadd {
      flex: 1;
      padding: 0;
      .select-input {
        margin-top: 0;
      }
    }
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
          button {
            cursor: pointer;
            position: relative;
            margin-left: 30px;
            &:first-child {
              margin-left: 0;
            }
          }
        }
        .section-icon {
          display: flex;
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
            }
          }
        }
        a {
          color: ${theme.colors.navbarText};
          text-decoration: none;
          display: inline-block;
        }
        svg {
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
