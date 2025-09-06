"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../../public/fonts/dana-fanum.ttf" });

export default function Page() {
  const [notificationStatus, setNotificationStatus] = useState(null); 
  const [clickCheck, setClickCheck] = useState(false); 
  const router = useRouter();

  const handleRequestPermission = async () => {
    setClickCheck(true);
    if ("Notification" in window) {
      const permissionStatus = await Notification.requestPermission();
      setNotificationStatus(permissionStatus);
      if (permissionStatus === "granted") {
        router.push("/registration");
      }
    } else {
      alert("مرورگر شما از اعلان‌ها پشتیبانی نمی‌کند.");
    }
  };

  useEffect(() => {
    if ("Notification" in window) {
      setNotificationStatus(Notification.permission); 
    } else {
      setNotificationStatus("unsupported"); 
    }
  }, []);

  
  

  return (
    <main className={`h-[100vh] flex flex-col items-center justify-center px-4 text-center ${myFont.className}`}>
      <div className="w-67 h-auto">
        <Image
          src="/img/png/pushNotification.png"
          alt="registraionimg"
          width={350}
          height={350}
          priority
        />
      </div>
      <h1 className="text-xl font-semibold mb-4 mt-4">
        ما برای ارسال اعلان‌ها به دسترسی شما نیاز داریم.
      </h1>
      <p className="text-gray-700 mb-8">
        با فعال کردن دسترسی اعلان، می‌توانید از اطلاعیه‌های مهم و به‌روز ما مطلع شوید.
      </p>
      
      {notificationStatus === null && (
        <p className="text-gray-500"></p>
      )}

      {notificationStatus !== "granted" && notificationStatus !== null && (
        <button
          onClick={handleRequestPermission}
          className=" bg-custom-green text-white rounded-lg mt-3 p-3"
        >
          فعالسازی دسترسی اعلان
        </button>
      )}

      {clickCheck && notificationStatus === "denied" && (
        <p className="text-red-600 mt-5">
          دسترسی به اعلان‌ها مسدود شده است. لطفاً از تنظیمات مرورگر آن را فعال کنید.
        </p>
      )}
    </main>
  );
}
