import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getAllPortfolios } from "@/server/actions/portfolio";
const Page = async () => {
  const ourWorksData = await getAllPortfolios();
  console.log(ourWorksData);
  return (
    <>
      <SubHeader />
      <Header />
      <div className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center">
        <div className="flex flex-col items-center h-full justify-center text-center gap-10  px-4">
          <h2 className="heading-font font-semibold text-[2rem] mt-16 text-white drop-shadow-lg leading-relaxed ">
            OUR PORTFOLIO
          </h2>
          <p className="text-white text-[2rem] w-[1000px] uppercase font-medium text-center">
            Have a look at our impeccable trade show booths that made our
            clients stand out from their competitors.
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
        <div className="grid grid-cols-4  mx-auto gap-x-8 place-content-center p-8 px-20 gap-y-8">
          {ourWorksData.data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden rounded-3xl",
                (index + 1) % 3 === 0 ? "col-span-4" : "col-span-2"
              )} // Wrapper to constrain image scale
            >
              <Image
                width={400}
                height={300}
                className={cn(
                  `transition-transform h-full min-h-[300px] max-h-[450px] w-full duration-300 transform scale-110 hover:scale-125`
                )}
                src={item.image}
                alt={item.image_alt_text}
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
