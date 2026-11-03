import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Intercept request to add JWT Authorization token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("medisource_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept response to handle unauthorized / token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token if invalid or expired
      if (localStorage.getItem("medisource_token")) {
        localStorage.removeItem("medisource_token");
        localStorage.removeItem("medisource_user");
      }
    }
    return Promise.reject(error);
  }
);
