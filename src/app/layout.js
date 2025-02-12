import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import "@uploadthing/react/styles.css";
import WhatsAppWidget from "@/components/ui/whatsapp-icon";

export const metadata = {
  title: "Trade show Booth Design | Booth Builder",
  description:
    "Chronicle Exhibits LLC. is a leading trade show booth display design company and exhibit builder in the USA. We offer both custom and rental booth services nationwide.",
  openGraph: {
    title: "Trade show Booth Design | Booth Builder",
    siteName: "chronicleexhibits.com",
    url: "https://chronicleexhibits.com/",
    description:
      "Chronicle Exhibits LLC. is a leading trade show booth display design company and exhibit builder in the USA. We offer both custom and rental booth services nationwide.",
    type: "website",
    images: ["https://chronicleexhibits.com/booth-design-bg.png"],
    locale: "en_US",
  },
  verification: {
    google: "52R0xHP_gQg6T7bSoOGz-PviftlVs0AppNw86tne_KU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="GTM-NR3F6S9R" />
      <head>
        <link
          rel="preload"
          href="/Oswald-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/Oswald-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/PT_Sans-Narrow-Web-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/PT_Sans-Narrow-Web-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-jost text-foreground bg-background">
        <GoogleAnalytics gaId="G-ET7LT8FESF" />
        <Toaster />
        <NextTopLoader />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
