import { Button } from "@/components/ui/button";
import React from "react";
// import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import Link from "next/link";
import { getPortfoliosForPage } from "@/server/actions/portfolio";
import PortfolioLightbox from "@/components/PortfolioLightbox";
import { cn } from "@/lib/utils";

const Ourworks = async ({
  title,
  subtitle,
  subtitleHtml,
  pageName,
  bgColor,
}) => {
  const ourworksdata = await getPortfoliosForPage(pageName, 0, 9);

  return (
    <div
      className={cn(
        "flex flex-col px-6 sm:px-6 md:px-16 lg:px-20 py-12 gap-6",
        bgColor === "white" ? "bg-white" : "product-bg",
      )}
    >
      <h3
        style={{ lineHeight: "1.2" }}
        className="text-xl sm:text-2xl md:text-[2rem] text-secondary heading-font-700 font-semibold text-center"
      >
        {title ?? "TRADE SHOW BOOTH DESIGN PORTFOLIO"}
      </h3>
      {subtitleHtml ? (
        <div
          className="text-base md:text-lg text-secondary text-center mb-2 px-6 sm:px-12 lg:px-72 custom-content"
          dangerouslySetInnerHTML={{ __html: subtitleHtml }}
        />
      ) : (
        <p className="text-base md:text-lg text-secondary text-center mb-2 px-6 sm:px-12 lg:px-72">
          {subtitle ??
            "Our recent works in the USA showcase stunning images of our exceptional projects. From trade show booths to eye-catching displays, our portfolio reflects the expertise and creativity we bring to every project. Get inspired by our work and let us create a standout experience for yourbrand."}
        </p>
      )}
      <div>
        <PortfolioLightbox
          images={ourworksdata.data}
          className="py-4"
        />
        <Link className="flex" href="/portfolio">
          <Button
            style={{ transitionDuration: "500ms" }}
            className="bg-primary transition-500 rounded-full body-bold py-5 hover:bg-white hover:text-secondary mx-auto border-2 border-secondary font-semibold text-secondary"
          >
            View Complete Portfolio
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Ourworks;
