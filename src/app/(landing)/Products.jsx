import React from "react";
import ProductCarousel from "./product-carousel";
import { getAllData } from "@/server/actions/booths";
const Products = async () => {
  const data = await getAllData();
  console.log(data)
  return (
    <div className="product-bg w-full flex flex-col items-center py-14">
      <h2 className="text-xl font-bold text-primary pt-4 mb-4">
        Product Lineup
      </h2>
      <h1 className="text-center heading-font text-white text-3xl font-bold">
        EYE CATCHING TRADE SHOW BOOTH DESIGNS
      </h1>
      <h1 className="text-center heading-font text-white mb-2 text-3xl font-bold">
        FOR SUCCESSFUL EXHIBITIONS
      </h1>
      <p className="text-center text-gray-300 text-md pt-4">
        Explore over 1,000 trade show booth designs by selecting your booth
        size. All designs are fully customizable.
      </p>

      <ProductCarousel />
    </div>
  );
};

export default Products;
