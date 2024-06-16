import configureStore from "@/utils/redux/configure-store";
import { User } from "@/services";
import { AUTH_KEY, USER_KEY } from "@/utils/constants";
import { CookieManager } from "@/utils/cookie";
import { AppInitialProps, AppProps } from "next/app";
import { NextPageContext } from "next/dist/shared/lib/utils";
import React from "react";
import { Store } from "redux";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

interface AppState {}

interface Authentication {
  isAuth: boolean;
  user: any;
}

interface CustomAppProps extends AppProps {
  authentication: Authentication;
  initialReduxState: AppState;
}

interface CustomNextPageContext extends NextPageContext {
  reduxStore?: Store<AppState>;
  req?: any & { cookies?: Record<string, string>; user?: any };
}

declare global {
  interface Window {
    [__NEXT_REDUX_STORE__]?: Store<AppState>;
  }
}

function getOrCreateStore(initialState: AppState): Store<AppState> {
  if (isServer) {
    return configureStore(initialState);
  }

  if (!(window as any)[__NEXT_REDUX_STORE__]) {
    (window as any)[__NEXT_REDUX_STORE__] = configureStore(initialState);
  }
  return (window as any)[__NEXT_REDUX_STORE__] as Store<AppState>;
}

const AppWrapper = (App: any) => {
  return class Apper extends React.Component<CustomAppProps> {
    static async getInitialProps(appContext: any): Promise<
      AppInitialProps & {
        authentication: Authentication;
        initialReduxState: AppState;
      }
    > {
      const reduxStore = getOrCreateStore({});
      const { ctx } = appContext;
      const req = ctx.req as CustomNextPageContext["req"];
      const res = ctx.res;

      appContext.ctx.reduxStore = reduxStore;
      let appProps: AppInitialProps = { pageProps: {} };
      let isAuth: any = null;

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      const authCookie = CookieManager.getSsrCookie(req, AUTH_KEY);
      if (authCookie) {
        try {
          isAuth = await User.getUser(authCookie);
          if (isAuth?.error) {
            CookieManager.removeSsrCookie(req, res, AUTH_KEY);
            CookieManager.removeSsrCookie(req, res, USER_KEY);
          } else {
            req.user = isAuth;
          }
        } catch (err) {
          CookieManager.removeSsrCookie(req, res, AUTH_KEY);
          CookieManager.removeSsrCookie(req, res, USER_KEY);
        }
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
        authentication: {
          isAuth: isAuth?.id ? true : false,
          user: isAuth,
        },
      };
    }

    reduxStore: Store<AppState>;
    authentication: Authentication;

    constructor(props: CustomAppProps) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
      this.authentication = props.authentication;
    }

    render() {
      return (
        <App
          {...this.props}
          reduxStore={this.reduxStore}
          authentication={this.authentication}
        />
      );
    }
  };
};

export default AppWrapper;
