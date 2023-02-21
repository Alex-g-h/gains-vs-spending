import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import gainService from "../services/gain.service";
import { sortObjectByDate } from "../utils/sort";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const loadGains = createAsyncThunk("gain/load", async (thunkAPI) => {
  try {
    const { content } = await gainService.get();
    return content;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const createGain = createAsyncThunk(
  "gain/create",
  async (payload, thunkAPI) => {
    try {
      const gain = {
        _id: nanoid(28),
        ...payload,
      };

      const { content } = await gainService.create(gain);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteGainById = createAsyncThunk(
  "gain/delete",
  async (id, thunkAPI) => {
    try {
      const { content } = await gainService.delete(id);
      return content === null
        ? id
        : thunkAPI.rejectWithValue(`Can't delete gain with ID: ${id}`);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteGainsByAccountId = createAsyncThunk(
  "gain/deleteByAccount",
  async (accountId, thunkAPI) => {
    try {
      const gains = thunkAPI.getState()?.gain?.entities;
      if (!Array.isArray(gains) || gains.length === 0) {
        thunkAPI.rejectWithValue("Gains are empty now. Nothing to delete.");
      }
      const gainsCopy = [...gains];
      gainsCopy.forEach((gain) => {
        if (gain.account_id === accountId) {
          thunkAPI.dispatch(deleteGainById(gain._id));
        }
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGain = createAsyncThunk(
  "gain/update",
  async (payload, thunkAPI) => {
    try {
      const { content } = await gainService.update(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const gainSlice = createSlice({
  name: "gain",
  initialState,
  extraReducers: {
    [loadGains.pending]: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    [loadGains.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [loadGains.rejected]: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [createGain.pending]: (state) => {
      state.error = null;
    },
    [createGain.fulfilled]: (state, action) => {
      if (!Array.isArray(state.entities)) state.entities = [];
      state.entities.push(action.payload);
    },
    [createGain.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteGainById.pending]: (state) => {
      state.error = null;
    },
    [deleteGainById.fulfilled]: (state, action) => {
      state.entities = state.entities.filter((g) => g._id !== action.payload);
    },
    [deleteGainById.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [updateGain.pending]: (state) => {
      state.error = null;
    },
    [updateGain.fulfilled]: (state, action) => {
      const newGains = state.entities.map((g) => {
        if (g._id === action.payload._id) return action.payload;
        return g;
      });
      state.entities = newGains;
    },
    [updateGain.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [deleteGainsByAccountId.pending]: (state) => {
      state.error = null;
    },
    [deleteGainsByAccountId.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: gainReducer, name } = gainSlice;

// Selectors
export const getGainsLoadingStatus = () => (state) => state[name].isLoading;

/**
 * Get sorted by date gains only for one user.
 * @param {*} userId User ID for gains
 * @returns Array of gains for user
 */
export const getGains = (userId) => (state) => {
  const gains = state[name].entities?.reduce((res, curr) => {
    if (curr.user_id === userId) return [...res, curr];
    return res;
  }, []);

  return gains?.sort(sortObjectByDate);
};

export const getGainById = (id) => (state) =>
  state[name].entities?.find((g) => g._id === id);

export default gainReducer;
