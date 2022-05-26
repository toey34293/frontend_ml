import axios from "axios";
import { notification } from "antd";

axios.defaults.baseURL = "https://beaver-api.samui.ml";

axios.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status !== 404) {
      notification.error({
        message:
          (error.response.data && error.response.data.detail) ||
          error.code ||
          "Unknown Subject",
        description:
          (error.response.data && error.response.data.detail) ||
          error.message ||
          "Unknown detail",
        duration: 5,
      });
    } else if (!error.response) {
      notification.error({
        message: "NETWORK_ERROR",
        description: "Something went wrong. Please try again later.",
        duration: 5,
      });
    }
    return Promise.reject(error);
  }
);

export { axios };
