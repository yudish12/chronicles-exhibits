import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Queryform from "../(landing)/Queryform";
import SubHeader from "@/components/ui/sub-header";
import Carousel from "./_components/Carousel";
import Parallax from "./_components/Parallax";
import { getSinglePage } from "@/server/actions/pages";

export const generateMetadata = async () => {
  const { data } = await getSinglePage({ name: "service" });
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

const ServicePage = async () => {
  const servicePageData = await getSinglePage({ name: "service" });
  const fields = servicePageData.data.fields;

  return (
    <>
      {/* <SubHeader /> */}
      <Header />

      <div
        
        className=" featured-bg flex flex-col items-center justify-center bg-cover bg-center"
      >
        {/* <div className="flex flex-col items-center h-full justify-center text-center gap-10 px-4 md:px-20"> */}
        <h1 className="heading-font font-semibold text-[2rem] text-white drop-shadow-lg leading-relaxed ">
          {fields[0].value}
        </h1>
        {/* </div> */}
      </div>
      <Carousel fields={fields} />
      <Parallax fields={fields} />
      <Queryform />
      <Footer />
    </>
  );
};

export default ServicePage;
