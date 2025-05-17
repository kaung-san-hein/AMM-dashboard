import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import roleReducer from "./reducers/role";
import categoryReducer from "./reducers/category";
import productReducer from "./reducers/product";
import customerReducer from "./reducers/customer";
import customerInvoiceReducer from "./reducers/customerInvoice";
import supplierReducer from "./reducers/supplier";

const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    category: categoryReducer,
    product: productReducer,
    customer: customerReducer,
    customerInvoice: customerInvoiceReducer,
    supplier: supplierReducer,
  },
});

export default store;
