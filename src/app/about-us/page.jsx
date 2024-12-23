import React from "react";
import SubHeader from "@/components/ui/sub-header";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import FactsAndFigures from "../(landing)/FactsAndFigures";
import Introduction from "./_components/Introduction";
import WhyChooseUs from "./_components/WhyChooseUs";
import ManufacturingUnit from "./_components/ManufacturingUnit";
const page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="bg-[url('/location-bg.png')] grayscale-[70%] px-20 text-white gap-8 h-[420px] justify-center items-center flex flex-col">
        <Image
          src={"/info-circle.png"}
          width={40}
          height={40}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-4xl font-bold">ABOUT US</h3>
      </div>
      <Introduction />
      <WhyChooseUs />
      <FactsAndFigures />
      <ManufacturingUnit />
      <Footer />
    </>
  );
};

export default page;
