import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
 
import Image from "next/image";
import React from "react";
import "./style.css";
import Link from "next/link";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { getSinglePage } from "@/server/actions/pages";
import Accordion from "./_components/Accordion";

export async function generateMetadata({ params }) {
  const pageData = await getSinglePage({ name: "trade-show-booth-displays-designs" }, "meta_keywords meta_title meta_description");
  return {
    title: pageData?.data?.meta_title,
    description: pageData?.data?.meta_description,
    keywords: pageData?.data?.meta_keywords,
  };
}

const page = async () => {
  const boothsizes = await getAllBoothSizes();
  const cardData = boothsizes.data;

  // const res = await fetch("https://chronicleexhibits.com/api/page/all-booths-page", {
  //   next: { revalidate: 60 },
  // })
  const res = await getSinglePage({name:"trade-show-booth-displays-designs"})
  // const resp = await res.json();
  const data = res.data;
  console.log(data)

  const questions = [
    data.fields[5].value,
    data.fields[7].value,
    data.fields[9].value,
    data.fields[11].value,
  ];
  const answers = [
    data.fields[6].value,
    data.fields[8].value,
    data.fields[10].value,
    data.fields[12].value,
  ];

  return (
    <>
      {/* <  /> */}
      <Header />
      <div className="booth-design-bg px-4 md:px-20 flex justify-center gap-4 flex-col items-center">
        <h1 className="text-[2.1rem] uppercase font-semibold text-white text-center heading-font">
          {data.fields[0].value}
        </h1>
        <p className="text-[17.5px] text-white mx-0 sm:mx-16 md:mx-20 lg:mx-52 text-center">
          {data.fields[1].value}
        </p>
      </div>
      <div className="px-6 sm:px-8 md:px-12 lg:pr-20 flex items-start lg:justify-center lg:flex-row flex-col gap-12 pt-16 pb-20">
        <div className="lg:w-1/2 w-full lg:max-h-[350px] xl:max-h-[520px] 2xl:max-h-[600px] flex-shrink-0">
          <Image
loading="eager"
            src={data.fields[3].value}
            alt={data.fields[4].value ?? "booth design"}
            className="w-full lg:max-h-[350px] xl:max-h-[520px] 2xl:max-h-[600px]"
            width={800}
            height={800}
          />
        </div>
        <div className="flex flex-col w-full lg:w-1/2 gap-6">
          <h2
            style={{ lineHeight: "1.2" }}
            className="text-secondary uppercase font-bold heading-font text-[1.7rem]"
          >
            {data.fields[2].value}
          </h2>
          <div className="bg-transparent flex flex-col gap-4 overflow-hidden mb-6">
            <Accordion
              questions={questions}
              answers={answers}
              heading={questions}
              description={answers}
            />
          </div>
        </div>
      </div>

      <div className="product-bg w-full flex flex-col items-center py-14">
        <h3 className="text-center uppercase heading-font text-white text-[2rem] font-bold">
          {data.fields[13].value}
        </h3>
        <p className="text-center px-6 text-gray-300 text-md pt-4">
          {data.fields[14].value}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-12 px-6 sm:px-10 lg:px-20 gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-8 xl:gap-x-12 xl:gap-y-12">
          {cardData.map((item, index) => (
            <Link
              href={`/${item.name}-trade-show-booth`}
              key={index}
              className="h-[300px] max-w-[350px] hover:scale-110 duration-300 transition-all rounded-lg shadow-one overflow-hidden w-full bg-secondary flex flex-col"
            >
              {/* Image Section */}
              <Image
loading="eager"
                src={item.image}
                width={350}
                height={300}
                alt={item.size ?? "size"}
                className="w-full h-3/4"
              />
              {/* Content Section */}
              <div className="flex h-1/4 heading-font bg-white flex-col justify-center items-center bg-secondary/[.94] text-secondary">
                <p className=" text-[1.65rem] font-semibold">{item.name}</p>
                <p className="uppercase text-lg font-semibold">
                  trade show booth rental
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="lg:p-20 md:p-16 sm:p-12 p-6 flex flex-col gap-3 pb-28">
        <h3 className="heading-font text-[2.1rem] uppercase font-semibold text-secondary text-center">
          {data.fields[15].value}
        </h3>
        <div
          id="show_name_desc"
          className="lg:mx-36 mx-6 xs:mx-8 md:mx-12"
          dangerouslySetInnerHTML={{ __html: data.fields[16].value }}
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default page;
