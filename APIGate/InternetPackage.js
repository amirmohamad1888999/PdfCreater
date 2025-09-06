import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/echargenetApi/merchantApplication/InternetPackage";

export const GetAllSimCardType = async (operatorId) => {
  return makeRequest("get", BASE_PATH, "/GetAll", null, operatorId);
};

export const GetAllInternetPackage = async (headers) => {
  return makeRequest("get", BASE_PATH, "/GetAll", null, headers);
};

export const InternetPackageReserve = async (body) => {
  return makeRequest("post", BASE_PATH, "/Reserve", body, null);
};

export const InternetPackagePay = async (orderId) => {
  return makeRequest("get", BASE_PATH, "/Pay", null, orderId);
};
