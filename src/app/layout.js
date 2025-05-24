import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import "@uploadthing/react/styles.css";
import WhatsAppWidget from "@/components/ui/whatsapp-icon";
import localFont from "next/font/local";
import Script from "next/script";

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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "chronicle exhibition llc.",
  url: "https://chronicleexhibits.com/",
  logo: "https://chronicleexhibits.com/chronicle-logo-2.svg",
  description:
    "chronicle exhibition llc. is a leading trade show booth design and rental company in the USA. We offer custom and rental exhibition booth services across major cities including Las Vegas, Chicago, Orlando, Anaheim, San Diego, Los Angeles, Atlanta, and New York.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8465 W. Sahara Ave Suite 111 Unit #1183",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89117",
    addressCountry: "US",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 (725) 333-1920",
    email: "info@chronicleexhibits.com",
    contactType: "Customer Service",
    areaServed: "US",
  },
  sameAs: [
    "https://www.facebook.com/chronicleexhibits",
    "https://twitter.com/chroniclexhibit",
    "https://www.youtube.com/@Chronicleexhibitsllc",
    "https://www.linkedin.com/company/chronicle-exhibits-llc",
  ],
  foundingDate: "2013",
  areaServed: [
    {
      "@type": "Place",
      name: "Las Vegas",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-las-vegas/",
    },
    {
      "@type": "Place",
      name: "Chicago",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-chicago/",
    },
    {
      "@type": "Place",
      name: "Orlando",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-orlando/",
    },
    {
      "@type": "Place",
      name: "Anaheim",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-anaheim/",
    },
    {
      "@type": "Place",
      name: "San Diego",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-san-diego/",
    },
    {
      "@type": "Place",
      name: "Los Angeles",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-los-angeles/",
    },
    {
      "@type": "Place",
      name: "Atlanta",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-atlanta/",
    },
    {
      "@type": "Place",
      name: "New York",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-new-york/",
    },
  ],
  serviceType: [
    "Custom Trade Show Booth Design",
    "Trade Show Booth Rental",
    "Double Decker Booth Design",
    "Modular Booth Construction",
    "Portable Exhibition Booths",
    "Turnkey Trade Show Booth Services",
  ],
};

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
      <head>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
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
