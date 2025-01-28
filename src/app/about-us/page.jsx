import React from "react";
 
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Image from "next/image";
import Introduction from "./_components/Introduction";
import WhyChooseUs from "./_components/WhyChooseUs";
import ManufacturingUnit from "./_components/ManufacturingUnit";
import { getSinglePage } from "@/server/actions/pages";
import FactsAndFigures from "./_components/FactsAndFigures";

export async function generateMetadata({ params }) {
  const pageData = await getSinglePage({ name: "about-us" }, "meta_keywords meta_title meta_description");
  return {
    title: pageData?.data?.meta_title,
    description: pageData?.data?.meta_description,
    alternates: {
      canonical: `https://chronicleexhibits.com/about-us`,
    },
    keywords: pageData?.data?.meta_keywords,
  };
}

const page = async () => {
  const aboutusPageData = await getSinglePage({ name: "about-us" });
  const fields = aboutusPageData.data.fields;

  return (
    <>
      {/* {/* <  /> */}
      <Header />
      <div className="booth-design-bg px-4 md:px-20 text-white gap-8 h-[360px] justify-center items-center flex flex-col">
        <h1 className="text-white heading-font text-4xl font-bold">
          {fields[0].value}
        </h1>
      </div>
      <Introduction fields={fields} />
      <WhyChooseUs fields={fields} />
      <FactsAndFigures fields={fields} />
      <ManufacturingUnit fields={fields} />
      <Footer />
    </>
  );
};

export default page;
