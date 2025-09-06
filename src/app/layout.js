"use client";
import "./globals.css";
import { useState, useEffect } from "react";
import Head from "next/head";
import localFont from "next/font/local";
const myFont = localFont({ src: "../../public/fonts/dana-fanum.ttf" });
import UserContext from "@/context/UserContext";
import { CartProvider } from "@/context/cartContext";

// export const viewport = {
//   width: "device-width",
//   initialScale: 1,
//   maximumScale: 1,
//   userScalable: false,
// };
const metadata = {
  title: "اپلیکیشن مرغداری مداری",
  description: "PWA application with Next 14",
  generator: "Next.js",
  manifest: "/manifest.json",
  favicon: "/favicon.ico",
  keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  authors: [{ name: "madari" }],
};

export default function RootLayout({ children }) {
  const [isLandscape, setIsLandscape] = useState(false);
  const [appVer, setAppVer] = useState("");

  // useEffect(() => {
  //   const handleOrientationChange = () => {
  //     const { orientation } = window.screen;
  //     setIsLandscape(
  //       orientation.type === "landscape-primary" ||
  //         orientation.type === "landscape-secondary"
  //     );
  //   };
  //   handleOrientationChange();
  //   window.addEventListener("orientationchange", handleOrientationChange);
  //   return () => {
  //     window.removeEventListener("orientationchange", handleOrientationChange);
  //   };
  // }, []);

  useEffect(() => {
    fetch("/appsettings.json")
      .then((res) => res.json())
      .then((data) => {
        setAppVer(data.appVersion);
      })
      .catch((err) => {
        console.error("Error fetching app version:", err);
      });
  }, []);

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

  return (
    <UserContext>
      <CartProvider>
        <html lang="fa" dir="rtl">
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="generator" content={metadata.generator} />
            <link rel="manifest" href={metadata.manifest} />
            <link rel="shortcut icon" href={metadata.favicon} />
            <meta name="keywords" content={metadata.keywords.join(", ")} />
            {metadata.authors.map(({ name, url }, index) => (
              <meta
                key={index}
                name="author"
                content={name}
                {...(url && { href: url })}
              />
            ))}
          </head>
          <body className={myFont.className}>
            <>{children}</>
          </body>
        </html>
      </CartProvider>
    </UserContext>
  );
}
