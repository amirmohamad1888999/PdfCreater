import axios from "axios";
import {
  browserName,
  deviceType,
  mobileVendor,
  engineVersion,
  isMobile,
} from "react-device-detect";
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
  return `${baseURL}/authApi/merchantApplication${endpoint}`;
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

export const GetAbout = async () =>
  makeRequest("get", "/About/GetAbout", null, null);

export const GetAllSlides = async () => {
  return makeRequest("get", "/Slide/GetAll", null);
};
