import { makeRequest } from "./axiosConfig"; // Import the makeRequest function
const BASE_PATH = "/AuthApi/merchantApplication/merchant";
import {
  browserName,
  deviceType,
  mobileVendor,
  engineVersion,
  isMobile,
} from "react-device-detect";
// Check the validity of the current token

export const CheckToken = async () => {
  return makeRequest("get", BASE_PATH, "/CheckToken", null);
};

// Register a new merchant
export const InitialSignUp = async (mobile) => {
  const customHeaders = { mobile };
  return makeRequest(
    "get",
    BASE_PATH,
    "/InitialSignUp",
    null,
    customHeaders,
    true
  );
};

// Confirm merchant registration
export const Confirm = async (headers) => {
  return makeRequest("get", BASE_PATH, "/Register", null, headers, true);
};

// Complete merchant information
export const CompeleteProfile = async (body) => {
  return makeRequest("post", BASE_PATH, "/CompleteInfo", body);
};

// Edit merchant information
export const Editmerchant = async (body) => {
  return makeRequest("post", BASE_PATH, "/EditmerchantInfo", body);
};

// Get merchant profile information
export const MyProfile = async () => {
  return makeRequest("get", BASE_PATH, "/GetInfo", null);
};

const updateNotificationData = async () => {
  if ("Notification" in window && "serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        const vapidPublicKey =
          "BOK_yBQA6UkxWU9wIRPqMpQuZicP1nhSnHInv_cy_-3C4lTPO11v69OoQtSEWbPRVYuRg8MnJSOORFQxQ7qkivY";
        const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
      }

      localStorage.setItem("endpoint", subscription?.endpoint);
      localStorage.setItem(
        "p256dh",
        arrayBufferToBase64(subscription.getKey("p256dh"))
      );
      localStorage.setItem(
        "auth",
        arrayBufferToBase64(subscription.getKey("auth"))
      );

      console.log("Notification data updated.");
    } catch (error) {
      console.error("Error updating notification data:", error);
    }
  } else {
    console.error(
      "Notifications or Service Worker not supported in this browser."
    );
  }
};

export const CheckAndRefreshToken = async () => {
  await updateNotificationData();
  const endpoint = localStorage.getItem("endpoint");
  const p256dh = localStorage.getItem("p256dh");
  const auth = localStorage.getItem("auth");

  const headers = {
    mobile: localStorage.getItem("UserViraNexMobile"),
    refreshToken: localStorage.getItem("refreshTokenViraNex"),
    deviceId:
      "device-" + mobileVendor + "-" + localStorage.getItem("uniqueUserId"),
    pNEndpoint: endpoint,
    pNP256Dh: p256dh,
    pNAuth: auth,
  };

  console.log("Headers for refresh:", headers); // Log headers for refresh

  try {
    const isSubmitted = await makeRequest(
      "get",
      BASE_PATH,
      "/RefreshToken",
      null,
      headers,
      true
    );

    console.log("Refresh Token Response:", isSubmitted); // Log entire response

    if (isSubmitted && isSubmitted.status === 200) {
      if (isSubmitted.data.responseCode === 200) {
        const merchantData = isSubmitted.data.value.response;
        localStorage.setItem("tokenViraNex", merchantData.token);
        localStorage.setItem("refreshTokenViraNex", merchantData.refreshToken);
        console.log("Tokens updated successfully."); // Log success
      } else {
        console.error("Unexpected responseCode:"); // Log unexpected responseCode

        return isSubmitted;
      }
    } else {
      console.error(
        "Failed to refresh token, response status:",
        isSubmitted.status
      ); // Log failure to refresh
    }

    return isSubmitted; // Return the response
  } catch (err) {
    console.error("Error refreshing token:", err); // Log the error
    return err; // Return null to indicate failure
  }
};

export const UploadFile = async (body) =>
  makeRequest("post", BASE_PATH, "/UploadFile", body, {
    "Content-Type": "multipart/form-data",
  });

export const DeleteFile = async (id) =>
  makeRequest("get", BASE_PATH, "/DeleteFile", null, { id });

// import axios from "axios";
// import { browserName, deviceType, mobileVendor } from "react-device-detect";
// import { v4 as uuidv4 } from "uuid";

// const arrayBufferToBase64 = (buffer) => {
//   const bytes = new Uint8Array(buffer);
//   return btoa(String.fromCharCode(...bytes));
// };

// const urlBase64ToUint8Array = (base64String) => {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
//   const rawData = window.atob(base64);
//   return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
// };

// const getBaseURL = async () => {
//   try {
//     const res = await fetch("/appsettings.json");
//     const data = await res.json();
//     return data.baseURL || "";
//   } catch (err) {
//     console.error("Error fetching baseURL:", err);
//     return "";
//   }
// };

// const getFullURL = async (endpoint) => {
//   const baseURL = await getBaseURL();
//   return `${baseURL}/authApi/merchantApplication/Merchant${endpoint}`;
// };

// const makeRequest = async (
//   method,
//   endpoint,
//   data = null,
//   customQueryParams = {}
// ) => {
//   try {
//     const fullURL = await getFullURL(endpoint);
//     const basicToken = "VmlyYVBheTpWITdAcEBZ";
//     const token = localStorage.getItem("tokenViraNex");
//     const queryParams = {
//       Authorization:
//         endpoint === "/CompleteInfo" ||
//         endpoint === "/GetInfo" ||
//         endpoint === "/UploadFile" ||
//         endpoint === "/CheckToken"
//           ? "Bearer " + token
//           : "Basic " + basicToken,
//       ...customQueryParams,
//     };
//     if (data instanceof FormData) {
//       queryParams["Content-Type"] = "multipart/form-data";
//     } else {
//       queryParams["Content-Type"] = "application/json";
//     }

//     const response = await axios({
//       method,
//       url: fullURL,
//       headers: queryParams,
//       params: method.toLowerCase() === "get" ? data : undefined,
//       data: method.toLowerCase() === "post" ? data : undefined,
//     });

//     return response;
//   } catch (err) {
//     console.error(`خطا در درخواست ${endpoint}:`, err);
//     return err;
//   }
// };

// const updateNotificationData = async () => {
//   if ("Notification" in window && "serviceWorker" in navigator) {
//     try {
//       const registration = await navigator.serviceWorker.ready;

//       let subscription = await registration.pushManager.getSubscription();

//       if (!subscription) {
//         const vapidPublicKey =
//           "BOK_yBQA6UkxWU9wIRPqMpQuZicP1nhSnHInv_cy_-3C4lTPO11v69OoQtSEWbPRVYuRg8MnJSOORFQxQ7qkivY";
//         const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

//         subscription = await registration.pushManager.subscribe({
//           userVisibleOnly: true,
//           applicationServerKey,
//         });
//       }

//       localStorage.setItem("endpoint", subscription?.endpoint);
//       localStorage.setItem(
//         "p256dh",
//         arrayBufferToBase64(subscription.getKey("p256dh"))
//       );
//       localStorage.setItem(
//         "auth",
//         arrayBufferToBase64(subscription.getKey("auth"))
//       );

//     } catch (error) {
//       console.error("Error updating notification data:", error);
//     }
//   } else {
//     console.error(
//       "Notifications or Service Worker not supported in this browser."
//     );
//   }
// };

// export const RefreshToken = async () => {
//   await updateNotificationData();

//   const mobile = localStorage.getItem("UserViraNexMobile");
//   const refreshToken = localStorage.getItem("refreshTokenViraNex");
//   const endpoint = localStorage.getItem("endpoint");
//   const p256dh = localStorage.getItem("p256dh");
//   const auth = localStorage.getItem("auth");

//   return makeRequest("get", "/RefreshToken", null, {
//     mobile,
//     deviceId:
//     "device-" + mobileVendor + "-" + localStorage.getItem("uniqueUserId"),    refreshToken,
//     pNEndpoint: endpoint,
//     pNP256Dh: p256dh,
//     pNAuth: auth,
//   });
// };

// export const InitialSignUp = async (mobile, captchaCode, captchaToken) => {
//   const customQueryParams = { mobile, captchaCode, captchaToken };
//   return makeRequest("get", "/InitialSignUp", null, customQueryParams);
// };

// export const Register = async (confirmCode) => {
//   localStorage.setItem("deviceId", "device-" + mobileVendor);
//   let uniqueId = localStorage.getItem("uniqueUserId");
//   if (!uniqueId) {
//     uniqueId = uuidv4();
//     localStorage.setItem("uniqueUserId", uniqueId);
//   }
//   return makeRequest("get", "/Register", null, {
//     mobile: localStorage.getItem("UserViraNexMobile"),
//     confirmCode: confirmCode,
//     browser: browserName,
//     deviceId: "device-" + mobileVendor + "-" + uniqueId,
//     deviceType: deviceType,
//     extraDeviceInfo: null,
//     pNEndpoint: localStorage.getItem("endpoint"),
//     pNP256Dh: localStorage.getItem("p256dh"),
//     pNAuth: localStorage.getItem("auth"),
//   });
// };

// export const CompleteInfo = async (body) =>
//   makeRequest("post", "/CompleteInfo", body);

// export const GetInfo = async () => makeRequest("get", "/GetInfo", null, null);

// export const UploadFile = async (body) =>
//   makeRequest("post", "/UploadFile", body, null);

// export const CheckToken = async () =>
//   makeRequest("get", "/CheckToken", null, null);
