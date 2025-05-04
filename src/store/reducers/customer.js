import { createSlice } from "@reduxjs/toolkit";
import {
  createCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../actions/customer";

const initialState = {
  loading: false,
  success: false,
  customers: [],
  customer: {},
  total: 0,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    // Get customers
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload.data.customers;
      state.total = action.payload.data.total;
    });
    builder.addCase(getCustomers.rejected, (state) => {
      state.loading = false;
    });

    // Create customers
    builder.addCase(createCustomer.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.success = true;
      state.customers = [action.payload, ...state.customers];
      state.total = state.total + 1;
    });
    builder.addCase(createCustomer.rejected, (state) => {
      state.success = false;
    });

    // Get customer
    builder.addCase(getCustomer.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customer = action.payload;
    });
    builder.addCase(getCustomer.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update customer
    builder.addCase(updateCustomer.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      let index = state.customers.findIndex(
        (customer) => customer.id === action.payload.id
      );
      state.customers[index] = action.payload;
      state.success = true;
      state.customer = action.payload;
    });
    builder.addCase(updateCustomer.rejected, (state) => {
      state.success = false;
    });

    // Delete customer
    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = state.customers.filter(
        (customer) => customer.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteCustomer.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default customerSlice.reducer;
