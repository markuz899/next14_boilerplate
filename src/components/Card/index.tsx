import styled from "styled-components";
import { LazyMotion, domAnimation, m } from "framer-motion";
import theme from "@/theme";
import { Button, Rating } from "..";

interface CardProps {
  option: any;
  renderFooter?: boolean;
}

const Card = ({ option, renderFooter = true }: CardProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="card"
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <CardStyle>
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
              {renderFooter && (
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

const CardStyle = styled.div`
  .content-card {
    margin: ${theme.spaces.space2};
    overflow: hidden;
    background: ${theme.colors.cardLight};
    border-radius: ${theme.spaces.space5};
    border: 1px solid ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    .banner {
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
      transition: box-shadow 0.3s ease-in-out;
      -webkit-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
      box-shadow: 0px 10px 55px -25px rgba(0, 0, 0, 0.75);
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
