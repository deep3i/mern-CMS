import { createSlice } from "@reduxjs/toolkit";
import {
    createCommentsAsync,
    createCustomersAsync,
    getCustomersAsync
} from "./index";

const initialState = {
    isCommentLoading: false,
    isCustomerLoading: false,
    customers: []
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCommentsAsync.pending, (state) => {
            state.isCommentLoading = true;
        });
        builder.addCase(createCommentsAsync.rejected, (state) => {
            state.isCommentLoading = false;
        });
        builder.addCase(createCustomersAsync.pending, (state) => {
            state.isCustomerLoading = true;
        });
        builder.addCase(createCustomersAsync.fulfilled, (state) => {
            state.isCustomerLoading = false;
        });
        builder.addCase(createCustomersAsync.rejected, (state) => {
            state.isCustomerLoading = false;
            state.customers = [];
        });
        builder.addCase(getCustomersAsync.pending, (state) => {
            state.isCustomerLoading = true;
        });
        builder.addCase(getCustomersAsync.fulfilled, (state, { payload }) => {
            state.isCustomerLoading = false;
            state.customers = payload.data;
        });
        builder.addCase(getCustomersAsync.rejected, (state) => {
            state.isCustomerLoading = false;
            state.customers = [];
        });
    },
});

export const getAllCustomerDetail = (state) => state.customer;

export default customerSlice.reducer;