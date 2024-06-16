import createSagaMiddleware from "redux-saga";
import {
  createStore,
  applyMiddleware,
  compose,
  Store,
  StoreEnhancer,
} from "redux";
import { routinePromiseWatcherSaga } from "redux-saga-routines";
import createReducer from "./create-reducer";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(
  initialState: any = {} as any
): Store<any, any> {
  const middlewares = [sagaMiddleware];

  const enhancers: StoreEnhancer[] = [applyMiddleware(...middlewares)];

  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose;

  const store: any = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers)
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  store.runSaga(routinePromiseWatcherSaga);

  return store;
}
