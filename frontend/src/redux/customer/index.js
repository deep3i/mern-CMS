import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    createComments,
    createCustomers,
    getCustomers
} from "../../services/customer";
import { notifySuccess, notifyError } from "../../components/common/ToastFunction";

export const createCustomersAsync = createAsyncThunk(
    "customer/createCustomers",
    async (params, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await createCustomers(params);
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

export const createCommentsAsync = createAsyncThunk(
    "customer/createComments",
    async (params, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await createComments(params);
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
    async (params, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await getCustomers(params);
            if (response.data) {
                const { success, message, customers } = response.data;
                if (success) {
                    notifySuccess(message);
                }
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