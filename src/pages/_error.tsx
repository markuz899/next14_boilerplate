import React from "react";
import Link from "next/link";
import { Layout } from "@/containers";
import styled from "styled-components";
import theme from "@/theme";

const NotFound = ({ global }: any) => {
  return (
    <Layout
      global={global}
      title="404 - Not found page"
      background={theme.colors.primaryLight}
    >
      <Page>
        <div className="agency">
          <div className="logo">
            <h2>404</h2>
          </div>
          <div className="title">
            <h2>Pagina non trovata</h2>
            <p>Puoi comunque: </p>
            <ul>
              <li>
                <Link href="/">Tornare alla homepage</Link>
              </li>
            </ul>
          </div>
        </div>
      </Page>
    </Layout>
  );
};

export default NotFound;

const Page = styled.div`
  width: 100%;
  height: calc(100svh - 84px);
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  padding: ${theme.spaces.space4};
  color: white;
  position: relative;
  overflow: hidden;
  .agency {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logo {
      h2 {
        color: ${theme.colors.error};
        text-shadow: 5px 5px 10px black;
        font-size: 200px;
      }
    }
    .title {
      h2 {
        font-size: ${theme.font.size.big};
      }
      ul {
        list-style: circle;
        li {
          margin: ${theme.spaces.space2} ${theme.spaces.space4};
          a {
            color: ${theme.colors.warning};
            &:hover {
              color: ${theme.colors.greyIcon};
            }
          }
        }
      }
    }
  }
  .action {
    margin-top: ${theme.spaces.space4};
    text-align: center;
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
    width: 100%;
    .agency {
      flex-direction: column;
      text-align: center;
      .logo {
        h2 {
          font-size: 200px;
          height: inherit;
        }
      }
      .title {
        text-align: center;
        margin-left: 0;
        h2 {
          font-size: ${theme.font.size.big};
        }
        p {
          font-size: ${theme.font.size.mini};
        }
      }
    }
    img {
      width: 150px;
    }
  }
`;
