import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { useInjectReducer } from "./inject-reducer";
import { useInjectSaga } from "./inject-saga";
import CountRedux from "@/redux/counter";

interface CounterProps {
  count: number;
  incrementCount?: () => void;
  decrementCount?: () => void;
}

const Counter: React.FC<CounterProps> = ({
  count,
  incrementCount,
  decrementCount,
}: any) => {
  useInjectReducer({ key: "counter", reducer: CountRedux.reducer });
  useInjectSaga({ key: "counter", saga: CountRedux.saga });
  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={() => incrementCount()}>Increment</button>
      <button onClick={() => decrementCount()}>Decrement</button>
    </div>
  );
};

const mapStateToProps = ({ counter }: any) => ({ count: counter?.count });

const mapDispatchToProps = (dispatch: any) => ({
  incrementCount: () => dispatch(CountRedux.actions.incrementCount()),
  decrementCount: () => dispatch(CountRedux.actions.decrementCount()),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
export default compose(connector)(React.memo(Counter));
