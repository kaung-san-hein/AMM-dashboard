import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import roleReducer from "./reducers/role";
import categoryReducer from "./reducers/category";
import productReducer from "./reducers/product";
import customerReducer from "./reducers/customer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    category: categoryReducer,
    product: productReducer,
    customer: customerReducer,
  },
});

export default store;
