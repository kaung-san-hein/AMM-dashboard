import { createSlice } from "@reduxjs/toolkit";
import { createRole, deleteRole, getRole, getRoles, updateRole } from "../actions/role";

const initialState = {
  loading: false,
  success: false,
  roles: [],
  role: {},
  total: 0,
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  extraReducers: (builder) => {
    // Get roles
    builder.addCase(getRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoles.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(getRoles.rejected, (state) => {
      state.loading = false;
    });

    // Create roles
    builder.addCase(createRole.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createRole.fulfilled, (state, action) => {
      state.success = true;
      state.roles = [action.payload, ...state.roles];
      state.total = state.total + 1;
    });
    builder.addCase(createRole.rejected, (state) => {
      state.success = false;
    });

    // Get role
    builder.addCase(getRole.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getRole.fulfilled, (state, action) => {
      state.loading = false;
      state.role = action.payload;
    });
    builder.addCase(getRole.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update role
    builder.addCase(updateRole.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateRole.fulfilled, (state, action) => {
      let index = state.roles.findIndex(
        (role) => role.id === action.payload.id
      );
      state.roles[index] = action.payload;
      state.success = true;
      state.role = action.payload;
    });
    builder.addCase(updateRole.rejected, (state) => {
      state.success = false;
    });

    // Delete role
    builder.addCase(deleteRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRole.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = state.roles.filter((role) => role.id !== action.payload);
      state.total = state.total - 1;
    });
    builder.addCase(deleteRole.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default roleSlice.reducer;
