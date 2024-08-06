import styled, { css } from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import theme from "@/theme";
import { Button, Rating } from "..";

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
            <div className="banner">
              <img src="https://t3.ftcdn.net/jpg/02/68/48/86/360_F_268488616_wcoB2JnGbOD2u3bpn2GPmu0KJQ4Ah66T.jpg" />
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
              {renderFooter && !mini && (
                <div className="card-action">
                  <Button kind="primary" fluid className="btn btn-redirect">
                    <b>DETTAGLI</b>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardStyle>
      </m.div>
    </LazyMotion>
  );
};

export default Card;

const isActive = css`
  transition: box-shadow 0.3s ease-in-out;
  -webkit-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
`;

const CardStyle = styled.div<{ $active?: boolean; $mini?: boolean }>`
  .content-card {
    margin: ${theme.spaces.space2};
    overflow: hidden;
    background: ${theme.colors.cardLight};
    border-radius: ${theme.spaces.space5};
    border: 1px solid ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    .banner {
      display: ${(p) => (p.$mini ? "none" : "block")};
      width: 100%;
      max-height: 100px;
      overflow: hidden;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    .info {
      padding: ${theme.spaces.space4};
      .row {
        display: flex;
        align-items: center;
        margin-bottom: ${theme.spaces.space2};
        &.between {
          justify-content: space-between;
        }
        span {
          margin-right: 5px;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
    &:hover {
      ${isActive}
    }
    ${(p) => p.$active && isActive}
  }
  button {
    text-transform: uppercase;
    height: inherit;
    &:hover {
      border-color: inherit;
    }
    &:active,
    &:focus {
      animation: none !important;
      transform: none !important;
    }
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
