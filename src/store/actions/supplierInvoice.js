import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getSupplierInvoices = createAsyncThunk(
  "supplierInvoice/getSupplierInvoices",
  async (query, thunkAPI) => {
    try {
      const result = await call(
        "get",
        `supplier-invoices?${new URLSearchParams(query).toString()}`
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

export const getSupplierInvoice = createAsyncThunk(
  "supplierInvoice/getSupplierInvoice",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `supplier-invoices/${id}`);
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

export const createSupplierInvoice = createAsyncThunk(
  "supplierInvoice/createSupplierInvoice",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "supplier-invoices", data);
      const result = response.data;

      NotificationManager.success("Stock has been created successfully!");
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

export const deleteSupplierInvoice = createAsyncThunk(
  "supplierInvoice/deleteSupplierInvoice",
  async (id, thunkAPI) => {
    try {
      await call("delete", `supplier-invoices/${id}`);

      NotificationManager.success("Stock has been deleted successfully!");
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

export const getSupplierInvoiceReport = createAsyncThunk(
  "supplierInvoice/getSupplierInvoiceReport",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", "supplier-invoices/report");

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
