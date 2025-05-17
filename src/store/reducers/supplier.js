import { createSlice } from "@reduxjs/toolkit";
import {
  createSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../actions/supplier";

const initialState = {
  loading: false,
  success: false,
  suppliers: [],
  supplier: {},
  total: 0,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  extraReducers: (builder) => {
    // Get suppliers
    builder.addCase(getSuppliers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSuppliers.fulfilled, (state, action) => {
      state.loading = false;
      state.suppliers = action.payload.data.suppliers;
      state.total = action.payload.data.total;
    });
    builder.addCase(getSuppliers.rejected, (state) => {
      state.loading = false;
    });

    // Create suppliers
    builder.addCase(createSupplier.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createSupplier.fulfilled, (state, action) => {
      state.success = true;
      state.suppliers = [action.payload, ...state.suppliers];
      state.total = state.total + 1;
    });
    builder.addCase(createSupplier.rejected, (state) => {
      state.success = false;
    });

    // Get supplier
    builder.addCase(getSupplier.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getSupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.supplier = action.payload;
    });
    builder.addCase(getSupplier.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update supplier
    builder.addCase(updateSupplier.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateSupplier.fulfilled, (state, action) => {
      let index = state.suppliers.findIndex(
        (supplier) => supplier.id === action.payload.id
      );
      state.suppliers[index] = action.payload;
      state.success = true;
      state.supplier = action.payload;
    });
    builder.addCase(updateSupplier.rejected, (state) => {
      state.success = false;
    });

    // Delete supplier
    builder.addCase(deleteSupplier.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSupplier.fulfilled, (state, action) => {
      state.loading = false;
      state.suppliers = state.suppliers.filter(
        (supplier) => supplier.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteSupplier.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default supplierSlice.reducer;
