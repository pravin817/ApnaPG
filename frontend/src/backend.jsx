import axios from "axios";
// import { toast } from "react-hot-toast";

export const API = "http://localhost:8080/api/v1/";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1/",
});

api.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(localStorage.getItem("accessToken"));

    // Set the access token in the Authorization header
    if (accessToken) {
      config.headers["authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
        const response = await axios.post(`${API}auth/refresh-token`, {
          refreshToken,
        });
        // console.log(response);

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", JSON.stringify(newAccessToken));

        originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh access token:", refreshError);
        // toast.error("Please log in!");
        throw refreshError;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
