import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import theme from "@/theme";
import { Button, Rating } from "..";
import { useState } from "react";
import { getFirstLetter } from "@/utils/utils";

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
  renderFooter = true,
  onClick,
  active,
}: CardProps) => {
  const [firstLetter, setFirstLetter] = useState(getFirstLetter(option.name));
  const isEven = option?.id % 2 == 0;
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
        <CardStyle $active={active} $mini={mini}>
          <div className="content-card">
            <div className="content-column">
              <div className="banner">
                {isEven ? (
                  <div className="first">{firstLetter}</div>
                ) : (
                  <div className="image">
                    <img src="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg" />
                  </div>
                )}
              </div>

              <div className="info">
                <div className="row between">
                  <Rating
                    rate={option.rating}
                    size={theme.spaces.space3}
                    disable
                  />
                  <p>06/03/2022</p>
                </div>
                <div className="row">
                  <span className="bold">Nome:</span>
                  <p>{option.name}</p>
                  <p>Rossi</p>
                </div>
                <div className="row">
                  <span className="bold">Professione:</span>
                  <p>{option.profession}</p>
                </div>
              </div>
            </div>
            {renderFooter && !mini && (
              <div className="card-action">
                <Button
                  kind="inverse-primary"
                  fluid
                  className="btn btn-redirect"
                >
                  <b>DETTAGLI</b>
                </Button>
              </div>
            )}
          </div>
        </CardStyle>
      </m.div>
    </LazyMotion>
  );
};

export default Card;

const isHover = css`
  transition: box-shadow 0.3s ease-in-out;
  -webkit-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
`;
const isActive = css`
  border: 2px solid ${theme.colors.success};
`;

const CardStyle = styled.div<{ $active?: boolean; $mini?: boolean }>`
  .content-card {
    margin: ${theme.spaces.space2};
    overflow: hidden;
    background: ${theme.colors.cardLight};
    border-radius: ${theme.spaces.space5};
    border: 2px solid ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    padding: ${theme.spaces.space4};
    .content-column {
      display: flex;
      align-items: center;
      gap: ${theme.spaces.space4};
      .banner {
        display: ${(p) => (p.$mini ? "none" : "block")};
        .first {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme.colors.greyIcon};
          border-radius: ${theme.extra.radiusRound};
          font-size: ${theme.font.size.large};
        }
        .image {
          overflow: hidden;
          max-width: 80px;
          border-radius: ${theme.extra.radiusRound};
          img {
            width: 100%;
            object-fit: cover;
          }
        }
      }
      .info {
        width: 100%;
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
