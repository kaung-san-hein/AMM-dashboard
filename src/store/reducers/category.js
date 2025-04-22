import { createSlice } from "@reduxjs/toolkit";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../actions/category";

const initialState = {
  loading: false,
  success: false,
  categories: [],
  category: {},
  total: 0,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  extraReducers: (builder) => {
    // Get categories
    builder.addCase(getCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload.data;
      state.total = action.payload.total;
    });
    builder.addCase(getCategories.rejected, (state) => {
      state.loading = false;
    });

    // Create categories
    builder.addCase(createCategory.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createCategory.fulfilled, (state, action) => {
      state.success = true;
      state.categories = [action.payload, ...state.categories];
      state.total = state.total + 1;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.success = false;
    });

    // Get category
    builder.addCase(getCategory.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
    });
    builder.addCase(getCategory.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update category
    builder.addCase(updateCategory.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      let index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      state.categories[index] = action.payload;
      state.success = true;
      state.category = action.payload;
    });
    builder.addCase(updateCategory.rejected, (state) => {
      state.success = false;
    });

    // Delete category
    builder.addCase(deleteCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteCategory.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default categorySlice.reducer;
