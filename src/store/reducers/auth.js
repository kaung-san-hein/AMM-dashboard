import { createSlice } from "@reduxjs/toolkit";
import { login, autoLogin, logout, changePassword } from "../actions/auth";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!Object.keys(action.payload).length;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = !!Object.keys(action.payload).length;
    });
    builder.addCase(login.rejected, (state) => {
      state.loading = false;
      state.user = {};
    });
    // Auto Login
    builder.addCase(autoLogin.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!Object.keys(action.payload).length;
    });
    builder.addCase(autoLogin.rejected, (state) => {
      state.user = {};
    });
    // Logout
    builder.addCase(logout.fulfilled, (state) => {
      state.user = {};
      state.isAuthenticated = false;
    });
    // Change Password
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
export const { setCurrentUser } = authSlice.actions;
