import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/notificationApi/merchantApplication/Notification";

export const GetNewNotifications = async () => {
  return makeRequest("get", BASE_PATH, "/GetNewNotifications", null, null);
};
export const GetNewNotificationsCount = async () => {
  return makeRequest("get", BASE_PATH, "/GetNewNotificationsCount", null, null);
};
export const GetNotificationById = async (id) => {
  return makeRequest("get", BASE_PATH, "/GetNotificationById", null, id);
};
