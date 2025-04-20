import { createSlice } from "@reduxjs/toolkit";
import {
  createNewUserAsync,
  loginExistingUserAsync,
  logoutLoggedInUserAsync
} from "./index";

const initialState = {
  user: {},
  isAuthenticated: false,
  accessToken: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewUserAsync.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(createNewUserAsync.fulfilled, (state, { payload }) => {
      state.isAuthenticated = false;
      state.user = payload.data;
    });
    builder.addCase(createNewUserAsync.rejected, (state) => {
      state.isAuthenticated = false;
      state.user = {};
    });
    builder.addCase(loginExistingUserAsync.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(loginExistingUserAsync.fulfilled, (state, { payload }) => {
      state.isAuthenticated = false;
      state.accessToken = payload.accessToken;
      state.user = payload.user;
    });
    builder.addCase(loginExistingUserAsync.rejected, (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.user = {};
    });
    builder.addCase(logoutLoggedInUserAsync.pending, (state) => {
      state.isAuthenticated = true;
    });
    builder.addCase(logoutLoggedInUserAsync.rejected, (state) => {
      state.isAuthenticated = false;
    });
  },
});

export const selectAccessToken = (state) => state.auth.accessToken;

export const getAllUserDetail = (state) => state.auth;

export default authSlice.reducer;