import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";
import accountService from "../services/account.service";
import { deleteGainsByAccountId } from "./gain";
import { deleteSpendingsByAccountId } from "./spending";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const createAccount = createAsyncThunk(
  "account/create",
  async (payload, thunkAPI) => {
    const nanoid = customAlphabet("1234567890abcdef", 24);
    const account = {
      _id: nanoid(),
      ...payload,
    };

    try {
      const { content } = await accountService.create(account);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "account/delete",
  async (id, thunkAPI) => {
    try {
      const { content } = await accountService.delete(id);
      if (!content) {
        // delete all gains correspond to account
        thunkAPI.dispatch(deleteGainsByAccountId(id));
        // delete all spending correspond to account
        thunkAPI.dispatch(deleteSpendingsByAccountId(id));
        return id;
      } else {
        return thunkAPI.rejectWithValue(`Can't delete account with ID: ${id}`);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAccount = createAsyncThunk(
  "account/update",
  async (payload, thunkAPI) => {
    try {
      const { content } = await accountService.update(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
      if (!Array.isArray(state.entities)) state.entities = [];
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
    [deleteAccount.pending]: (state) => {
      state.error = null;
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.entities = state.entities.filter((a) => a._id !== action.payload);
    },
    [deleteAccount.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateAccount.pending]: (state) => {
      state.error = null;
    },
    [updateAccount.fulfilled]: (state, action) => {
      const newAccounts = state.entities.map((a) => {
        if (a._id === action.payload._id) return action.payload;
        return a;
      });
      state.entities = newAccounts;
    },
    [updateAccount.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: accountReducer, name } = accountSlice;

// Selectors
export const getAccountById = (id) => (state) =>
  state[name].entities?.find((a) => a._id === id);

// get account only for one user
export const getAccounts = (userId) => (state) =>
  state[name].entities?.reduce((res, curr) => {
    if (curr.userId === userId) return [...res, curr];
    return res;
  }, []);

export const getAccountLoadingStatus = () => (state) => state[name].isLoading;
export const getAccountErrors = () => (state) => state[name].error;

export default accountReducer;
