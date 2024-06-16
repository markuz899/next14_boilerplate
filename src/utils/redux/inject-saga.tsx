import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { ReactReduxContext } from "react-redux";

import getInjectors from "./saga-injectors";

export const Inject =
  ({ key, saga, mode }: any) =>
  (WrappedComponent: any) => {
    class InjectSaga extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withSaga(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      })`;
      injectors: {
        injectSaga: (
          key: any,
          descriptor: { mode?: any; saga?: any } | undefined,
          args: any
        ) => void;
        ejectSaga: (key: any) => void;
      };

      constructor(props: any, context: any) {
        super(props, context);

        this.injectors = getInjectors(context.store);

        this.injectors.injectSaga(key, { saga, mode }, this.props);
      }

      componentWillUnmount() {
        this.injectors.ejectSaga(key);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent);
  };

const useInjectSaga = ({ key, saga, mode }: any) => {
  const context: any = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    const injectors: any = getInjectors(context.store);
    injectors.injectSaga(key, { saga, mode });

    return () => {
      injectors.ejectSaga(key);
    };
    // eslint-disable-next-line
  }, []);
};

export { useInjectSaga };
