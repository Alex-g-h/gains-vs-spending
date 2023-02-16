import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account";
import paymentReducer from "./payment";
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  account: accountReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
