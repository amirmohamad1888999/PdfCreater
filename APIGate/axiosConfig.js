import axios from "axios";
import { CheckAndRefreshToken } from "./Merchant"; // Adjust the path to your API file
import { toast } from "react-toastify";
import ToastErrorIcon from "@/components/ToastErrorIcon";
import ToastClosBtn from "@/components/toastClosBtn";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "", // Base URL will be set dynamically
  timeout: 20000, // Optional: set a timeout for the requests
});

// State management for token refreshing
let isRefreshing = false; // Indicates if the token is being refreshed
let pendingRequests = []; // Queue to hold API requests while refreshing token

// Function to process the pending requests after refreshing the token
const processPendingRequests = (newToken) => {
  pendingRequests.forEach(({ resolve, originalRequest }) => {
    // Add the new token to the request headers and retry the request
    originalRequest.headers.Authorization = "Bearer " + newToken;
    resolve(apiClient(originalRequest)); // Retry the request with the new token
  });
  pendingRequests = []; // Clear the pending requests queue after processing
};

// Function to enqueue the requests while waiting for token refresh
const enqueueRequest = (originalRequest) => {
  return new Promise((resolve, reject) => {
    pendingRequests.push({ resolve, reject, originalRequest });
  });
};

apiClient.interceptors.response.use(
  (response) => response, // Return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors or timeouts
    if (!error.response) {
      // Network error (e.g., no internet connection or API not reachable)
      toast.error("خطا در برقراری با سرور", {
        className: "toastError",
        icon: <ToastErrorIcon />,
        // // closeButton: <ToastClosBtn />,
        closeOnClick: true,
      });

      // Return a resolved promise to prevent the error from propagating
      return Promise.resolve({
        data: null,
        status: 503,
        statusText: "Network Error",
      });
    }

    // Handle 401 errors
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent looping for the same request

      if (!isRefreshing) {
        isRefreshing = true; // Set the flag to indicate token refresh is in progress

        try {
          const refreshResponse = await CheckAndRefreshToken(); // Call the token refresh API

          if (
            refreshResponse?.status === 200 &&
            refreshResponse.data?.responseCode === 200
          ) {
            // Token refresh successful, get the new token
            const newToken = localStorage.getItem("tokenViraNex");

            // Process pending requests with the new token
            processPendingRequests(newToken);

            // Update the Authorization header and retry the failed request
            originalRequest.headers.Authorization = "Bearer " + newToken;
            return apiClient(originalRequest); // Retry the original request
          } else {
            // Token refresh failed, redirect to login
            // window.location.href = "/registration";
            return Promise.reject(error);
          }
        } catch (err) {
          // Handle errors during token refresh process
          pendingRequests.forEach(({ reject }) => reject(err)); // Reject all pending requests
          pendingRequests = []; // Clear the queue on failure
          return Promise.reject(err);
        } finally {
          // Reset the flag after token refresh is complete
          isRefreshing = false;
        }
      } else {
        // If token is already being refreshed, enqueue the request and wait for the token
        return enqueueRequest(originalRequest);
      }
    }

    // Handle other errors (non-401 errors)
    toast.error(error.response?.data?.message || "An error occurred", {
      className: "toastError",
      icon: <ToastErrorIcon />,
      // // closeButton: <ToastClosBtn />,
      closeOnClick: true,
    });

    return Promise.reject(error); // Reject the error to be caught in calling functions
  }
);

// Function to fetch the base URL
const getBaseURL = async () => {
  try {
    const res = await fetch("/appsettings.json");
    const data = await res.json();
    return data.base || "";
  } catch (err) {
    console.error("Error fetching baseURL:", err);
    return ""; // Ensure it returns a valid base URL
  }
};

// Function to get the full URL with custom base path
const getFullURL = async (basePath, endpoint) => {
  const baseURL = await getBaseURL();
  return `${baseURL}${basePath}${endpoint}`;
};

// Function to make a request using the API client
const makeRequest = async (
  method,
  basePath,
  endpoint,
  data = null,
  customHeaders = {},
  basic
) => {
  const fullURL = await getFullURL(basePath, endpoint);
  const token = localStorage.getItem("tokenViraNex");
  const headers = {
    Authorization: basic ? "Basic VmlyYVBheTpWITdAcEBZ" : "Bearer " + token,
    ...customHeaders,
  };

  const axiosConfig = {
    method,
    url: fullURL,
    headers,
    params: method.toLowerCase() === "get" ? data : undefined,
    data: method.toLowerCase() === "post" ? data : undefined,
  };

  return apiClient(axiosConfig); // Use the Axios instance to make the request
};

// Export the makeRequest function for use in API functions
export { makeRequest };
