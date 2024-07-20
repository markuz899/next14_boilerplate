import React from "react";
import styled from "styled-components";
import theme from "@/theme";
import Link from "next/link";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <Foot>
      <div className="row">
        <div className="root">
          <Link legacyBehavior href="/">
            <h3 className="root-link">404</h3>
          </Link>
        </div>
        <div className="copyright">
          <p>© {currentYear}</p>
        </div>
      </div>
    </Foot>
  );
};

// Footer.propTypes = {};

// Footer.defaultProps = {};

export default React.memo(Footer);

const Foot = styled.div`
  background: ${theme.colors.footer};
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spaces.space6} ${theme.spaces.space15};
  border-top: 1px solid ${theme.colors.greyIcon};
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h3,
    p {
      color: ${theme.colors.navbarText};
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.tablet}) {
    .row {
      flex-direction: column;
    }
  }
  @media only screen and (max-width: ${theme.breakpoints.mobile}) {
  }
`;
