import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/echargenetApi/merchantApplication/Period";

export const GetAllPeriod = async () => {
  return makeRequest("get", BASE_PATH, "/GetAll", null, null);
};
