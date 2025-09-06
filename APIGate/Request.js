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
  return `${baseURL}/PaymentTerminalAPi/merchantApplication${endpoint}`;
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


export const GetAllRequests = async (pageSize, pageNumber ,body) => {
    const customHeaders = { pageSize, pageNumber };
    return makeRequest("post", "/MerchantRequest/GetAll", body , customHeaders);
}

export const AddNewRequest = async (body) => makeRequest("post", "/MerchantRequest/Add", body);

export const Edit = async (body) => makeRequest("post", "/Edit", body);

export const Delete = async (id) => makeRequest("get", "/Delete", null , {id});

export const Get = async (id) => makeRequest("get", "/Get", null , {id});

export const UploadFile = async (body) => makeRequest("post", "/MerchantRequest/UploadFile", body,null);

export const DeleteFile = async (id) => makeRequest("get", "/MerchantRequest/DeleteFile", null , {id});

export const RequestTypeDropDown = async () => {
  return makeRequest("get", "/RequestType/DropDown", null, null);
};

export const MerchantRequestStateDropDown = async () => {
  return makeRequest("get", "/MerchantRequestState/DropDown", null, null);
};