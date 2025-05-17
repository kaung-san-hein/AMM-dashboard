import { createSlice } from "@reduxjs/toolkit";
import { getAllTotal } from "../actions/dashboard";

const initialState = {
  loading: false,
  success: false,
  dashboard: {},
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: (builder) => {
    // Get getAllTotal
    builder.addCase(getAllTotal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTotal.fulfilled, (state, action) => {
      state.loading = false;
      state.dashboard = action.payload.data;
    });
    builder.addCase(getAllTotal.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default dashboardSlice.reducer;
