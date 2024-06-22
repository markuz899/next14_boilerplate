import "@/styles/globals.css";
import React, { useEffect, useState } from "react";
import { GlobalStyle } from "@/theme/global-styles";
import { AppWrapper } from "@/hoc";
import { AuthProvider } from "@/context";
import { Provider } from "react-redux";
import { AppGlobalProps } from "@/utils/interface";
import { ToastContainer } from "react-toastify";
import { Toast } from "@/utils/toast";
import router from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "@/components";

const App = ({
  Component,
  pageProps,
  authentication,
  reduxStore,
}: AppGlobalProps) => {
  const [menuState, setMenuState] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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

  useEffect(() => {
    let timer: any;

    const handleRouteChangeStart = () => {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 1000);
    };

    const handleRouteChangeComplete = () => {
      setShowLoader(false);
      clearTimeout(timer);
    };

    const handleRouteChangeError = () => {
      setShowLoader(false);
      clearTimeout(timer);
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, []);

  return (
    <React.StrictMode>
      <Provider store={reduxStore}>
        <AuthProvider isAuth={authentication.isAuth}>
          <Component
            {...pageProps}
            global={{ authentication, menuState, setMenuState }}
          />
          {showLoader && <Loader />}
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
      </Provider>
    </React.StrictMode>
  );
};

export default AppWrapper(App);
