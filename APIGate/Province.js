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
  return `${baseURL}/authApi/merchantApplication/Province${endpoint}`;
};

const makeRequest = async (
  method,
  endpoint,
  data = null,
  customQueryParams = {}
) => {
  try {
    const fullURL = await getFullURL(endpoint);
    const basicToken = "VmlyYVBheTpWITdAcEBZ";
    const queryParams = {
      Authorization: "Basic " + basicToken,
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

export const ProvinceDropDown = async () =>
  makeRequest("get", "/DropDown", null, null);
