import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import roleReducer from "./reducers/role";

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
  },
});

export default store;
