import { createSlice } from "@reduxjs/toolkit";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../actions/product";

const initialState = {
  loading: false,
  success: false,
  products: [],
  product: {},
  total: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    // Get products
    builder.addCase(getProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.data.products;
      state.total = action.payload.data.total;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.loading = false;
    });

    // Create products
    builder.addCase(createProduct.pending, (state) => {
      state.success = false;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.success = true;
      state.products = [action.payload, ...state.products];
      state.total = state.total + 1;
    });
    builder.addCase(createProduct.rejected, (state) => {
      state.success = false;
    });

    // Get product
    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
      state.success = false;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });

    // Update product
    builder.addCase(updateProduct.pending, (state) => {
      state.success = false;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      let index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.products[index] = action.payload;
      state.success = true;
      state.product = action.payload;
    });
    builder.addCase(updateProduct.rejected, (state) => {
      state.success = false;
    });

    // Delete product
    builder.addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.total = state.total - 1;
    });
    builder.addCase(deleteProduct.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
