import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/echargenetApi/merchantApplication/Charge";

export const ChargeReserve = async (body) => {
  return makeRequest("post", BASE_PATH, "/Reserve", body, null);
};

export const Pay = async (orderId) => {
  return makeRequest("get", BASE_PATH, "/Pay", null, orderId);
};
