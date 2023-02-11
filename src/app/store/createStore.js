import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

const rootReducer = combineReducers({
  user: userReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
