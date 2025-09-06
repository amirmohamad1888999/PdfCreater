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

export const PspDropDown = async () =>
  makeRequest("get", "/Psp/DropDown", null, null);

export const TerminalTypeDropDown = async () =>
  makeRequest("get", "/TerminalType/DropDown", null, null);

export const DeviceBrandDropDown = async (terminalTypeIds) =>
  makeRequest("get", "/DeviceBrand/DropDown", null, { terminalTypeIds });

export const DeviceModelDropDown = async (deviceBrandIds) =>
  makeRequest("get", "/DeviceModel/DropDown", null, { deviceBrandIds });

export const StoreTerminalDropDown = async () =>
  makeRequest("get", "/Terminal/DropDown", null, null);

export const AddTerminal = async (body) =>
  makeRequest("post", "/Terminal/Add", body);

export const GetAllStoreTerminals = async (pageSize, pageNumber, body) => {
  const customHeaders = { pageSize, pageNumber };
  return makeRequest("post", "/Terminal/GetAll", body, customHeaders);
};

export const DeleteStoreTerminal = async (id) =>
  makeRequest("get", "/Terminal/Delete", null, { id });

export const EditStoreTerminal = async (body) =>
  makeRequest("post", "/Terminal/Edit", body);

export const GetGuaranteeState = async (id) =>
  makeRequest("get", "/Terminal/DeterminingGuaranteeState", null, { id });

export const CancelRequestMerchantRequest = async (requestId) =>
  makeRequest("get", "/MerchantRequest/CancelRequest", null, { requestId });
