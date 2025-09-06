import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/authApi/merchantApplication/Blog";

export const GetAllBlogs = async () => {
  return makeRequest("post", BASE_PATH, "/GetAll", null, null);
};
