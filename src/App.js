import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import { routes } from "./routes";
import { NotificationContainer } from "react-notifications";
import { setAccessToken } from "./services/api";
import { autoLogin } from "./store/actions/auth";
import decode from "jwt-decode";
import { getToken } from "./utils/cache";
import { setCurrentUser } from "./store/reducers/auth";
import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./routers/PrivateRoute";
import AuthRoute from "./routers/AuthRoute";

const token = getToken();

if (token) {
  setAccessToken(token);
  store.dispatch(autoLogin());
  store.dispatch(setCurrentUser(decode(token)));
}

const App = () => {
  const getRoutes = (routes, layout) => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views, layout);
      }
      if (prop.layout === layout) {
        return (
          <Route
            key={key}
            element={
              layout === "/admin" ? (
                <AuthRoute>{prop.component}</AuthRoute>
              ) : (
                <PrivateRoute>{prop.component}</PrivateRoute>
              )
            }
            path={prop.layout + prop.path}
          />
        );
      } else {
        return null;
      }
    });
  };

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminLayout />}>
              {getRoutes(routes, "/admin")}
              <Route
                path="/admin"
                element={<Navigate to="/admin/dashboard" />}
              />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              {getRoutes(routes, "/auth")}
              <Route path="/auth" element={<Navigate to="/auth/login" />} />
            </Route>
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </Routes>
        </BrowserRouter>

        <NotificationContainer />
      </Provider>
    </>
  );
};

export default App;
