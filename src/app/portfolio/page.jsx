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
        <div className="flex flex-col items-center h-full justify-center text-center gap-10 px-4 md:px-20">
          <h2 className="heading-font font-semibold text-[2rem] mt-16 text-white drop-shadow-lg leading-relaxed ">
            OUR PORTFOLIO
          </h2>
          <p className="text-white text-2xl mx-0 sm:mx-20 md:mx-28 lg:mx-52 uppercase font-bold text-center">
            Have a look at our impeccable trade show booths that made our
            clients stand out from their competitors.
          </p>
        </div>
      </div>
      <div className="py-8 px-28">
        <div className="grid grid-cols-2  mx-auto gap-x-8 place-content-center p-8 px-20 gap-y-8">
          {ourWorksData.data.map((item, index) => (
            <div
              key={index}
              className={cn(
                "overflow-hidden rounded-3xl",
                (index + 1) % 3 === 0 ? "col-span-2" : "col-span-1"
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
