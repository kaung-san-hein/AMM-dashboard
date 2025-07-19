import { createSlice } from "@reduxjs/toolkit";
import { getStockAlertCount } from "../actions/stockAlert";

const initialState = {
  loading: false,
  stockAlertCount: 0,
};

const stockAlertSlice = createSlice({
  name: "stockAlert",
  initialState,
  extraReducers: (builder) => {
    // Get stock alert count
    builder.addCase(getStockAlertCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStockAlertCount.fulfilled, (state, action) => {
      state.loading = false;
      state.stockAlertCount = action.payload.data || 0;
    });
    builder.addCase(getStockAlertCount.rejected, (state) => {
      state.loading = false;
      state.stockAlertCount = 0;
    });
  },
});

export default stockAlertSlice.reducer; 