import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import UseToast from "@/hooks/UseToast";
import { GetNewNotificationsCount } from "../../../APIGate/Notification";
import { RefreshToken } from "../../../APIGate/Merchant";
import { NotifCountContext } from "@/context/UserContext";
function Notification() {
  const router = useRouter();
  const [notifCountC, setNotifCountC] = useContext(NotifCountContext);
  const { showErrorToast } = UseToast();
  // useEffect(() => {
  //   GetNotificationsCount();
  // }, []);
  // const GetNotificationsCount = async () => {
  //   try {
  //     let isSubmited = await GetNewNotificationsCount();
  //     if (isSubmited.status === 200) {
  //       if (isSubmited.data.responseCode === 200) {
  //         localStorage.setItem(
  //           "NotifsViyyanCount",
  //           JSON.stringify(isSubmited.data.value.response)
  //         );
  //         setNotifCountC(Number(localStorage.getItem("NotifsViyyanCount")));
  //       } else {
  //         showErrorToast(isSubmited.data.message);
  //       }
  //     } else if (isSubmited.response && isSubmited.response.status == 401) {
  //       if (!localStorage.getItem("refreshTokenViraNex")) {
  //         router.push("/registration");
  //       } else {
  //         let ref = await RefreshToken();
  //         if (ref.data.responseCode === 200) {
  //           localStorage.setItem(
  //             "refreshTokenViraNex",
  //             ref.data.value.response.refreshToken
  //           );
  //           localStorage.setItem("tokenViraNex", ref.data.value.response.token);
  //           GetNotificationsCount();
  //         } else {
  //           router.push("/registration");
  //         }
  //       }
  //     } else {
  //       showErrorToast("خطای داخلی پیش آمده است.");
  //     }
  //   } catch (error) {
  //     showErrorToast("خطا در دریافت اطلاعات ");
  //   } finally {
  //   }
  // };
  return (
    <div className="flex gap-2">
    <div className="relative w-10 h-10 flex items-center justify-center  rounded-[12px] bg-white bg-opacity-10">
      <img
        onClick={() => {
          router.push("/setting/notifications");
        }}
        src="/svg/notification.svg"
        alt="notification"
        width={24}
        height={24}
      />
  
      {notifCountC > 0 && (
        <div className="absolute -top-2 -right-1 w-5 h-5 bg-red-600 text-white text-xs flex items-center justify-center rounded-full">
          {notifCountC}
        </div>
      )}
    </div>
  </div>
  
  );
}

export default Notification;
