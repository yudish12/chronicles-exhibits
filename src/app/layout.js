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
  name: "Chronicle Exhibits LLC.",
  url: "https://chronicleexhibits.com/",
  logo: "https://chronicleexhibits.com/chronicle-logo-2.svg",
  description:
    "Chronicle Exhibits LLC.is a leading trade show exhibit booth design and rental company in the USA.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8465 W. Sahara Ave., Suite 111,",
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
    "https://www.facebook.com/chronicleexhibits/",
    "https://x.com/chroniclexhibit",
    "https://www.youtube.com/@Chronicleexhibitsllc/",
    "https://www.linkedin.com/company/chronicle-exhibits-llc/",
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
    {
      "@type": "Place",
      name: "Miami",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-miami/",
    },
    {
      "@type": "Place",
      name: "Boston",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-boston/",
    },
    {
      "@type": "Place",
      name: "Denver",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-denver/",
    },
    {
      "@type": "Place",
      name: "Dallas",
      url: "https://chronicleexhibits.com/trade-show-booth-rentals-dallas/",
    },
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Trade Show Booth Design",
        serviceType: "Custom Trade Show Booth Design",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Trade Show Booth Rental",
        serviceType: "Trade Show Booth Rental",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Double Decker Booth Design",
        serviceType: "Double Decker Booth Design",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Modular Booth Construction",
        serviceType: "Modular Booth Construction",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Portable Exhibition Booths",
        serviceType: "Portable Exhibition Booths",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Turnkey Trade Show Booth Services",
        serviceType: "Turnkey Trade Show Booth Services",
      },
    },
  ],
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Chronicle Exhibits LLC",
  description:
    "Chronicle Exhibits LLC is a Las Vegas-based trade show booth design and exhibit rental company, offering custom and turnkey solutions for businesses across the U.S.",
  image: "https://chronicleexhibits.com/chronicle-logo-2.svg",
  "@id": "https://chronicleexhibits.com/",
  url: "https://chronicleexhibits.com/",
  telephone: "+1-725-333-1920",
  email: "info@chronicleexhibits.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "8465 W. Sahara Ave., Suite 111, Unit #1183",
    addressLocality: "Las Vegas",
    addressRegion: "NV",
    postalCode: "89117",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 36.1459,
    longitude: -115.277,
  },
  openingHours: ["Mo-Fr 09:00-18:00"],
  priceRange: "$$",
  areaServed: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
  },
  sameAs: [
    "https://www.facebook.com/chronicleexhibits/",
    "https://www.instagram.com/chronicleexhibits/",
    "https://www.linkedin.com/company/chronicle-exhibits-llc/",
    "https://www.youtube.com/@Chronicleexhibitsllc/",
    "https://twitter.com/chroniclexhibit/",
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
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
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
