import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/echargenetApi/merchantApplication/Operator";

export const GetAllOperator = async () => {
  return makeRequest("get", BASE_PATH, "/DropDown", null, null);
};
