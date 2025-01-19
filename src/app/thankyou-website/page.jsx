"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

const ThankYouContent = () => {
  const searchParams = useSearchParams();
  const [websiteUrl, setWebsiteUrl] = useState("");

  useEffect(() => {
    const url = searchParams.get("website");
    if (url) {
      setWebsiteUrl(url);
    }
  }, [searchParams]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-100 text-center">
      <div className="max-w-3xl bg-white shadow-lg p-8 rounded-lg">
        <h1 className="text-4xl font-bold text-gray-900">THANK YOU!</h1>
        <p className="text-lg text-gray-600 mt-2">
          for submitting your information!
        </p>
        <p className="text-gray-600 mt-4">
          Please visit the official website to discover more about your selected
          event.
        </p>
        <p className="mt-2 text-gray-700 font-medium">Chronicle Exhibits Team</p>

        {websiteUrl ? (
          <Link href={websiteUrl} target="_blank">
            <button className="mt-6 bg-primary text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md hover:bg-black transition-all">
              VISIT OFFICIAL WEBSITE
            </button>
          </Link>
        ) : (
          <p className="mt-6 text-primary font-medium">
            Website URL not found.
          </p>
        )}
      </div>

      <footer className="mt-12 text-gray-800 text-center">
        <p className="text-lg font-semibold">
          Free support:{" "}
          <a href="tel:+17169417998" className="text-primary font-bold">
            +1 716 941 7998
          </a>
          <br />
          Email:{" "}
          <a
            href="mailto:info@chronicleexhibits.com"
            className="text-primary font-bold"
          >
            info@chronicleexhibits.com
          </a>
        </p>
      </footer>
    </div>
  );
};

const ThankYouPage = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </>
  );
};

export default ThankYouPage;
