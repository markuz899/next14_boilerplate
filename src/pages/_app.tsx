import React, { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "@/theme/global-styles";
import { AppWrapper } from "@/hoc";

interface AppGlobalProps extends AppProps {
  authentication: boolean;
}

const App = ({ Component, pageProps, authentication }: AppGlobalProps) => {
  const [menuState, setMenuState] = useState(false);

  return (
    <React.StrictMode>
      <Component
        {...pageProps}
        global={{ authentication, menuState, setMenuState }}
      />
      <GlobalStyle />
    </React.StrictMode>
  );
};

export default AppWrapper(App);
