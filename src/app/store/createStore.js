import { combineReducers, configureStore } from "@reduxjs/toolkit";
import accountReducer from "./account";
import gainReducer from "./gain";
import paymentReducer from "./payment";
import userReducer from "./user";
import expenseTypesReducer from "./expenseTypes";
import spendingReducer from "./spending";

const rootReducer = combineReducers({
  user: userReducer,
  payment: paymentReducer,
  account: accountReducer,
  gain: gainReducer,
  expenseTypes: expenseTypesReducer,
  spending: spendingReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
