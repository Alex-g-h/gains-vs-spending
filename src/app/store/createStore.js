import { combineReducers, configureStore } from "@reduxjs/toolkit";
import paymentReducer from "./payment";
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
