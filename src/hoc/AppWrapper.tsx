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
      let appProps: AppInitialProps = { pageProps: {} };
      let isAuth: any = null;

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(appContext);
      }

      // TODO: Check cookie auth
      if (appContext.ctx?.req?.headers.cookie) {
        // isAuth = await User.getUser(appContext.ctx.req.cookies.auth);
        isAuth = { id: 123 };
        appContext.ctx.req.user = isAuth;
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
