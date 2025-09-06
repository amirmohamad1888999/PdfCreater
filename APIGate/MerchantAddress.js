import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/AuthApi/merchantApplication/MerchantAddress";

export const AllAddresses = async () => {
  return makeRequest("get", BASE_PATH, "/DropDown", null, null);
};

export const AddAdress = async (body) => {
  return makeRequest("post", BASE_PATH, "/Add", body);
};

export const DeleteAddress = async (id) => {
  const customHeaders = { id };
  return makeRequest("get", BASE_PATH, "/Delete", null, customHeaders);
};
