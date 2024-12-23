import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Queryform from "@/app/(landing)/Queryform";
// import Queryform from "../(landing)/Queryform";
import { Button } from "@/components/ui/button";
import SubHeader from "@/components/ui/sub-header";
import BoothGrid from "./_components/AllBooths";
import RequestDesign from "./_components/RequestDesign";
import TradeShowSection from "./_components/TradeShowSection";
import { getBoothSizeByName } from "@/server/actions/booth-sizes";
import { getAllData, getBoothsBySize } from "@/server/actions/booths";

export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const boothSize = resolvedParams.booth_size;

  const { data } = await getBoothSizeByName(boothSize);
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

async function FeaturedPage({ params }) {
  const resolvedParams = await params;
  const boothSize = resolvedParams.booth_size;
  console.log("==boothsize==", boothSize);
  const data = await getBoothSizeByName(boothSize);
  const booths = await getBoothsBySize(data.data._id);

  console.log("data", booths);
  return (
    <>
      <SubHeader />
      <Header />
      <div className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center">
        <div className="flex flex-col justify-center items-center h-full text-center gap-6  px-4">
          <h2 className="heading-font font-bold text-[2rem] text-white drop-shadow-lg leading-relaxed ">
            FEATURED {boothSize} TRADE SHOW BOOTH RENTALS
          </h2>
          <div className="flex flex-col items-center justify-self-end gap-4">
            <div className="font-bold text-white text-2xl drop-shadow-sm leading-relaxed ">
              TUIOW202039002
            </div>
            <Button
              style={{ transitionDuration: "500ms" }}
              className="bg-transparent hover:bg-[#B0CB1F] border-2 border-[#B0CB1F] text-[#B0CB1F] hover:text-secondary text-lg font-semibold px-[10px] py-6 "
            >
              Request for Free design
            </Button>
          </div>
        </div>
      </div>
      <BoothGrid size={boothSize} booths={booths} />
      <RequestDesign size={boothSize} />
      <TradeShowSection size={boothSize} />
      <Queryform />
      <Footer />
    </>
  );
}

export default FeaturedPage;
