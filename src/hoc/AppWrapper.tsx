import { User } from "@/services";
import { AUTH_KEY, USER_KEY } from "@/utils/constants";
import { CookieManager } from "@/utils/cookie";
import { AppInitialProps, AppProps } from "next/app";
import { AppContextType } from "next/dist/shared/lib/utils";
import React from "react";

declare module "http" {
  interface IncomingMessage {
    user?: any;
  }
}

interface Authentication {
  isAuth: boolean;
  user: any;
}

interface CustomAppProps extends AppProps {
  authentication: Authentication;
}

const AppWrapper = (App: any) => {
  return class Apper extends React.Component<CustomAppProps> {
    // eslint-disable-next-line
    static async getInitialProps(
      appContext: AppContextType
    ): Promise<AppInitialProps & { authentication: Authentication }> {
      const { ctx } = appContext;
      const req = ctx.req as any;
      const res = ctx.res as any;

      let appProps: AppInitialProps = { pageProps: {} };
      let isAuth: any = null;

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      // TODO: Check cookie auth
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
        authentication: {
          isAuth: isAuth?.id ? true : false,
          user: isAuth,
        },
      };
    }

    authentication: Authentication;

    constructor(props: CustomAppProps) {
      super(props);
      this.authentication = props.authentication;
    }

    render() {
      return <App {...this.props} />;
    }
  };
};

export default AppWrapper;
