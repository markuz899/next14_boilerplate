import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import theme from "@/theme";
import { Button, Rating } from "..";
import { useEffect, useState } from "react";

interface CardProps {
  option: any;
  mini?: boolean;
  renderFooter?: boolean;
  onClick?: any;
  active?: any;
}

const Card = ({
  option,
  mini = false,
  renderFooter = false,
  onClick,
  active,
}: CardProps) => {
  const [userInfo, setUserInfo] = useState(option);

  useEffect(() => {
    setUserInfo(option);
  }, [option]);
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="card"
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        onClick={onClick}
      >
        <CardStyle className={`cardstyle`} $active={active} $mini={mini}>
          <div className="content-card">
            <div className="content-card-col">
              <div className="content-banner">
                <img src={`https://i.pravatar.cc/150?img=${userInfo.id}`} />
              </div>

              <div className="content-info">
                <div className="row between">
                  <Rating
                    rate={userInfo.rating}
                    size={theme.spaces.space3}
                    disable
                  />
                  <p>{userInfo.createdAt}</p>
                </div>
                <div className="row">
                  <p className="bold">{userInfo.name}</p>
                </div>
                <div className="row">
                  <p>{userInfo.profession}</p>
                </div>
                {!mini && (
                  <div className="row">
                    <p className="message">
                      Mi chiamo {userInfo.name} disponibile, capace
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardStyle>
      </m.div>
    </LazyMotion>
  );
};

export default Card;

const isHover = css`
  transition: box-shadow 0.3s ease-in-out !important;
  -webkit-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75) !important;
  -moz-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75) !important;
  box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75) !important;
`;
const isActive = css`
  transition: box-shadow 0.3s ease-in-out !important;
  box-shadow: 0 0 16px ${theme.colors.primary};
`;

const CardStyle = styled.div<{
  $active?: boolean;
  $mini?: boolean;
  src?: string;
}>`
  margin: ${theme.spaces.space2};
  .content-card {
    overflow: hidden;
    background: ${theme.colors.cardLight};
    border-radius: ${theme.spaces.space5};
    box-shadow: 0 0 16px rgba(14, 39, 63, 0.18);
    transition: all 0.5s;
    height: 100%;
    .content-card-col {
      display: flex;
      align-items: center;
      height: 100%;
      .content-banner {
        width: 150px;
        height: 100%;
        min-width: 150px;
        max-width: 150px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .content-info {
        overflow: hidden;
        padding: ${theme.spaces.space4};
        font-size: ${theme.font.size.tiny};
        width: 100%;
        height: 100%;
        .row {
          display: flex;
          align-items: center;
          margin-bottom: ${theme.spaces.space2};
          &.between {
            justify-content: space-between;
            flex-wrap: wrap-reverse;
          }
          span {
            margin-right: 5px;
          }
          .message {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    .card-action {
      margin-top: ${theme.spaces.space2};
    }
    &:hover {
      ${isHover}
    }
    ${(p) => p.$active && isActive}
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    .content-card {
      margin: ${theme.spaces.space2};
      &:hover {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
    }
  }
`;
