import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/ProductAPI/merchantApplication/Cart";

export const GetAllCart = async () => {
  return makeRequest("get", BASE_PATH, "/GetAll", null, null);
};
export const GetCartById = async (id) => {
  const customHeaders = { id };
  return makeRequest("get", BASE_PATH, "/Get", null, customHeaders);
};

export const RemoveCartById = async (id) => {
  const customHeaders = { id };
  return makeRequest("get", BASE_PATH, "/Remove", null, customHeaders);
};

export const AddOrder = async (body) => {
  return makeRequest("post", BASE_PATH, "/AddOrder", body, null);
};
