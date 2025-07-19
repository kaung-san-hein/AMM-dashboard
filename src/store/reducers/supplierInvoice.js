import { createSlice } from "@reduxjs/toolkit";
import {
  createSupplierInvoice,
  deleteSupplierInvoice,
  getSupplierInvoice,
  getSupplierInvoices,
  getSupplierInvoiceReport,
  getSupplierOrders,
  updateSupplierInvoiceStatus,
} from "../actions/supplierInvoice";

const initialState = {
  loading: false,
  success: false,
  supplierInvoices: [],
  supplierOrders: [],
  supplierInvoice: {},
  supplierInvoiceReport: {},
  total: 0,
};

const supplierInvoiceSlice = createSlice({
  name: "supplierInvoice",
  initialState,
  extraReducers: (builder) => {
    // Get supplierInvoices
    builder.addCase(getSupplierInvoices.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSupplierInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierInvoices = action.payload.data.supplier_invoices;
      state.total = action.payload.data.total;
    });
    builder.addCase(getSupplierInvoices.rejected, (state) => {
      state.loading = false;
    });

    // Get supplierOrders
    builder.addCase(getSupplierOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSupplierOrders.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierOrders = action.payload.data.supplier_invoices;
      state.total = action.payload.data.total;
    });
    builder.addCase(getSupplierOrders.rejected, (state) => {
      state.loading = false;
    });

    // Create supplierInvoice
    builder.addCase(createSupplierInvoice.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createSupplierInvoice.fulfilled, (state, action) => {
      state.success = true;
      state.supplierInvoices = [action.payload, ...state.supplierInvoices];
      state.total = state.total + 1;
    });
    builder.addCase(createSupplierInvoice.rejected, (state) => {
      state.success = false;
    });

    // Get supplierInvoice
    builder.addCase(getSupplierInvoice.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getSupplierInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierInvoice = action.payload;
    });
    builder.addCase(getSupplierInvoice.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Delete supplierInvoice
    builder.addCase(deleteSupplierInvoice.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSupplierInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierInvoices = state.supplierInvoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.supplierOrders = state.supplierInvoices.filter(
        (invoice) => invoice.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteSupplierInvoice.rejected, (state) => {
      state.loading = false;
    });

    // Get SupplierInvoiceReport
    builder.addCase(getSupplierInvoiceReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSupplierInvoiceReport.fulfilled, (state, action) => {
      state.loading = false;
      state.supplierInvoiceReport = action.payload.data;
    });
    builder.addCase(getSupplierInvoiceReport.rejected, (state) => {
      state.loading = false;
    });

    // Update supplier
    builder.addCase(updateSupplierInvoiceStatus.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateSupplierInvoiceStatus.fulfilled, (state, action) => {
      let index = state.supplierOrders.findIndex(
        (order) => order.id === action.payload.id
      );
      state.supplierOrders[index] = action.payload;
      state.supplierInvoices[index] = action.payload;
      state.success = true;
      state.supplierInvoice = action.payload;
    });
    builder.addCase(updateSupplierInvoiceStatus.rejected, (state) => {
      state.success = false;
    });
  },
});

export default supplierInvoiceSlice.reducer;
