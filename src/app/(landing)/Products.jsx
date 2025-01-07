import React from "react";
import ProductCarousel from "./product-carousel";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { cn } from "@/lib/utils";

const Products = async ({ bgColor, title, subTitle, location }) => {
  const boothsizes = await getAllBoothSizes();

  return (
    <div
      className={cn(
        bgColor === "white"
          ? "product-bg-white-2 bg-white w-full flex flex-col items-center py-14"
          : "product-bg w-full flex flex-col items-center py-14"
      )}
    >
      <h1
        className={cn(
          "text-center heading-font-700 text-white text-3xl font-bold",
          bgColor === "white" && "text-black"
        )}
      >
        {title ?? "EYE CATCHING TRADE SHOW BOOTH DESIGNS"}
      </h1>
      <h1 className="text-center heading-font-700 text-white mb-2 text-3xl font-bold">
        {title ? <></> : "FOR SUCCESSFUL EXHIBITIONS"}
      </h1>
      <p
        className={cn(
          "text-center xs:mx-8 sm:mx-36 lg:mx-72 text-white text-md pt-4",
          bgColor === "white" && "text-black"
        )}
      >
        {subTitle ??
          "Explore over 1,000 trade show booth designs by selecting your booth size. All designs are fully customizable."}
      </p>

      <ProductCarousel
        location={location}
        bgColor="white"
        boothsizes={boothsizes.data}
      />
    </div>
  );
};

export default Products;
