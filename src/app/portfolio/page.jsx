import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import Image from "next/image";

const Page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center">
        <div className="flex flex-col justify-center items-center h-full text-center gap-10  px-4">
          <h2 className="heading-font font-bold text-[2rem] text-white drop-shadow-lg leading-relaxed ">
            OUR PORTFOLIO
          </h2>
          <p className="text-white text-lg font-medium">
            Have a look at our impeccable trade show booths that made our
            clients stand out from their competitors.
            <br />
            Gain a high ROI while exhibiting in various major trade shows across
            the USA!
          </p>
        </div>
      </div>
      <div className="py-24 px-20">
        <h3 className="text-[2rem] font-semibold heading-font text-secondary uppercase text-center">
          Trade Show Booth Design Ideas
        </h3>
        <p className="mt-6 text-center text-[17px]">
          Starting from Fortune 500 companies to startups, Chronicle Exhibits
          has transformed thousands of brands into exciting experiences through
          our customized rentals and custom-built display stands for trade
          shows, as well as backlit displays and pop-up tradeshow displays.
          Whatever your business will be, Chronicle Exhibits can help you design
          your booth that is certain to bring excitement to your trade event.
        </p>
        <div className="grid grid-cols-[400px,400px,400px] w-max mx-auto gap-x-4 place-content-center p-8 gap-y-4">
          {ourWorksData.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden w-[400px] h-[300px]" // Wrapper to constrain image scale
            >
              <Image
                width={400}
                height={300}
                className="transition-transform min-h-[300px] duration-300 transform scale-110 hover:scale-125"
                src={item.image}
                alt={`photo-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
