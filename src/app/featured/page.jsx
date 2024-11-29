import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Queryform from "../(landing)/Queryform";
import { Button } from "@/components/ui/button";
import SubHeader from "@/components/ui/sub-header";
import BoothGrid from "./_components/AllBooths";
import RequestDesign from "./_components/RequestDesign";
import TradeShowSection from "./_components/TradeShowSection";

const FeaturedPage = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div
        className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center"
      >
        <div className="flex flex-col justify-center items-center h-full text-center gap-6 px-4">
          <h2 className="heading-font font-bold text-4xl text-white drop-shadow-lg mb-6 ">
            FEATURED 10X10 TRADE SHOW BOOTH RENTALS
          </h2>
          <div className="flex flex-col items-center gap-4">
            <div className="font-bold text-white text-2xl drop-shadow-sm">
              TUIOW202039002
            </div>
            <Button
              style={{ transitionDuration: "500ms" }}
              className="bg-transparent hover:bg-[#B0CB1F] border-2 border-[#B0CB1F] text-[#B0CB1F] hover:text-secondary text-lg font-semibold px-6 py-2 "
            >
              Customize Now!
            </Button>
          </div>
        </div>
      </div>
      <BoothGrid/>
      <RequestDesign/>
      <TradeShowSection/>
      <Queryform />
      <Footer />
    </>
  );
};

export default FeaturedPage;
