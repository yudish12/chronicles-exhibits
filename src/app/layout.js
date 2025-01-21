import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleTagManager } from '@next/third-parties/google'
import NextTopLoader from "nextjs-toploader";
import "@uploadthing/react/styles.css";
import Tawkto from "@/components/Tawkto";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// const optimaLT = localFont({
//   src: "./fonts/OptimaLT.woff",
//   variable: "--font-optima-lt",
//   weight: "100 900",
// });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NR3F6S9R" />
      <body >
        <Tawkto/>
        <Toaster />
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
