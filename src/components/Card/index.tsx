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
  renderFooter = false,
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
        <a href={`/detail/${option?.id}`}>
          <CardStyle
            $active={active}
            $mini={mini}
            src={`https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg`}
          >
            <div className="content-card">
              <div className="content-column">
                <div className="banner">
                  <img src="https://www.strasys.uk/wp-content/uploads/2022/02/Depositphotos_484354208_S.jpg" />
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
        </a>
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
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 16px rgba(14, 39, 63, 0.18);
    transition: all 0.5s;
    .content-column {
      display: flex;
      align-items: center;
      .banner {
        display: ${(p) => (p.$mini ? "none" : "block")};
        overflow: hidden;
        width: 150px;
        height: 100%;
        max-width: 150px;
        img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .info {
        padding: ${theme.spaces.space2};
        font-size: ${theme.font.size.tiny};
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
