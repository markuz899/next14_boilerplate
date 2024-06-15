import { CookieManager } from "@/utils/cookie";
import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

type WithAuthProps<P> = P & {};

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent: React.FC<WithAuthProps<P>> = (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = CookieManager.get("auth");
      const checkUser = async () => {
        if (!accessToken) {
          Router.replace("/login");
          // remove cookie "auth"
        } else {
          setVerified(true);
        }
      };
      checkUser();
      // eslint-disable-next-line
    }, []);
    if (verified) {
      return <WrappedComponent {...props} />;
    } else {
      return null;
    }
  };
  return AuthComponent;
};

export default WithAuth;
