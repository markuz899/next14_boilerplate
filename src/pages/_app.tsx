import React, { useEffect, useState } from "react";
import "@/styles/globals.css";
import { GlobalStyle } from "@/theme/global-styles";
import { AppWrapper } from "@/hoc";
import { AuthProvider } from "@/context";
import { Provider } from "react-redux";
import { AppGlobalProps } from "@/utils/interface";
import { ToastContainer } from "react-toastify";
import { Toast } from "@/utils/toast";
import router from "next/router";
import "react-toastify/dist/ReactToastify.css";

const App = ({
  Component,
  pageProps,
  authentication,
  reduxStore,
}: AppGlobalProps) => {
  const [menuState, setMenuState] = useState(false);

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

  return (
    <React.StrictMode>
      <Provider store={reduxStore}>
        <AuthProvider isAuth={authentication.isAuth}>
          <Component
            {...pageProps}
            global={{ authentication, menuState, setMenuState }}
          />
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
