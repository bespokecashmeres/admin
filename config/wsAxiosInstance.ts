// wsAxiosInstance.ts

import { COOKIES, FULL_PATH_ROUTES } from "@/constants";
import { clearLocalStorageTokenAndData } from "@/utils/common.utils";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import CONFIG from ".";
import { getUserLocale, getWholeSalerToken } from "./locale";
// import { toast } from 'react-toastify' // Import a toast library (e.g., react-toastify)

const wsAxiosInstance = axios.create({
  baseURL: CONFIG.apiUrl, // Replace with your API base URL
  timeout: 50000000, // Specify the timeout (optional)
});

// Request interceptor for adding headers or performing any actions before the request is sent
wsAxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = null;
    if (typeof window !== "undefined") {
      token = Cookies.get(COOKIES.wToken);
    } else {
      token = await getWholeSalerToken();
    }
    if (token && config.headers) {
      config.headers.Authorization = token;
    }
    const locale = await getUserLocale();
    config.headers["Accept-Language"] = locale;
    return config;
  },
  (error: AxiosError) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor for handling successful responses and errors
wsAxiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (
      response.data?.code === 401 &&
      (response.data?.statusCode === "SESSION_EXPIRE" ||
        response.data?.statusCode === "ACCOUNT_SUSPENDED")
    ) {
      if (typeof window !== "undefined") {
        clearLocalStorageTokenAndData();
      }
      toast.error(response.data?.message);
      window.location.href = FULL_PATH_ROUTES.wsAuthSignin;
    }
    // You can handle successful responses here
    return response; // Return only the data portion of the response
  },
  (error: AxiosError) => {
    // Handle response errors (e.g., network errors or HTTP error status codes)
    if (error.response) {
      const { status } = error.response;

      // Handle different status codes here
      switch (status) {
        case 401: // Unauthorized
          // Handle unauthorized access (e.g., redirect to login page)
          break;
        case 403: // Forbidden
          // Handle forbidden access (e.g., show an error message)
          // toast.error('Access denied. You do not have permission to perform this action.')
          break;
        case 404: // Not Found
          // Handle resource not found (e.g., show an error message)
          // toast.error('Resource not found.')
          break;
        default:
          // Handle other error status codes
          // toast.error('An error occurred. Please try again later.')
          break;
      }
    } else {
      // Handle network errors or other unexpected errors
      // toast.error('A network error occurred. Please check your internet connection.')
    }

    return Promise.reject(error);
  }
);

export default wsAxiosInstance;
