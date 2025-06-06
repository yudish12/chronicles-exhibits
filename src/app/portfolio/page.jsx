import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import { getAllPortfolios } from "@/server/actions/portfolio";
import Lightbox from "./Lightbox";
// import { getSinglePage } from "@/server/actions/pages";

export const generateMetadata = async () => {
  // const { data } = await getSinglePage({ name: "portfolio" }, "meta_title meta_description meta_keywords");
  return {
    title:
      "Best Custom Trade Show Display Design | Portfolio - Chronicle Exhibits LLC.",
    description:
      "Browse through our portfolio of trade show display design ideas for inspiration. Get a start-to-end solution for exhibit rental services in all cities across the USA.",
  };
};

const Page = async () => {
  const ourWorksData = await getAllPortfolios();
  console.log(ourWorksData);
  return (
    <>
      {/* <  /> */}
      <Header />
      <div className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center">
        <div className="flex flex-col items-center h-full justify-center text-center gap-10 px-4 md:px-20">
          <h1 className="heading-font font-semibold text-[2rem] mt-16 text-white drop-shadow-lg leading-relaxed ">
            OUR PORTFOLIO
          </h1>
          <p className="text-white text-2xl mx-0 sm:mx-20 md:mx-28 lg:mx-52 2xl:mx-96  font-semibold text-center">
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
