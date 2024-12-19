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

      <div className="text-center mt-8">
        <h2 className="scale-110 text-2xl text-[#B0CB1F] ">Services</h2>
        <p className="mt-6 sm:text-4xl heading-font-700 uppercase text-secondary ">
          eye catching trade show booth solutions
        </p>
      </div>
      <Carousel />
      <Parallax />
      <Queryform />
      <Footer />
    </>
  );
};

export default ServicePage;
