import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import accountService from "../services/account.service";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const createAccount = createAsyncThunk(
  "account/create",
  async (payload, thunkAPI) => {
    const { payment, ...rest } = payload;
    const account = {
      _id: nanoid(28),
      payment_id: payment,
      ...rest,
    };

    try {
      const { content } = await accountService.create(account);
      return content;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadAccounts = createAsyncThunk(
  "account/load",
  async (thunkAPI) => {
    try {
      const { content } = await accountService.get();
      return content;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState,
  extraReducers: {
    [createAccount.pending]: (state) => {
      state.error = null;
    },
    [createAccount.fulfilled]: (state, action) => {
      state.entities.push(action.payload);
    },
    [createAccount.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [loadAccounts.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadAccounts.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [loadAccounts.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: accountReducer, name } = accountSlice;

// Selectors
export const getAccountById = (id) => (state) =>
  state[name].entities.find((a) => a._id === id);

export const getAccounts = () => (state) => state[name].entities;
export const getAccountLoadingStatus = () => (state) => state[name].isLoading;

export default accountReducer;
