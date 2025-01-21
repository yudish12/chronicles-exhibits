import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import { StoreIcon } from "lucide-react";
import Queryform from "../(landing)/Queryform";
import Footer from "@/components/ui/footer";
import "./style.css";
import Ourworks from "../(landing)/Ourworks";
import { getSinglePage } from "@/server/actions/pages";

export async function generateMetadata({ params }) {
  const pageData = await getSinglePage({ name: "custom-trade-show-booth-ideas" }, "meta_keywords meta_title meta_description");
  return {
    title: pageData?.data?.meta_title,
    description: pageData?.data?.meta_description,
    keywords: pageData?.data?.meta_keywords,
  };
}

const Page = async () => {
  const { data } = await getSinglePage({
    name: "custom-trade-show-booth-ideas",
  });
  console.log(data);

  return (
    <>
      {/* <SubHeader /> */}
      <Header />
      <div className="booth-design-bg flex justify-center px-4 md:px-8 lg:px-20 flex-col gap-8 items-center">
        <h1 className="text-4xl text-center uppercase font-semibold heading-font text-white">
          {data.fields[0].value}
        </h1>
        <h4 className="text-xl mx-0 sm:mx-12 md:mx-20 lg:mx-52 text-center heading-font text-white">
          {data.fields[1].value}
        </h4>
      </div>
      <div className="bg-background px-6 sm:px-12 lg:px-20 flex flex-col gap-6 py-12">
        <h2 className="text-[2rem] text-center font-medium heading-font text-secondary">
          {data.fields[2].value}
        </h2>
        <div
          id="show_name_desc"
          className="mx-0 sm:mx-6 md:mx-12 lg:mx-36 "
          dangerouslySetInnerHTML={{ __html: data.fields[3].value }}
        ></div>
      </div>
      <div className="p-6 md:p-20 flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* Image Container */}
        <div className="w-full lg:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src={data.fields[6].value}
            alt={data.fields[7].value}
            className="max-h-[300px] sm:max-h-[400px] md:max-h-[480px] lg:max-h-[530px]"
          />
        </div>
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className=" heading-font text-center lg:text-left uppercase font-semibold text-secondary text-[2rem]"
          >
            {data.fields[4].value}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.fields[5].value }}
          ></div>
        </div>
      </div>
      <div className="p-6 md:p-20 flex flex-col lg:flex-row gap-6 md:gap-10">
        <div className="w-full lg:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className=" heading-font text-center lg:text-left uppercase font-semibold text-secondary text-[2rem]"
          >
            {data.fields[8].value}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.fields[9].value }}
          ></div>
        </div>
        {/* Image Container */}
        <div className="w-full lg:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src={data.fields[10].value}
            alt={data.fields[11].value}
            className="max-h-[300px] sm:max-h-[400px] md:max-h-[480px] lg:max-h-[530px] "
          />
        </div>
        {/* Text Content */}
      </div>
      <div className="flex flex-col px-6 sm:px-12 lg:px-20 py-4 gap-6">
        <h3 className="text-secondary text-center text-4xl font-semibold heading-font">
          {data.fields[12].value}
        </h3>
        <div
          id="show_name_desc"
          className="mx-0 sm:mx-10 md:mx-20 lg:mx-36"
          dangerouslySetInnerHTML={{ __html: data.fields[13].value }}
        ></div>
      </div>
      <div className="flex flex-col pb-0 py-8 gap-6">
        <Ourworks
          title={data.fields[14].value}
          subtitle={data.fields[15].value}
        />
      </div>
      <Queryform />
      <Footer />
    </>
  );
};

export default Page;
