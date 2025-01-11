import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAllPortfolios } from "@/server/actions/portfolio";
import Lightbox from "./Lightbox";
const Page = async () => {
  const ourWorksData = await getAllPortfolios();
  console.log(ourWorksData);
  return (
    <>
      <SubHeader />
      <Header />
      <div className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center">
        <div className="flex flex-col items-center h-full justify-center text-center gap-10 px-4 md:px-20">
          <h2 className="heading-font font-semibold text-[2rem] mt-16 text-white drop-shadow-lg leading-relaxed ">
            OUR PORTFOLIO
          </h2>
          <p className="text-white text-2xl mx-0 sm:mx-20 md:mx-28 lg:mx-52 2xl:mx-96 uppercase font-bold text-center">
            Have a look at our impeccable trade show booths that made our
            clients stand out from their competitors.
          </p>
        </div>
      </div>
      <Lightbox images={ourWorksData} />
      <Footer />
    </>
  );
};

export default Page;
