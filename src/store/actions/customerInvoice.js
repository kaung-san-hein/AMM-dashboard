import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getMostSaleProducts = createAsyncThunk(
  "customerInvoice/getMostSaleProducts",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", "customer-invoices/most-sale-products");

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

export const getCustomerInvoices = createAsyncThunk(
  "customerInvoice/getCustomerInvoices",
  async (query, thunkAPI) => {
    try {
      const result = await call(
        "get",
        `customer-invoices?${new URLSearchParams(query).toString()}`
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

export const getCustomerInvoice = createAsyncThunk(
  "customerInvoice/getCustomerInvoice",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `customer-invoices/${id}`);
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

export const createCustomerInvoice = createAsyncThunk(
  "customerInvoice/createCustomerInvoice",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "customer-invoices", data);
      const result = response.data;

      NotificationManager.success("Sale has been created successfully!");
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

export const deleteCustomerInvoice = createAsyncThunk(
  "customerInvoice/deleteCustomerInvoice",
  async (id, thunkAPI) => {
    try {
      await call("delete", `customer-invoices/${id}`);

      NotificationManager.success("Sale has been deleted successfully!");
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

export const getCustomerInvoiceReport = createAsyncThunk(
  "customerInvoice/getCustomerInvoiceReport",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", "customer-invoices/report");

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