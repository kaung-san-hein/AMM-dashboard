import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getCustomers = createAsyncThunk(
  "customer/getCustomers",
  async (query, thunkAPI) => {
    try {
      const result = await call(
        "get",
        `customers?${new URLSearchParams(query).toString()}`
      );

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

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `customers/${id}`);
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

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "customers", data);
      const result = response.data;

      NotificationManager.success("Customer has been created successfully!");
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

export const updateCustomer = createAsyncThunk(
  "customer/updateCustomer",
  async (data, thunkAPI) => {
    try {
      const response = await call("patch", `customers/${data.id}`, data);
      const result = response.data;

      NotificationManager.success("Customer has been updated successfully!");
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

export const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (id, thunkAPI) => {
    try {
      await call("delete", `customers/${id}`);

      NotificationManager.success("Customer has been deleted successfully!");
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
