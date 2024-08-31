import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import theme from "@/theme";
import { Button, Rating } from "..";
import { useEffect, useState } from "react";
import Link from "next/link";

interface CardProps {
  option: any;
  mini?: boolean;
  onClick?: any;
  active?: any;
  disabled?: boolean;
}

const Card = ({
  option,
  mini = false,
  onClick,
  active,
  disabled,
}: CardProps) => {
  const [miniCard, setMiniCard] = useState(mini);
  const [userInfo, setUserInfo] = useState(option);

  useEffect(() => {
    setUserInfo(option);
  }, [option]);

  useEffect(() => {
    setMiniCard(mini);
  }, [mini]);

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
        <Link
          onClick={(e) => (disabled ? e.preventDefault() : null)}
          href={`/professional/${userInfo.id}`}
        >
          <CardStyle className={`cardstyle`} $active={active} $mini={miniCard}>
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
                  {!miniCard && (
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
        </Link>
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
  .content-card {
    margin: ${theme.spaces.space2};
    overflow: hidden;
    background: ${theme.colors.cardLight};
    border-radius: ${theme.spaces.space5};
    box-shadow: 0 0 16px rgba(14, 39, 63, 0.18);
    transition: all 0.5s;
    padding: ${({ $mini }) =>
      $mini ? theme.spaces.space3 : theme.spaces.space4};
    ${({ $mini }) => ($mini ? mini : normal)};
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
      .content-card-col {
        .content-banner {
          img {
          }
        }
      }
      &:hover {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
    }
  }
`;

const mini = css`
  .content-card-col {
    display: flex;
    align-items: center;
    gap: ${theme.spaces.space4};
    .content-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        min-height: 50px;
        max-height: 100px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .content-info {
      overflow: hidden;
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
`;
const normal = css`
  .content-card-col {
    .content-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      background-image: ${() => getSvgBackground(theme.colors.primary)};
      border-radius: ${theme.extra.radiusRound};
      padding: ${theme.spaces.space2};
      img {
        min-height: 95px;
        max-height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    .content-info {
      overflow: hidden;
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
`;

// const CardStyle = styled.div<{
//   $active?: boolean;
//   $mini?: boolean;
//   src?: string;
// }>`
//   margin: ${theme.spaces.space2};
//   .content-card {
//     overflow: hidden;
//     background: ${theme.colors.cardLight};
//     border-radius: ${theme.spaces.space5};
//     box-shadow: 0 0 16px rgba(14, 39, 63, 0.18);
//     transition: all 0.5s;
//     height: 100%;
//     .content-card-col {
//       display: flex;
//       align-items: center;
//       height: 100%;
//       .content-banner {
//         display: flex;
//         width: 150px;
//         height: 100%;
//         min-width: 125px;
//         max-width: 150px;
//         img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//         }
//       }
//       .content-info {
//         overflow: hidden;
//         padding: ${theme.spaces.space4};
//         font-size: ${theme.font.size.tiny};
//         width: 100%;
//         height: 100%;
//         .row {
//           display: flex;
//           align-items: center;
//           margin-bottom: ${theme.spaces.space2};
//           &.between {
//             justify-content: space-between;
//             flex-wrap: wrap-reverse;
//           }
//           span {
//             margin-right: 5px;
//           }
//           .message {
//             white-space: nowrap;
//             overflow: hidden;
//             text-overflow: ellipsis;
//           }
//           &:last-child {
//             margin-bottom: 0;
//           }
//         }
//       }
//     }
//     .card-action {
//       margin-top: ${theme.spaces.space2};
//     }
//     &:hover {
//       ${isHover}
//     }
//     ${(p) => p.$active && isActive}
//   }
//   @media only screen and (max-width: ${theme.breakpoints.mobile}) {
//     .content-card {
//       margin: ${theme.spaces.space2};
//       &:hover {
//         -webkit-box-shadow: none;
//         -moz-box-shadow: none;
//         box-shadow: none;
//       }
//     }
//   }
// `;
const getSvgBackground = (
  colorTop: string,
  colorBottom: string = "transparent"
) => {
  const svg = `
    <svg viewBox="0 0 1351.68 675.84" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <rect x="0" y="0" width="1351.68" height="675.84" fill="${colorBottom}"></rect>
      <g transform="rotate(0 675.84 337.92)">
        <path d="M -675.84 395.84 S -397.00 164.84 0.00 395.84 327.92 137.84 675.84 395.84 1003.76 373.84 1351.68 395.84 1370.52 309.84 2027.52 395.84 h 110 V 1275.8400000000001 H -675.84 Z" fill="transparent"></path>
        <path d="M -675.84 305.00 S -588.00 72.00 0.00 305.00 232.84 162.50 675.84 305.00 1003.76 162.50 1351.68 305.00 1679.60 162.50 2027.52 305.00 h 110 V -600 H -675.84 Z" fill="${colorTop}"></path>
      </g>
    </svg>
  `;

  return `url('data:image/svg+xml,${encodeURIComponent(svg)}')`;
};
