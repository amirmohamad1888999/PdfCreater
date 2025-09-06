import React from "react";
import styles from "./index.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { BiSolidBook, BiSolidStore } from "react-icons/bi";
import { RiFileList3Fill } from "react-icons/ri";
import { IoHomeSharp, IoSettingsSharp } from "react-icons/io5";
const NavigationMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const menu = [
    {
      title: "خانه",
      icon: <IoHomeSharp color="gray" size={30} />,
      activeIcon: <IoHomeSharp color="#582768" size={30} />,
      path: "/home",
    },
    {
      title: "سفارش‌ها",
      icon: <RiFileList3Fill color="gray" size={30} />,
      activeIcon: <RiFileList3Fill color="#582768" size={30} />,
      path: "/orders",
    },
    {
      title: "فروشگاه",
      icon: <BiSolidStore color="gray" size={30} />,
      activeIcon: <BiSolidStore color="#582768" size={30} />,
      path: "/products",
    },
    {
      title: "آموزش",
      icon: <BiSolidBook color="gray" size={30} />,
      activeIcon: <BiSolidBook color="#582768" size={30} />,
      path: "/learning",
    },
    {
      title: "تنظیمات",
      icon: <IoSettingsSharp color="gray" size={30} />,
      activeIcon: <IoSettingsSharp color="#582768" size={30} />,
      path: "/setting",
    },
  ];
  return (
    <div className="z-[999999] bg-white h-[93px] w-full fixed bottom-0 ">
      {" "}
      {/* {pathname === "/setting/" && (
        <div className={styles.callAdminBox}>
        <div>پشتیبانی</div>
        <div className={styles.callText}>
          <a href="tel:02191093349">021-91093349</a>
        </div>
        <div className={styles.callIcon}>
          <BiSupport className="ml-1 mb-[2px]" size={30} />
        </div>
      </div>
      )} */}
      <div className={`${styles.container}`}>
        {menu.map((e, index) => {
          return (
            <div
              key={index}
              onClick={() => router.push(e.path)}
              className={`mx-auto mt-2 flex flex-col justify-center items-center w-1/5`}
            >
              {/* اگر آیکون یک رشته (مسیر تصویر) است، از Image استفاده کنید، در غیر این صورت مستقیماً رندر کنید */}
              {typeof e.icon === "string" ? (
                <Image
                  src={pathname.includes(e.path) ? e.activeIcon : e.icon}
                  alt={e.title}
                  width={30}
                  height={30}
                  priority
                />
              ) : pathname.includes(e.path) ? (
                e.activeIcon
              ) : (
                e.icon
              )}
              <div
                className={`${
                  pathname.includes(e.path)
                    ? "text-custom-purple"
                    : "text-custom-gray"
                } text-center mt-1 text-[12px] `}
                style={{
                  WebkitTextStroke: "0.5px",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                }}
              >
                {e.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default NavigationMenu;
