import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createComments,
    createCustomers,
    getCustomers
} from "../../services/customer";
import { notifySuccess, notifyError } from "../../components/common/ToastFunction";

export const createCustomersAsync = createAsyncThunk(
    "customer/createCustomers",
    async (params, { rejectWithValue, fulfillWithValue, getState }) => {
        try {
            const state = getState();
            const { accessToken } = state.auth;
            console.log(params, accessToken);
            
            const response = await createCustomers(params, accessToken);
            if (response.data) {
                const { success, message } = response.data;
                if (success) {
                    notifySuccess(message);
                }
                if (params.callback) {
                    params.callback(success);
                }
                return fulfillWithValue();
            }
            return fulfillWithValue();
        } catch (err) {
            const { message } = err.response.data;
            notifyError(message);
            return rejectWithValue();
        }
    }
);

export const createCommentsAsync = createAsyncThunk(
    "customer/createComments",
    async (params, { rejectWithValue, fulfillWithValue, getState }) => {
        try {
            const state = getState();
            const { accessToken } = state.auth;
            const response = await createComments(params, accessToken);
            if (response.data) {
                const { success, message } = response.data;
                if (success) {
                    notifySuccess(message);
                }
                if (params.callback) {
                    params.callback(success);
                }
                return fulfillWithValue();
            }
            return fulfillWithValue({
                data: {}
            });
        } catch (err) {
            const { message } = err.response.data;
            notifyError(message);
            return rejectWithValue();
        }
    }
);

export const getCustomersAsync = createAsyncThunk(
    "customer/getCustomers",
    async (params, { rejectWithValue, fulfillWithValue, getState }) => {
        try {
            const state = getState();
            const { accessToken } = state.auth;
            const response = await getCustomers(accessToken);
            if (response.data) {
                const { success, customers } = response.data;
                if (params.callback) {
                    params.callback(success);
                }
                return fulfillWithValue({
                    data: customers
                });
            }
            return fulfillWithValue({
                data: []
            });
        } catch (err) {
            const { message } = err.response.data;
            notifyError(message);
            return rejectWithValue();
        }
    }
);