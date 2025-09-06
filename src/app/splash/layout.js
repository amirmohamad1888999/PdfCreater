import localFont from "next/font/local";
const myFont = localFont({ src: "../../../public/fonts/dana-fanum.ttf" });
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "splash",
  description: "splash page",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs14", "next14", "pwa", "next-pwa"],
  authors: [{ name: "viraNex" }],
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
export default function RootLayout({ children }) {
  return (
    <>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="generator" content={metadata.generator} />
        <link rel="manifest" href={metadata.manifest} />
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
        <ToastContainer position="top-center" rtl={true} />

        {children}
      </body>
    </>
  );
}
