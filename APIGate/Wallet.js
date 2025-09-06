import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/walletApi/merchantApplication/Wallet";

export const GetBalanceWallet = async () => {
  return makeRequest("get", BASE_PATH, "/Balance", null, null);
};
