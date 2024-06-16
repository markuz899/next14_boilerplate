import invariant from "invariant";

import isEmpty from "lodash/isEmpty";
import isFunction from "lodash/isFunction";
import isString from "lodash/isString";
import conformsTo from "lodash/conformsTo";
import checkStore from "./check-store";

export const RESTART_ON_REMOUNT = "@@saga-injector/restart-on-remount";
export const DAEMON = "@@saga-injector/daemon";
export const ONCE_TILL_UNMOUNT = "@@saga-injector/once-till-unmount";

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: any) =>
  invariant(
    isString(key) && !isEmpty(key),
    "(app/utils...) injectSaga: Expected `key` to be a non empty string"
  );

const checkDescriptor = (descriptor: any) => {
  const shape = {
    saga: isFunction,
    mode: (mode: any) => isString(mode) && allowedModes.includes(mode),
  };
  invariant(
    conformsTo(descriptor, shape),
    "(app/utils...) injectSaga: Expected a valid saga descriptor"
  );
};

export function injectSagaFactory(store: any, isValid: any) {
  return function injectSaga(
    key: any,
    descriptor: { mode?: any } = {},
    args: any
  ) {
    if (!isValid) checkStore(store);

    const newDescriptor: any = {
      ...descriptor,
      mode: descriptor.mode || DAEMON,
    };
    const { saga, mode } = newDescriptor;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.injectedSagas[key];
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      /* eslint-disable no-param-reassign */
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args),
      };
      /* eslint-enable no-param-reassign */
    }
  };
}

export function ejectSagaFactory(store: any, isValid: any) {
  return function ejectSaga(key: any) {
    if (!isValid) checkStore(store);

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        if (process.env.NODE_ENV === "production") {
          store.injectedSagas[key] = "done"; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: any) {
  checkStore(store);

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true),
  };
}
