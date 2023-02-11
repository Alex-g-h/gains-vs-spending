import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      error: null,
    }
  : {
      auth: null,
      isLoggedIn: false,
      error: null,
    };

const userUpdateRequested = createAction("user/userUpdate");
const userUpdateFailed = createAction("user/userUpdateFailed");

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ email, password, name, ...rest }, thunkAPI) => {
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      thunkAPI.dispatch(
        createUser({
          _id: data.localId,
          email,
          name,
          ...rest,
        })
      );
      return { userId: data.localId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  "user/signin",
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      console.log(data);
      return { userId: data.localId };
    } catch (error) {
      const { code, message } = error.response.data.error;
      console.log(code, message);
      let errorOutMessage = "";
      if (code === 400) {
        const errorMessage = generateAuthError(message);
        errorOutMessage = errorMessage;
      } else {
        errorOutMessage = error.message;
      }
      return thunkAPI.rejectWithValue(errorOutMessage);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", () => {
  localStorageService.removeAuthData();
});

const createUser = createAsyncThunk(
  "user/create",
  async (payload, thunkAPI) => {
    try {
      const { content } = await userService.create(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = (payload) => async (dispatch, getState) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    // history.push(`/users/${payload._id}`);
    return content;
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [signUp.pending]: (state) => {
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [signIn.pending]: (state) => {
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [logOut.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
    },
  },
});

const { reducer: userReducer, name } = userSlice;

// Selectors
export const getIsLoggedIn = () => (state) => state[name].isLoggedIn;
export const getCurrentUserId = () => (state) => state[name].auth.userId;
export const getCurrentUserData = () => (state) => {
  return state[name]?.entities?.find((u) => u._id === state[name].auth?.userId);
};
export const getAuthErrors = () => (state) => state[name].error;

export default userReducer;
