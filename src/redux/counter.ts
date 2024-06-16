import { call, put, takeLatest, all } from "redux-saga/effects";
import { createRoutine } from "redux-saga-routines";

const INCREMENT_QUANTITY = "INCREMENT_QUANTITY";
const DECREMENT_QUANTITY = "DECREMENT_QUANTITY";

const actions = {
  incrementCount: createRoutine(INCREMENT_QUANTITY),
  decrementCount: createRoutine(DECREMENT_QUANTITY),
};

const initialState = {
  count: 0,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case INCREMENT_QUANTITY:
      return { ...state, count: state.count + 1 };
    case DECREMENT_QUANTITY:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

function* incrementCountWorker(action: any) {
  yield put({ type: INCREMENT_QUANTITY, payload: action.payload });
}

function* decrementCountWorker(action: any) {
  yield put({ type: DECREMENT_QUANTITY, payload: action.payload });
}

function* saga() {
  yield all([
    takeLatest(actions.incrementCount.TRIGGER, incrementCountWorker),
    takeLatest(actions.decrementCount.TRIGGER, decrementCountWorker),
  ]);
}

const CountRedux = {
  actions,
  reducer,
  saga,
};

export default CountRedux;
