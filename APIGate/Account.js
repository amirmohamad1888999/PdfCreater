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
  return `${baseURL}/Account${endpoint}`;
};
const makeRequest = async (
  method,
  endpoint,
  data = null,
  customHeaders = {}
) => {
  try {
    const fullURL = await getFullURL(endpoint);
    const token = localStorage.getItem("bearerTokenPezhvak");
    const headers = { Authorization: "Bearer " + token, ...customHeaders };

    const response = await axios({
      method,
      url: fullURL,
      headers,
      params: method.toLowerCase() === "get" ? data : undefined,
      data: method.toLowerCase() === "post" ? data : undefined,
    });

    return response;
  } catch (err) {
    console.error(`خطا در درخواست ${endpoint}:`, err);
    return err;
  }
};
export const GetToken = async (phone, ime, ver) =>
  makeRequest("get", `/${phone}/${ime}/${ver}`, null);

export const Register = async (body, AppVer) => {
  const customHeaders = { AppVer };
  return makeRequest("post", "", body, customHeaders);
};
