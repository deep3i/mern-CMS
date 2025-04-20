import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNewUser,
  loginExistingUser,
  logoutLoggedInUser,
} from "../../services/auth";
import { notifySuccess, notifyError } from "../../components/common/ToastFunction";

export const createNewUserAsync = createAsyncThunk(
  "auth/createUser",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await createNewUser(params);
      if (response.data) {
        const { success, newUser, message } = response.data;
        if (success) {
            notifySuccess(message);
        }
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue({
          data: newUser,
        });
      }
      return fulfillWithValue({
        data: {}
      });
    } catch (err) {
      const { message }  = err.response.data;
      notifyError(message);
      return rejectWithValue();
    }
  }
);

export const loginExistingUserAsync = createAsyncThunk(
  "auth/loginUser",
  async (params, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await loginExistingUser(params);
      if (response.data) {
        const { accessToken, success, message, user } = response.data;
        const role = user?.role;
        if (success && role !== 'user') {
          notifySuccess(message);
        }
        if (params.callback) {
          params.callback(success, role);
        }
        return fulfillWithValue({
          accessToken,
          user
        });
      }
      return fulfillWithValue({
        data: {}
      });
    } catch (err) {
      const { message }  = err.response.data;
      notifyError(message);
      return rejectWithValue();
    }
  }
);

export const logoutLoggedInUserAsync = createAsyncThunk(
  "auth/logoutUser",
  async (params, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const { accessToken } = state.auth;
      const response = await logoutLoggedInUser(accessToken);
      if (response.data) {
        const { success } = response.data;
        if (params.callback) {
          params.callback(success);
        }
        return fulfillWithValue();
      }
      return fulfillWithValue();
    } catch (err) {
      const { message }  = err.response.data;
      notifyError(message);
      return rejectWithValue();
    }
  }
);