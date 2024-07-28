import { AUTH_KEY } from "@/utils/constants";
import { CookieManager } from "@/utils/cookie";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

type WithAuthProps<P> = P & {};

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent: React.FC<WithAuthProps<P>> = (props) => {
    const { global, infoPage }: any = props;
    const { authentication } = global;
    const Router = useRouter();
    const [verified, setVerified] = useState(authentication?.isAuth);

    useEffect(() => {
      const accessToken = CookieManager.get(AUTH_KEY);
      const checkUser = async () => {
        if (!accessToken) {
          Router.replace("/login");
          // remove cookie AUTH_KEY
        } else {
          setVerified(true);
        }
      };
      if (infoPage?.shield) {
        checkUser();
      }
      // eslint-disable-next-line
    }, []);

    if (!infoPage?.shield) {
      return <WrappedComponent {...props} />;
    }

    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
  return AuthComponent;
};

export default WithAuth;
