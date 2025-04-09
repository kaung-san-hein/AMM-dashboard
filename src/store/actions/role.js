import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getRoles = createAsyncThunk(
  "role/getRoles",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", "roles");

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

export const getRole = createAsyncThunk(
  "role/getRole",
  async (id, thunkAPI) => {
    try {
      const response = await call("get", `roles/${id}`);
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

export const createRole = createAsyncThunk(
  "role/createRole",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "roles", data);
      const result = response.data;

      NotificationManager.success("Role has been created successfully!");
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

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async (data, thunkAPI) => {
    try {
      const response = await call("patch", `roles/${data.id}`, data);
      const result = response.data;

      NotificationManager.success("Role has been updated successfully!");
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

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (id, thunkAPI) => {
    try {
      await call("delete", `roles/${id}`);

      NotificationManager.success("Role has been deleted successfully!");
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
