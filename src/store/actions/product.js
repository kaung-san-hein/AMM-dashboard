import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (query, thunkAPI) => {
    try {
      const result = await call("get", `products?${new URLSearchParams(query).toString()}`);

      return result;
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `products/${id}`);
      const result = response.data;

      return result;
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "products", data);
      const result = response.data;

      NotificationManager.success("Product has been created successfully!");
      return result;
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        NotificationManager.error(data.message);
      } else if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (data, thunkAPI) => {
    try {
      const response = await call("patch", `products/${data.id}`, data);
      const result = response.data;

      NotificationManager.success("Product has been updated successfully!");
      return result;
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        NotificationManager.error(data.message);
      } else if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    try {
      await call("delete", `products/${id}`);

      NotificationManager.success("Product has been deleted successfully!");
      return id;
    } catch (error) {
      const { status, data } = error.response;

      if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);
