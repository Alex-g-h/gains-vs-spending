import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import localStorageService from "../services/localStorage.service";
import generateAuthError from "../utils/generateAuthError";

const initialState = localStorageService.getAccessToken()
  ? {
      auth: { userId: localStorageService.getUserId() },
      user: localStorageService.getUser(),
      isLoggedIn: true,
      error: null,
    }
  : {
      auth: null,
      user: null,
      isLoggedIn: false,
      error: null,
    };

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ email, password, name, ...rest }, thunkAPI) => {
    try {
      const data = await authService.register({ email, password });
      localStorageService.setTokens(data);
      const user = {
        _id: data.localId,
        email,
        name,
        ...rest,
      };
      thunkAPI.dispatch(createUser(user));
      localStorageService.setUser(user);
      return { userId: data.localId, user };
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

      const user = await userService.getCurrentUser();
      localStorageService.setUser(user);
      return { userId: data.localId, user };
    } catch (error) {
      const { code, message } = error.response.data.error;
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

export const updateUser = createAsyncThunk(
  "user/update",
  async (payload, thunkAPI) => {
    try {
      const { content } = await userService.update(payload);
      return content;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: {
    [signUp.pending]: (state) => {
      state.error = null;
    },
    [signUp.fulfilled]: (state, action) => {
      state.auth = { userId: action.payload.userId };
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [signUp.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [signIn.pending]: (state) => {
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.auth = { userId: action.payload.userId };
      state.user = action.payload.user;
      state.isLoggedIn = true;
    },
    [signIn.rejected]: (state, action) => {
      state.error = action.payload;
    },
    [logOut.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.auth = null;
      state.user = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

const { reducer: userReducer, name } = userSlice;

// Selectors
export const getIsLoggedIn = () => (state) => state[name].isLoggedIn;
export const getCurrentUserId = () => (state) => state[name].auth.userId;
export const getCurrentUserData = () => (state) => state[name].user;
export const getAuthErrors = () => (state) => state[name].error;

export default userReducer;
