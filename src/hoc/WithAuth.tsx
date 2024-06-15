import { useRouter } from "next/router";
import { ComponentType, useEffect, useState } from "react";

type WithAuthProps<P> = P & {};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts: any = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const WithAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthComponent: React.FC<WithAuthProps<P>> = (props) => {
    const Router = useRouter();
    const [verified, setVerified] = useState(false);

    useEffect(() => {
      const accessToken = getCookie("auth");
      const checkUser = async () => {
        console.log("enter in WithAuth");
        if (!accessToken) {
          Router.replace("/login");
        } else {
          // const data = await User.getUser(accessToken);
          const data = { id: 123 };
          if (data.id) {
            setVerified(true);
          } else {
            // Cookies.remove('auth');
            Router.replace("/login");
          }
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
