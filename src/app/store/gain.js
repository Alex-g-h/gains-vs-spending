import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";
import gainService from "../services/gain.service";

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
      console.log("createGain", payload);
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

  return gains?.sort(sortGainByDate);
};

export const getGainById = (id) => (state) =>
  state[name].entities?.find((g) => g._id === id);

// sort by date
function sortGainByDate(a, b) {
  const nameA = a.date.toUpperCase(); // ignore upper and lowercase
  const nameB = b.date.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
}

export default gainReducer;
