import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const logout = createAsyncThunk("auth/logout", async () => {
  call("post", "auth/logout");
  setAccessToken(null);
});

export const login = createAsyncThunk("auth/signin", async (data, thunkAPI) => {
  try {
    const response = await call("post", "auth/signin", data);
    const { access_token, name, phone_no } = response.data;

    setAccessToken(access_token);
    return { name, phone_no };
  } catch (error) {
    const { status, data } = error.response;

    if (status === 400) {
      NotificationManager.error(data.message);
    } else if (status === 403) {
      setAccessToken(null);
      NotificationManager.error(data.message);
    } else {
      NotificationManager.error(serverErrorMessage);
    }
    throw thunkAPI.rejectWithValue(error.message);
  }
});

export const autoLogin = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await call("get", "auth/me");
    const { name, phone_no } = response.data;

    return { name, phone_no };
  } catch (error) {
    const { status, data } = error.response;

    if (status === 403) {
      setAccessToken(null);
      NotificationManager.error(data.message);
    } else if (status === 401) {
      setAccessToken(null);
      NotificationManager.error(data.message);
    } else {
      NotificationManager.error(serverErrorMessage);
    }
    throw thunkAPI.rejectWithValue(error.message);
  }
});

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (data, thunkAPI) => {
    try {
      const response = await call("post", "io-change-password", data);

      NotificationManager.success(response.data.message);
    } catch (error) {
      const { status, data } = error.response;
      if (status === 400) {
        const obj = data.data;
        NotificationManager.error(obj[Object.keys(obj)[0]]);
      } else if (status === 401) {
        setAccessToken(null);
        NotificationManager.error(data.data.message);
      } else {
        NotificationManager.error(serverErrorMessage);
      }
      throw thunkAPI.rejectWithValue(error.message);
    }
  }
);
