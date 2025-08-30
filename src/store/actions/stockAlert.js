import { createAsyncThunk } from "@reduxjs/toolkit";
import { call } from "../../services/api";
import { serverErrorMessage } from "../../utils/messages";
import { NotificationManager } from "react-notifications";
import { setAccessToken } from "../../services/api";
import { getStockAlertCount as getStockAlertCountFromCache, setStockAlertCount } from "../../utils/cache";

export const getStockAlertCount = createAsyncThunk(
  "stockAlert/getStockAlertCount",
  async (_, thunkAPI) => {
    try {
      const result = await call("get", "products/stock-alert");

      const fromCache = getStockAlertCountFromCache()

      const currentCount = fromCache ? fromCache : 0

      if (currentCount < result.data) {
        NotificationManager.warning("There are new stock alerts. Please check the stock alert page.");
      }
      setStockAlertCount(result.data)

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