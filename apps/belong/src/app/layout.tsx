import "../styles/globals.css";
// include styles from the ui package
//import "ui/styles.css";

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
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Split Screen Layout</title>
      </head>
      <body style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}>
        {/* This is the most important part.
          This renders your actual pages (e.g., app/page.tsx) 
        */}
        {children}
      </body>
    </html>
  );
}
