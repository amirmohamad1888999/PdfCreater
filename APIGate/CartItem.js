import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/productApi/merchantApplication/CartItem";

export const IncreaseCart = async (body) => {
  return makeRequest("post", BASE_PATH, "/Increase", body);
};
export const DecreaseCart = async (body) => {
  return makeRequest("post", BASE_PATH, "/Decrease", body);
};
