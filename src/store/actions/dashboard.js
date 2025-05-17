import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";

export const getAllTotal = createAsyncThunk(
  "dashboard/getAllTotal",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", `dashboard/total`);
      console.log(result)
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
