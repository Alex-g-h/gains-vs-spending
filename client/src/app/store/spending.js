import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { customAlphabet } from "nanoid";
import spendingService from "../services/spending.service";
import { sortObjectByDate } from "../utils/sort";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const loadSpending = createAsyncThunk(
  "spending/load",
  async (thunkAPI) => {
    try {
      const { content } = await spendingService.get();
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createSpending = createAsyncThunk(
  "spending/create",
  async (payload, thunkAPI) => {
    try {
      const nanoid = customAlphabet("1234567890abcdef", 24);
      const spending = {
        _id: nanoid(),
        ...payload,
      };

      const { content } = await spendingService.create(spending);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSpendingById = createAsyncThunk(
  "spending/delete",
  async (id, thunkAPI) => {
    try {
      const { content } = await spendingService.delete(id);
      return content === null
        ? id
        : thunkAPI.rejectWithValue(`Can't delete spending with ID: ${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSpendingsByAccountId = createAsyncThunk(
  "spending/deleteByAccount",
  async (accountId, thunkAPI) => {
    try {
      const spendings = thunkAPI.getState()?.spending?.entities;
      if (!Array.isArray(spendings) || spendings.length === 0) {
        thunkAPI.rejectWithValue("Spendings are empty now. Nothing to delete.");
      }
      const spendingsCopy = [...spendings];
      spendingsCopy.forEach((spending) => {
        if (spending.account_id === accountId) {
          thunkAPI.dispatch(deleteSpendingById(spending._id));
        }
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateSpending = createAsyncThunk(
  "spending/update",
  async (payload, thunkAPI) => {
    try {
      const { content } = await spendingService.update(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const spendingSlice = createSlice({
  name: "spending",
  initialState,
  extraReducers: {
    [loadSpending.pending]: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    [loadSpending.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [loadSpending.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [createSpending.pending]: (state) => {
      state.error = null;
    },
    [createSpending.fulfilled]: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    },
    [createSpending.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteSpendingById.pending]: (state) => {
      state.error = null;
    },
    [deleteSpendingById.fulfilled]: (state, action) => {
      state.entities = state.entities.filter((s) => s._id !== action.payload);
    },
    [deleteSpendingById.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateSpending.pending]: (state) => {
      state.error = null;
    },
    [updateSpending.fulfilled]: (state, action) => {
      const newSpendings = state.entities.map((s) => {
        if (s._id === action.payload._id) return action.payload;
        return s;
      });
      state.entities = newSpendings;
    },
    [updateSpending.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteSpendingsByAccountId.pending]: (state) => {
      state.error = null;
    },
    [deleteSpendingsByAccountId.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: spendingReducer, name } = spendingSlice;

// Selectors
export const getSpendingLoadingStatus = () => (state) => state[name].isLoading;

/**
 * Get sorted by date spendings only for one user.
 * @param {*} userId User ID for spending
 * @returns Array of spendings for user
 */
export const getSpendings = (userId) => (state) => {
  const spendings = state[name].entities?.reduce((res, curr) => {
    if (curr.user_id === userId) return [...res, curr];
    return res;
  }, []);

  return spendings?.sort(sortObjectByDate);
};

export const getSpendingById = (id) => (state) =>
  state[name].entities?.find((s) => s._id === id);

export default spendingReducer;
