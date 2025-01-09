import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Queryform from "../(landing)/Queryform";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SubHeader from "@/components/ui/sub-header";
import Carousel from "./_components/Carousel";
import Parallax from "./_components/Parallax";

const ServicePage = () => {
  return (
    <>
      <SubHeader />
      <Header />

      <div
        style={{ height: "300px" }}
        className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center"
      >
        {/* <div className="flex flex-col items-center h-full justify-center text-center gap-10 px-4 md:px-20"> */}
        <h2 className="heading-font font-semibold text-[2rem] text-white drop-shadow-lg leading-relaxed ">
          Services
        </h2>
        {/* </div> */}
      </div>
      <Carousel />
      <Parallax />
      <Queryform />
      <Footer />
    </>
  );
};

export default ServicePage;
