import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import paymentService from "../services/payment.service";
import sortObjectByName from "../utils/sort/sortObjectByName";

const initialState = {
  entities: [],
  isLoading: true,
  error: null,
};

export const loadPayments = createAsyncThunk(
  "payment/load",
  async (thunkAPI) => {
    try {
      const data = await paymentService.get();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers: {
    [loadPayments.pending]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [loadPayments.fulfilled]: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    [loadPayments.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

const { reducer: paymentReducer, name } = paymentSlice;

// Selectors
export const getPaymentLoadingStatus = () => (state) => state[name].isLoading;

// get sorted payment systems
export const getPayments = () => (state) => {
  const sortedArray = [...state[name].entities];
  return sortedArray?.sort(sortObjectByName);
};

export const getPaymentsId = () => (state) =>
  state[name].entities?.map((p) => p._id);

export const getPaymentById = (id) => (state) =>
  state[name].entities?.find((p) => p._id === id);

export default paymentReducer;
