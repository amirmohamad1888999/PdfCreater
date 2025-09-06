import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/AuthApi/merchantApplication/Supporter";

export const GetSupportById = async (header) => {
  return makeRequest("get", BASE_PATH, "/GetByCode", null, header);
};
