import "@/styles/globals.css";
import React, { useCallback, useEffect, useState } from "react";
import { GlobalStyle, darkTheme, lightTheme } from "@/theme/global-styles";
import { AppWrapper } from "@/hoc";
import { AuthProvider } from "@/context";
import { useDarkMode, usePwa } from "@/hooks";
import { Provider } from "react-redux";
import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import { ThemeProvider } from "styled-components";
import { AppGlobalProps } from "@/utils/interface";
import { ToastContainer } from "react-toastify";
import { Toast } from "@/utils/toast";
import router from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { Montserrat } from "next/font/google";
// import { Loader } from "@/components";

const inter = Montserrat({ subsets: ["latin"] });

const App = ({
  Component,
  pageProps,
  authentication,
  reduxStore,
}: AppGlobalProps) => {
  const [themes, setTheme, componentMounted] = useDarkMode();
  const { installPrompt, isInstalled, isStandalone, isOffline, canInstall } =
    usePwa();
  const [menuState, setMenuState] = useState(false);
  const themeMode = themes === "light" ? lightTheme : darkTheme;
  // const [showLoader, setShowLoader] = useState(false);

  const handleInstallPrompt = useCallback(() => {
    if (canInstall) {
      installPrompt();
    }
  }, [canInstall, installPrompt]);

  useEffect(() => {
    if (pageProps?.toast?.isError) {
      Toast({ type: "error", message: pageProps?.toast?.message });
      if (pageProps?.toast?.redirect) {
        router.push(pageProps?.toast?.redirect);
      }
    }
    if (pageProps?.toast?.isSuccess) {
      Toast({ type: "success", message: pageProps?.toast?.message });
    }
  }, [pageProps]);

  // useEffect(() => {
  //   let showLoaderTimer: any;
  //   let hideLoaderTimer: any;

  //   const handleRouteChangeStart = () => {
  //     showLoaderTimer = setTimeout(() => {
  //       setShowLoader(true);
  //     }, 1000);

  //     hideLoaderTimer = setTimeout(() => {
  //       setShowLoader(false);
  //     }, 5000);
  //   };

  //   const handleRouteChangeComplete = () => {
  //     setShowLoader(false);
  //     clearTimeout(showLoaderTimer);
  //     clearTimeout(hideLoaderTimer);
  //   };

  //   const handleRouteChangeError = () => {
  //     setShowLoader(false);
  //     clearTimeout(showLoaderTimer);
  //     clearTimeout(hideLoaderTimer);
  //   };

  //   router.events.on("routeChangeStart", handleRouteChangeStart);
  //   router.events.on("routeChangeComplete", handleRouteChangeComplete);
  //   router.events.on("routeChangeError", handleRouteChangeError);

  //   return () => {
  //     router.events.off("routeChangeStart", handleRouteChangeStart);
  //     router.events.off("routeChangeComplete", handleRouteChangeComplete);
  //     router.events.off("routeChangeError", handleRouteChangeError);
  //   };
  // }, []);

  return (
    <React.StrictMode>
      <Head>
        <title>{process.env.NEXT_PUBLIC_SITE_NAME}</title>
        <link rel="icon" href={`/favicon.ico`}></link>
        <link
          rel="manifest"
          href="/manifest.json"
          crossOrigin="use-credentials"
        />
      </Head>
      <Provider store={reduxStore}>
        <CacheProvider value={cache}>
          <ThemeProvider theme={themeMode}>
            <AuthProvider isAuth={authentication.isAuth}>
              {componentMounted && (
                <main style={{ height: "100%" }} className={inter.className}>
                  <Component
                    {...pageProps}
                    global={{
                      authentication,
                      menuState,
                      setMenuState,
                      theme: { themes, setTheme },
                      pwa: {
                        installPrompt,
                        isInstalled,
                        isStandalone,
                        isOffline,
                        canInstall,
                        handleInstallPrompt,
                      },
                    }}
                  />
                </main>
              )}
              <div id="root-modal"></div>
              <div id="root-tooltip"></div>
              <ToastContainer
                position="top-right"
                stacked
                limit={3}
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                draggable={false}
                closeOnClick
                pauseOnHover
              />
              <GlobalStyle />
            </AuthProvider>
          </ThemeProvider>
        </CacheProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default AppWrapper(App);
