import { makeRequest } from "./axiosConfig";
const BASE_PATH = "/walletApi/merchantApplication/Transaction";

export const ReportsGetAll = async (body, headers) => {
  return makeRequest("post", BASE_PATH, "/GetAll", body, headers);
};
