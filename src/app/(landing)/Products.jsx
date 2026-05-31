import React from "react";
import ProductCarousel from "./product-carousel";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { cn } from "@/lib/utils";
import "./faq.css";

const Products = async ({ bgColor, title, subTitle, location }) => {
  const boothsizes = await getAllBoothSizes();

  return (
    <div
      className={cn(
        bgColor === "white"
          ? "product-bg-white-2 bg-white w-full flex flex-col items-center px-4 py-14"
          : "product-bg w-full flex flex-col items-center px-4 py-14",
      )}
    >
      <h2
        className={cn(
          "text-center heading-font-700 text-3xl font-bold",
          bgColor === "white" ? "text-black" : "text-secondary",
        )}
      >
        {title ?? "EYE CATCHING TRADE SHOW BOOTH DESIGNS"}
      </h2>
      <h2
        className={cn(
          "text-center heading-font-700 mb-2 text-3xl font-bold",
          bgColor === "white" ? "text-black" : "text-secondary",
        )}
      >
        {title ? <></> : "FOR SUCCESSFUL EXHIBITIONS"}
      </h2>
      <div
        id="faq-body"
        dangerouslySetInnerHTML={{
          __html:
            subTitle ??
            "Explore over 1,000 trade show booth designs by selecting your booth size. All designs are fully customizable.",
        }}
        className={cn(
          "text-center xs:mx-8 sm:mx-36 lg:mx-72 text-md pt-4",
          bgColor === "white" ? "text-black" : "text-secondary",
        )}
      ></div>

      <ProductCarousel
        location={location}
        bgColor="white"
        boothsizes={boothsizes.data}
      />
    </div>
  );
};

export default Products;
