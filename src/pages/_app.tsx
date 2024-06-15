import React, { useState } from "react";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GlobalStyle } from "@/theme/global-styles";
import { AppWrapper } from "@/hoc";
import { AuthProvider } from "@/context";
import { AppGlobalProps } from "@/utils/interface";

const App = ({ Component, pageProps, authentication }: AppGlobalProps) => {
  const [menuState, setMenuState] = useState(false);

  return (
    <React.StrictMode>
      <AuthProvider isAuth={authentication.isAuth}>
        <Component
          {...pageProps}
          global={{ authentication, menuState, setMenuState }}
        />
        <GlobalStyle />
      </AuthProvider>
    </React.StrictMode>
  );
};

export default AppWrapper(App);
