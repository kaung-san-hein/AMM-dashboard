import { createSlice } from "@reduxjs/toolkit";
import {
  createCustomerInvoice,
  deleteCustomerInvoice,
  getCustomerInvoice,
  getCustomerInvoices,
} from "../actions/customerInvoice";

const initialState = {
  loading: false,
  success: false,
  customerInvoices: [],
  customerInvoice: {},
  total: 0,
};

const customerInvoiceSlice = createSlice({
  name: "customerInvoice",
  initialState,
  extraReducers: (builder) => {
    // Get customerInvoices
    builder.addCase(getCustomerInvoices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCustomerInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.customerInvoices = action.payload.data.customer_invoices;
      state.total = action.payload.data.total;
    });
    builder.addCase(getCustomerInvoices.rejected, (state) => {
      state.loading = false;
    });

    // Create customerInvoice
    builder.addCase(createCustomerInvoice.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createCustomerInvoice.fulfilled, (state, action) => {
      state.success = true;
      state.customerInvoices = [action.payload, ...state.customerInvoices];
      state.total = state.total + 1;
    });
    builder.addCase(createCustomerInvoice.rejected, (state) => {
      state.success = false;
    });

    // Get customerInvoice
    builder.addCase(getCustomerInvoice.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getCustomerInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.customerInvoice = action.payload;
    });
    builder.addCase(getCustomerInvoice.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Delete customerInvoice
    builder.addCase(deleteCustomerInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCustomerInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.customerInvoices = state.customerInvoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteCustomerInvoice.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default customerInvoiceSlice.reducer;
