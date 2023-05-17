import "../styles/globals.css";
// include styles from the ui package
import "ui/styles.css";

import localFont from "next/font/local";

const linotte = localFont({
  src: [
    {
      path: "../public/fonts/Linotte-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Linotte-Regular.woff2",
      weight: "400",
    },
    { path: "../public/fonts/Linotte-SemiBold.woff2", weight: "600" },
  ],
  variable: "--font-linotte",
  preload: true,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${linotte.variable} bg-white`}>
      <body>{children}</body>
    </html>
  );
}
