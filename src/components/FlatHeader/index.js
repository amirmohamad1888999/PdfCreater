"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCart } from "../../context/cartContext"; // Import the cart context
import style from "./index.module.css";
import Cart from "@/components/cart/index";
import { LuWallet } from "react-icons/lu";
import { GetNewNotifications } from "../../../APIGate/Notification";
const SettingHeader = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleCart, orders, CartCount, NotifCount } = useCart();
  return (
    <>
      <div
        className={`${style.headercontainer} fixed top-[60px] h-[100px] rtl`}
      >
        <div className="w-full mt-[0%] px-5">
          <div className="flex justify-between font-bold text-[#fff] text-[24px] mt-7 w-[100%]">
            <div className="flex">
              {pathname === "/duty/" || pathname === "/learning/" ? null : (
                <div className={style.backBtn} onClick={() => router.back()}>
                  <img
                    src="/svg/backArrow.svg"
                    alt="back"
                    width={24}
                    height={24}
                  />
                </div>
              )}

              <div
                className={style.headerTitle}
                style={{
                  WebkitTextStroke: "0.5px",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {title}
              </div>
            </div>
            <div className="flex">
              <div
                onClick={() => router.push("/wallet")}
                className="mt-[-5px] webkit-center pt-2 w-[40px] h-[40px] back-icon mr-2 "
              >
                <LuWallet
                  color="white"
                  size={20}
                  onClick={() => {
                    router.push("/wallet");
                  }}
                />
              </div>
              <div
                onClick={() => router.push("/setting/notification")}
                className="mt-[-5px] webkit-center pt-2 w-[40px] h-[40px] back-icon mr-2 "
              >
                <Image
                  src="/svg/notification.svg"
                  alt="notification"
                  width={24}
                  height={24}
                  priority
                />
                <div className="absolute top-5 mr-[-8px] bg-red-600 text-white text-[13px] w-[20px] h-[20px] pt-[2px] text-center rounded-full">
                  {NotifCount ? NotifCount : 0}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart />
    </>
  );
};

export default SettingHeader;
