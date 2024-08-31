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
      background-image: url("data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%201351.68%20675.84%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20preserveAspectRatio%3D%22none%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221351.68%22%20height%3D%22675.84%22%20fill%3D%22transparent%22%3E%3C/rect%3E%3Cg%20transform%3D%22rotate(0%20675.84%20337.92)%22%3E%3Cpath%20d%3D%22M%20-675.84%20395.84%20S%20-397.00%20164.84%200.00%20395.84%20327.92%20137.84%20675.84%20395.84%201003.76%20373.84%201351.68%20395.84%201370.52%20309.84%202027.52%20395.84%20h%20110%20V%201275.8400000000001%20H%20-675.84%20Z%22%20fill%3D%22transparent%22%3E%3C/path%3E%3Cpath%20d%3D%22M%20-675.84%20305.00%20S%20-588.00%2072.00%200.00%20305.00%20232.84%20162.50%20675.84%20305.00%201003.76%20162.50%201351.68%20305.00%201679.60%20162.50%202027.52%20305.00%20h%20110%20V%20-600%20H%20-675.84%20Z%22%20fill%3D%22%230077B6%22%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
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
