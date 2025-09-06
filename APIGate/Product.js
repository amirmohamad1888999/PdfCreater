import axios from "axios";

const getBaseURL = async () => {
  try {
    const res = await fetch("/appsettings.json");
    const data = await res.json();
    return data.baseURL || "";
  } catch (err) {
    console.error("Error fetching baseURL:", err);
    return "";
  }
};

const getFullURL = async (endpoint) => {
  const baseURL = await getBaseURL();
  return `${baseURL}/ProductAPI/merchantApplication${endpoint}`;
};

const makeRequest = async (
  method,
  endpoint,
  data = null,
  customQueryParams = {}
) => {
  try {
    const fullURL = await getFullURL(endpoint);
    const token = localStorage.getItem("tokenViraNex");
    const queryParams = {
      Authorization: "Bearer " + token,
      ...customQueryParams,
    };
    if (data instanceof FormData) {
      queryParams["Content-Type"] = "multipart/form-data";
    } else {
      queryParams["Content-Type"] = "application/json"; // For non-file uploads
    }

    const response = await axios({
      method,
      url: fullURL,
      headers: queryParams,
      params: method.toLowerCase() === "get" ? data : undefined,
      data: method.toLowerCase() === "post" ? data : undefined,
    });

    return response;
  } catch (err) {
    console.error(`خطا در درخواست ${endpoint}:`, err);
    return err;
  }
};

export const GetAll = async (pageSize, pageNumber, body) => {
  const customHeaders = { pageSize, pageNumber };
  return makeRequest("post", "/Product/GetAll", body, customHeaders);
};

export const Increase = async (body) =>
  makeRequest("post", "/CartItem/Increase", body);

export const Decrease = async (body) =>
  makeRequest("post", "/CartItem/Decrease", body);

export const Get = async (body) => makeRequest("post", "/Product/Get", body);

export const GetAllCart = async () => {
  return makeRequest("get", "/Cart/GetAll", null, null);
};

// import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
// const BASE_PATH = "/productApi/merchantApplication/Cart";

// export const GetAllCart = async () => {
//   return makeRequest("get", BASE_PATH, "/GetAll", null, null);
// };
// export const GetCartById = async (id) => {
//   const customHeaders = { id };
//   return makeRequest("get", BASE_PATH, "/Get", null, customHeaders);
// };

// export const RemoveCartById = async (id) => {
//   const customHeaders = { id };
//   return makeRequest("get", BASE_PATH, "/Remove", null, customHeaders);
// };
