import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
// import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import Link from "next/link";
import { getAllPortfolios } from "@/server/actions/portfolio";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import Lightbox from "./Lightbox";
const Ourworks = async ({ title, subtitle }) => {
  const ua = userAgent({ headers: headers() });
  const isMobile = ua?.device?.type === "mobile";
  const ourWorksData = await getAllPortfolios(6, 0);
  const displayedData = isMobile
    ? ourWorksData.data.slice(0, 6)
    : ourWorksData.data.slice(0, 9);
  console.log(ourWorksData);
  return (
    <div className="flex flex-col product-bg px-6 sm:px-6 md:px-16  lg:px-20 py-12 gap-6">
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-xl sm:text-2xl md:text-[2rem] text-white heading-font-700 font-semibold text-center"
      >
        {title ?? "TRADE SHOW BOOTH DESIGN PORTFOLIO"}
      </h3>
      <p className="text-sm md:text-base  text-white/95 text-center mb-2 px-6 sm:px-12 lg:px-72">
        {subtitle ??
          "Our recent works in the USA showcase stunning images of our exceptional projects. From trade show booths to eye-catching displays, our portfolio reflects the expertise and creativity we bring to every project. Get inspired by our work and let us create a standout experience for yourbrand."}
      </p>

      <Lightbox images={displayedData} />
      <Link className="flex" href="/portfolio">
        <Button
          style={{ transitionDuration: "500ms" }}
          className="bg-primary rounded-full body-bold py-5 hover:bg-white hover:text-secondary mx-auto border-2 border-secondary font-semibold text-secondary"
        >
          View Complete Portfolio
        </Button>
      </Link>
    </div>
  );
};

export default Ourworks;
