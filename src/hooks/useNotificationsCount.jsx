import { useEffect, useState, useContext } from "react";
// import { useRouter } from "next/router";
import { GetNewNotificationsCount } from "../../APIGate/Notification";
import { RefreshToken } from "../../APIGate/Merchant";
import { NotifCountContext } from "@/context/UserContext";
import UseToast from "./UseToast";
export const useNotificationsCount = () => {
  const [notifCountC, setNotifCountC] = useContext(NotifCountContext);
//   const router = useRouter();
  const { showErrorToast } = UseToast();
  const GetNotificationsCount = async () => {
    try {
      let isSubmited = await GetNewNotificationsCount();
      if (isSubmited.status === 200) {
        if (isSubmited.data.responseCode === 200) {
          localStorage.setItem(
            "NotifsViyyanCount",
            JSON.stringify(isSubmited.data.value.response)
          );
          setNotifCountC(Number(localStorage.getItem("NotifsViyyanCount")));
        } else {
          showErrorToast(isSubmited.data.message);
        }
      } else if (isSubmited.response && isSubmited.response.status == 401) {
        if (!localStorage.getItem("refreshTokenViraNex")) {
        //   router.push("/registration");
        } else {
          let ref = await RefreshToken();
          if (ref.data.responseCode === 200) {
            localStorage.setItem(
              "refreshTokenViraNex",
              ref.data.value.response.refreshToken
            );
            localStorage.setItem("tokenViraNex", ref.data.value.response.token);
            GetNotificationsCount();
          } else {
            // router.push("/registration");
          }
        }
      } else {
        showErrorToast("خطای داخلی پیش آمده است.");
      }
    } catch (error) {
      showErrorToast("خطا در دریافت اطلاعات ");
    }
  };
  return {GetNotificationsCount};
};
