"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-around w-full mt-[50%]">
      <div
        onClick={() => router.push("/home/userMaterialReport")}
        className="bg-green-600 text-white text-[13px] p-3 rounded-lg "
      >
        گزارش مصرف مواد
      </div>
      <div
        onClick={() => router.push("/home/madariReport")}
        className="bg-orange-600 text-white text-[13px] p-3 rounded-lg"
      >
        ورود خروج
      </div>
      <div
        onClick={() => router.push("/home/dailyReport")}
        className="bg-gray-600 text-white text-[13px] p-3 rounded-lg"
      >
        گزارش روزانه
      </div>
    </div>
  );
}
