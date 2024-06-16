import { combineReducers } from "redux";
import globalReducer from "./reducer";

export default function createReducer(asyncReducers?: any) {
  return combineReducers({
    global: globalReducer,
    ...asyncReducers,
  });
}
