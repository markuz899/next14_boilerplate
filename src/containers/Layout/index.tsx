import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../theme";
import LayoutContext from "./Context";
import Head from "next/head";
import { LayoutProps } from "@/utils/interface";
import { Header, Sidebar } from "..";
import { useBreakpoints } from "@/hooks";
import { Montserrat } from "next/font/google";

const inter = Montserrat({ subsets: ["latin"] });

export const Layout = ({
  children,
  global,
  title,
  background,
  className,
}: LayoutProps) => {
  const { menuState, setMenuState } = global;
  const { isSmall, isMedium } = useBreakpoints();

  useEffect(() => {
    setMenuState(false);
    // eslint-disable-next-line
  }, []);

  return (
    <LayoutContext.Provider value={{ menuState, setMenuState }}>
      <Head>
        <title>{title || "Fake title"}</title>
      </Head>
      <Flex>
        {(isSmall || isMedium) && (
          <Sidebar
            state={menuState}
            setState={setMenuState}
            isMobile={isSmall}
            global={global}
          />
        )}
        <Page>
          <Main className={`bodys ${inter.className}`}>
            <Header
              global={global}
              isSmall={isSmall || isMedium}
              state={menuState}
              setState={setMenuState}
            />
            <Body background={background}>{children}</Body>
            FOOTER
          </Main>
        </Page>
      </Flex>
    </LayoutContext.Provider>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default React.memo(Layout);

interface StyledDivProps {
  background?: string;
}

const Flex = styled.div`
  display: flex;
  height: 100%;
  min-width: ${theme.breakpoints.first};
`;
const Page = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
`;
const Body = styled.div<StyledDivProps>`
  background: ${(p) => (p.background ? p.background : "inherit")};
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: 1s;
  width: 100%;
  height: 100%;
  margin: 0;
`;
const Main = styled.div`
  position: relative;
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
