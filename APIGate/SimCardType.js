import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/echargenetApi/merchantApplication/SimCardType";

export const GetAllSimCardType = async (operatorId) => {
  return makeRequest("get", BASE_PATH, "/GetAll", null, operatorId);
};
