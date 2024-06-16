import React from "react";
import hoistNonReactStatics from "hoist-non-react-statics";
import { ReactReduxContext } from "react-redux";
import getInjectors from "./reducer-injectors";

export const Wrapped =
  ({ key, reducer }: any) =>
  (WrappedComponent: any) => {
    class ReducerInjector extends React.Component {
      static WrappedComponent = WrappedComponent;

      static contextType = ReactReduxContext;

      static displayName = `withReducer(${
        WrappedComponent.displayName || WrappedComponent.name || "Component"
      })`;

      constructor(props: any, context: any) {
        super(props, context);

        getInjectors(context.store).injectReducer(key, reducer);
      }

      render() {
        return <WrappedComponent {...this.props} />;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };

const useInjectReducer = ({ key, reducer }: any) => {
  const context: any = React.useContext(ReactReduxContext);
  React.useEffect(() => {
    getInjectors(context.store).injectReducer(key, reducer);
    // eslint-disable-next-line
  }, []);
};

export { useInjectReducer };
