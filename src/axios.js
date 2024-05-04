import axios from "axios";
import { appConfig } from "./config";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(`${appConfig.LOCAL_STORAGE_KEY}`);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.log("error from axios request interceptor:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    if (response.config.url === `${appConfig.LOGIN_URL}`) {
      const token = response.data.data;
      if (token) {
        localStorage.setItem(`${appConfig.LOCAL_STORAGE_KEY}`, token);
      }
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axios;
