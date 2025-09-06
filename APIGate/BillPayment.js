import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/billinquiryapi/application/BillInquiry";

export const RegisterElectricityBill = async (body) => {
  return makeRequest("post", BASE_PATH, "/RegisterElectricityBill", body, null);
};
export const GetElecBillAmount = async (header) => {
  return makeRequest("get", BASE_PATH, "/GetElecBillAmount", null, header);
};
export const GetMciBillAmount = async (body) => {
  return makeRequest("post", BASE_PATH, "/GetMCIBillAmount", body, null);
};

export const GetTciBillAmount = async (body) => {
  return makeRequest("post", BASE_PATH, "/GetTCIBillAmount", body, null);
};

export const GetUserPhones = async (header) => {
  return makeRequest("get", BASE_PATH, "/GetUserPhones", null, header);
};
export const GetUserMobiles = async (header) => {
  return makeRequest("get", BASE_PATH, "/GetUserMobiles", null, header);
};
export const GetElecBills = async (header) => {
  return makeRequest("get", BASE_PATH, "/GetElecBills", null, header);
};

export const DeleteUserMobile = async (header) => {
  return makeRequest("get", BASE_PATH, "/DeleteUserMobile", null, header);
};

export const DeleteUserPhone = async (header) => {
  return makeRequest("get", BASE_PATH, "/DeleteUserPhone", null, header);
};
