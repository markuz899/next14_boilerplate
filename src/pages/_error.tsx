import React from "react";
import Link from "next/link";
import { Layout } from "@/containers";
import styled from "styled-components";
import theme from "@/theme";

const NotFound = ({ global }: any) => {
  return (
    <Layout global={global} title="404">
      <Page>
        <div className="agency">
          <div className="logo">
            <h2>404</h2>
          </div>
          <div className="title">
            <h2>Page not found</h2>
            <p>You can anyway: </p>
            <ul>
              <li>
                <Link href="/">Go back to home page</Link>
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
        text-shadow: 5px 5px 10px black;
        font-size: 200px;
      }
    }
    .title {
      margin-left: ${theme.spaces.space4};
      a {
        color: ${theme.colors.white};
      }
      h2 {
        font-size: ${theme.font.size.big};
        color: white;
      }
      ul {
        list-style: circle;
        li {
          margin: ${theme.spaces.space2} ${theme.spaces.space4};
          a {
            &:hover {
              color: ${theme.colors.lightGrey};
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
