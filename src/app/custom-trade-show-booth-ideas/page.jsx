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

const Page = async () => {
  const { data } = await getSinglePage({
    name: "custom-trade-show-booth-ideas",
  });
  console.log(data);

  return (
    <>
      <SubHeader />
      <Header />
      <div className="featured-bg flex justify-center flex-col gap-8 items-center">
        <h2 className="text-4xl uppercase font-semibold heading-font text-white">
          {data.fields[0].value}
        </h2>
        <h4 className="text-2xl font-semibold text-center heading-font text-white">
          {data.fields[1].value}
        </h4>
      </div>
      <div className="bg-background px-20 flex flex-col gap-6 py-12">
        <h2 className="text-3xl text-center font-medium heading-font text-secondary">
          {data.fields[2].value}
        </h2>
        <div
          id="show_name_desc"
          dangerouslySetInnerHTML={{ __html: data.fields[3].value }}
        ></div>
      </div>
      <div className="p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src={data.fields[6].value}
            alt={data.fields[7].value}
            className="max-h-[300px] md:max-h-[530px] object-cover"
          />
        </div>
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className="heading-font uppercase font-semibold text-secondary text-lg sm:text-xl md:text-[2rem]"
          >
            {data.fields[4].value}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.fields[5].value }}
          ></div>
        </div>
      </div>
      <div className="p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="w-full md:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className="heading-font uppercase font-semibold text-secondary text-lg sm:text-xl md:text-[2rem]"
          >
            {data.fields[8].value}
          </h3>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data.fields[9].value }}
          ></div>
        </div>
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src={data.fields[10].value}
            alt={data.fields[11].value}
            className="max-h-[300px] md:max-h-[530px] object-cover"
          />
        </div>
        {/* Text Content */}
      </div>
      <div className="flex flex-col px-20 py-8 gap-6">
        <h3 className="text-secondary text-center text-4xl font-semibold heading-font">
          {data.fields[12].value}
        </h3>
        <div
          id="show_name_desc"
          dangerouslySetInnerHTML={{ __html: data.fields[13].value }}
        ></div>
      </div>
      <div className="flex flex-col pb-0 py-8 gap-6">
        <h3 className="text-secondary text-center text-4xl font-semibold heading-font">
          {data.fields[14].value}
        </h3>
        <p className="text-[17px] text-center">{data.fields[15].value}</p>
        <div className="flex self-center">
          <hr
            style={{ color: "#5D2A42" }}
            className="border-b-[0.5px] text-center w-12 self-center border-secondary"
          />
          <StoreIcon />
          <hr
            style={{ color: "#5D2A42" }}
            className="border-b-[0.5px] text-center w-12 self-center border-secondary"
          />
        </div>
        <Ourworks />
      </div>
      <Queryform />
      <Footer />
    </>
  );
};

export default Page;
