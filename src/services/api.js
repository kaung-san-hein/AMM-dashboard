import axios from "axios";
import { removeToken } from "../utils/cache";
import { setToken } from "../utils/cache";

export const host = "http://localhost:4000/api";

export const setAccessToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setToken(token);
  } else {
    delete axios.defaults.headers.common["Authorization"];
    removeToken();
  }
};

export const call = async (method, path, data) => {
  const response = await axios[method](`${host}/${path}`, data);
  return response.data;
};
