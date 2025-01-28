import localFont from "next/font/local";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import NextTopLoader from "nextjs-toploader";
import "@uploadthing/react/styles.css";
import Tawkto from "@/components/Tawkto";
import WhatsAppWidget from "@/components/ui/whatsapp-icon";

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
      <head>
      <meta property="og:title" content="Trade show Booth Design | Booth Builder"/>
      <meta property="og:site_name" content="chronicleexhibits.com"/>
      <meta property="og:url" content="https://chronicleexhibits.com/"></meta>
      <meta property="og:description" content="Chronicle Exhibits LLC. is a leading trade show booth display design company and exhibit builder in the USA. We offer both custom and rental booth services nationwide."/>
      <meta property="og:type" content="website"/>
      <meta property="og:image" content="https://chronicleexhibits.com/booth-design-bg.png"/>
      <meta property="og:locale" content="en_US" />
      </head>
      <body >
        <Tawkto/>
        <GoogleAnalytics gaId="G-ET7LT8FESF" />
        <Toaster />
        <NextTopLoader />
        {children}
        <WhatsAppWidget/>
      </body>
    </html>
  );
}
