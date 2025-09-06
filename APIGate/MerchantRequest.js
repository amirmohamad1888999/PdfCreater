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
  return `${baseURL}/ProductApi/merchantApplication/MerchantRequest${endpoint}`;
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
      queryParams['Content-Type'] = 'multipart/form-data';
    } else {
      queryParams['Content-Type'] = 'application/json'; 
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

export const AcceptMerchantRequest = async (body) =>
  makeRequest("post", "/Accept", body);

export const DeclineMerchantRequest = async (body) =>
  makeRequest("post", "/Decline", body);

export const GetAll = async (pageSize, pageNumber) => {
  const customHeaders = { pageSize, pageNumber };
  return makeRequest("get", "/GetAllNewRequest", null , customHeaders);
}

export const Get = async (id) => makeRequest("get", "/Get", null , {id});

