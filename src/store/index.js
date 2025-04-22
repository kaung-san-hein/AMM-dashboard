import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import roleReducer from "./reducers/role";
import categoryReducer from "./reducers/category";

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    category: categoryReducer,
  },
});

export default store;
