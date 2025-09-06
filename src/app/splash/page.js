"use client";
import React, { useState, useEffect } from "react";
import UnderReview from "@/components/UnderReview";
import Modal from "react-modal";
import { browserName } from "react-device-detect";
import { useRouter } from "next/navigation";
import { RefreshToken } from "../../../APIGate/Merchant";
import Image from "next/image";
import "./index.css";
import UseToast from "@/hooks/UseToast";
import { motion } from "framer-motion";
const Splash = () => {
  const router = useRouter();
  const { showErrorToast, showSuccessToast, showWarningToast } = UseToast();
  const [connecting, setConnecting] = useState(true);
  const [isConnectionFailed, setIsConnectionFaild] = useState(false);
  const [homeModal, sethomeModal] = useState(false);
  const [openModalReview, setOpenModalReview] = useState(false);
  const [stateTitle, setStateTitle] = useState(false);
  const [stateDesc, setStateDesc] = useState(false);
  const [appVer, setAppVer] = useState("");
  const [osModal, setOsModal] = useState(false);

  const logoAnimation = {
    initial: { opacity: 0, scale: 0.4, rotate: -30 },
    animate: { opacity: 1, scale: 0.8, rotate: 0 },
    transition: { duration: 1.2, ease: "easeInOut" },
  };
  const storeImageAnimation = {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 2.5, ease: "easeInOut" },
  };

  useEffect(() => {
    router.push("/home");
  }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const updateOnlineStatus = () => {
  //       setConnecting(navigator.onLine);
  //     };

  //     setConnecting(navigator.onLine);

  //     window.addEventListener("online", updateOnlineStatus);
  //     window.addEventListener("offline", updateOnlineStatus);

  //     return () => {
  //       window.removeEventListener("online", updateOnlineStatus);
  //       window.removeEventListener("offline", updateOnlineStatus);
  //     };
  //   }
  // }, []);

  // useEffect(() => {
  //   fetch("/appsettings.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAppVer(data.appVersion);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching app version:", err);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (appVer) {
  //     const storedVersion = localStorage.getItem("viraNexAppVersion");

  //     if (!storedVersion) {
  //       localStorage.setItem("viraNexAppVersion", appVer);
  //     } else if (storedVersion != appVer) {
  //       localStorage.setItem("viraNexAppVersion", appVer);
  //       window.location.reload();
  //     }
  //   }
  // }, [appVer]);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (!window.matchMedia("(display-mode: standalone)").matches) {
  //       const home = localStorage.getItem("addhome");
  //       if (home !== "0") {
  //         if (browserName === "Mobile Safari") {
  //           sethomeModal(true);
  //         } else {
  //           sethomeModal(true);
  //         }
  //       } else {
  //         setTimeout(() => {
  //           RefreshTokenCheck();
  //         }, 2000);
  //       }
  //     } else {
  //       setTimeout(() => {
  //         RefreshTokenCheck();
  //       }, 2000);
  //     }

  //     window.addEventListener("load", function () {
  //       window.history.pushState({}, "");
  //     });
  //   }
  // }, []);

  const RefreshTokenCheck = async () => {
    if (!navigator.onLine) {
      return;
    }
    const refreshToken = localStorage.getItem("refreshTokenViraNex");

    if (!refreshToken) {
      if (
        typeof Notification !== "undefined" &&
        Notification.permission === "granted"
      ) {
        router.push("/registration");
      } else {
        router.push("/notificationPermision");
      }
      return;
    } else {
      let ref = await RefreshToken();
      if (ref.data && ref.data.responseCode === 200) {
        localStorage.setItem(
          "refreshTokenViraNex",
          ref.data.value.response.refreshToken
        );
        localStorage.setItem("tokenViraNex", ref.data.value.response.token);
        setStateDesc(ref?.data?.value?.response?.stateComment);
        setStateTitle(ref?.data?.value?.response?.stateTitle);
        // tokenViraNex
        if (
          ref.data.value.response.stateId === 1 ||
          ref.data.value.response.stateId === 4
        ) {
          router.push("/completeProfile");
        } else if (ref.data.value.response.stateId === 2) {
          setOpenModalReview(true);
        } else if (ref.data.value.response.stateId === 3) {
          router.push("/home");
        } else if (ref.data.value.response.stateId === 5) {
          setOpenModalReview(true);
          localStorage.removeItem("UserViraNexMobile");
          localStorage.removeItem("refreshTokenViraNex");
          localStorage.removeItem("tokenViraNex");
        } else {
          if (ref.data.message) {
            showErrorToast(ref.data.message);
          } else {
            showErrorToast("خطای داخلی پیش آمده است.");
          }
        }
      } else {
        if (ref.data == "You are offline") {
          return;
        } else if (ref.code === "ERR_NETWORK") {
          showErrorToast("خطای شبکه پیش آمده است.");
        } else {
          router.push("/registration");
        }
      }
    }
  };

  const handleRetry = () => {
    setIsConnectionFaild(false);
    RefreshTokenCheck();
  };

  return (
    <></>
    // <div className="flex flex-col items-center webkit-center back-splash ">
    //   <div className="mt-[33vh]">
    //     <motion.div {...logoAnimation}>
    //       <Image
    //         src="/png/Base.png"
    //         alt="Logo"
    //         width={200}
    //         height={70}
    //         priority
    //         className="image-animation mb-2 "
    //       />
    //     </motion.div>
    //   </div>
    //   {/* <motion.div {...storeImageAnimation}>
    //     <Image
    //       src="/img/png/storeImage.png"
    //       alt="storImage"
    //       width={120}
    //       height={94}
    //       priority
    //       className="image-animation"
    //     />
    //   </motion.div> */}
    //   <div className="mt-12 text-center flex flex-col items-center">
    //     {isConnectionFailed ? (
    //       <div>
    //         <p className=" text-red-600">! عدم برقراری ارتباط</p>
    //         <div
    //           onClick={handleRetry}
    //           className="bg-red-600 rounded-lg p-2 text-center text-white  font-light mt-8 cursor-pointer"
    //         >
    //           سعی مجدد
    //         </div>
    //       </div>
    //     ) : !connecting ? (
    //       <div className="text-center flex flex-col items-center mt-8">
    //         <p className=" text-red-600 font-bold">خطا در ارتباط</p>
    //         <div className="flex flex-col mt-5">
    //           <p className=" text-red-600">لطفا اینترنت خود را فعال نمایید</p>
    //           <div
    //             onClick={handleRetry}
    //             className="bg-red-600 rounded-lg p-2 text-center text-white  font-light mt-4 cursor-pointer"
    //           >
    //             سعی مجدد
    //           </div>
    //         </div>
    //       </div>
    //     ) : null}
    //   </div>
    //   <Modal
    //     isOpen={osModal}
    //     onRequestClose={() => setOsModal(false)}
    //     overlayClassName="osOverlay"
    //     contentLabel="Example Modal"
    //   ></Modal>
    //   <Modal
    //     isOpen={homeModal}
    //     onRequestClose={() => sethomeModal(false)}
    //     overlayClassName="osOverlay"
    //     contentLabel="Example Modal"
    //   >
    //     <div className="splashBack flex flex-col items-center bg-gray-200 w-full h-full box-border justify-between">
    //       {browserName === "Mobile Safari" ? (
    //         <>
    //           <img src={"/png/Base.png"} className="w-[120px] mt-5" />

    //           <div className=" w-[90%] rounded-lg h-auto bg-white shadow-gray-500 flex flex-col box-border px-5 py-10 items-center absolute top-[30%]">
    //             <p className="flex rtl items-center  w-full text-sm mt-10">
    //               از نوار پایین دکمه{" "}
    //               <img
    //                 src={"/png/icons8-share-rounded-96.png"}
    //                 className="p-1 pt-0 w-[8%]"
    //               />{" "}
    //               را انتخاب کنید.
    //             </p>
    //             <p className="rtl items-center  w-full text-sm mt-0">
    //               منوی باز شده را بالا بکشید و گزینه{" "}
    //               <span className="text-[#582768] px-1 font-bold">
    //                 Add to home
    //               </span>{" "}
    //               را انتخاب کنید .
    //             </p>
    //           </div>
    //         </>
    //       ) : (
    //         <>
    //           <img src={"/png/Base.png"} className="w-[140px] mt-5" />
    //           <div className="w-[90%] rounded-lg h-auto bg-white shadow-gray-500 flex flex-col box-border py-10 px-5 items-center absolute top-[30%]">
    //             <p className="text-black flex rtl items-center  w-full text-sm mt-10">
    //               از منوی مرورگر علامت
    //               <img
    //                 src={"/png/icons8-menu-50.png"}
    //                 className="p-1 pt-0 w-[8%]"
    //               />{" "}
    //               را باز کرده و
    //             </p>
    //             <p className="text-black rtl items-center  w-full text-sm mt-0">
    //               از منوی باز شده گزینه
    //               <span className="text-[#582768] px-1 font-bold">
    //                 Add to home screen
    //               </span>{" "}
    //               را انتخاب کنید .
    //             </p>
    //           </div>
    //         </>
    //       )}
    //     </div>
    //   </Modal>
    //   <UnderReview
    //     openModal={openModalReview}
    //     imgSrc={"/img/png/UnderReview.png"}
    //     Des={stateDesc}
    //     title={stateTitle}
    //   />
    // </div>
  );
};

export default Splash;
