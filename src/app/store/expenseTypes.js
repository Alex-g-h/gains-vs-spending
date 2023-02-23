import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import expenseTypesService from "../services/expenseTypes.service";
import sortObjectByName from "../utils/sort/sortObjectByName";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const loadExpenseTypes = createAsyncThunk(
  "expenseTypes/load",
  async (thunkAPI) => {
    try {
      const data = await expenseTypesService.get();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expenseTypesSlice = createSlice({
  name: "expenseTypes",
  initialState,
  extraReducers: {
    [loadExpenseTypes.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadExpenseTypes.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [loadExpenseTypes.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: expenseTypesReducer, name } = expenseTypesSlice;

// Selectors
export const getExpenseTypesLoadingStatus = () => (state) =>
  state[name].isLoading;

// get sorted payment systems
export const getExpenseTypes = () => (state) => {
  const sortedArray = [...state[name].entities];
  return sortedArray?.sort(sortObjectByName);
};

export const getExpenseTypesId = () => (state) =>
  state[name].entities?.map((p) => p._id);

export const getExpenseTypesById = (id) => (state) =>
  state[name].entities?.find((p) => p._id === id);

export default expenseTypesReducer;
