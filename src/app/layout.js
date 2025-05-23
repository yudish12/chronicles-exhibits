import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import "@uploadthing/react/styles.css";
import WhatsAppWidget from "@/components/ui/whatsapp-icon";
import localFont from "next/font/local";

const jost = localFont({
  src: [
    { path: "../fonts/Oswald-Light.ttf", weight: "400", style: "normal" },
    { path: "../fonts/Oswald-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
});

const ptSansNarrow = localFont({
  src: [
    {
      path: "../fonts/PT_Sans-Narrow-Web-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/PT_Sans-Narrow-Web-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pt-sans-narrow",
  display: "swap",
});

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
    google: "Ce4DoKijycNUuVq3AaV7BtPO3BWEyxB7fYKJyBzdqdc",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${jost.variable} ${ptSansNarrow.variable}`}>
      <GoogleTagManager gtmId="GTM-NR3F6S9R" />
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
