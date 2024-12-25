import React from "react";
import ProductCarousel from "./product-carousel";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";

const Products = async () => {
  const boothsizes = await getAllBoothSizes();

  return (
    <div className="product-bg w-full flex flex-col items-center py-14">
      <h1 className="text-center heading-font-700 text-white text-3xl font-bold">
        EYE CATCHING TRADE SHOW BOOTH DESIGNS
      </h1>
      <h1 className="text-center heading-font-700 text-white mb-2 text-3xl font-bold">
        FOR SUCCESSFUL EXHIBITIONS
      </h1>
      <p className="text-center text-gray-300 text-md pt-4">
        Explore over 1,000 trade show booth designs by selecting your booth
        size. All designs are fully customizable.
      </p>

      <ProductCarousel boothsizes={boothsizes.data} />
    </div>
  );
};

export default Products;
