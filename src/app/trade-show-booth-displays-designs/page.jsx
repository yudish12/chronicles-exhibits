import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import React from "react";
import Accordion from "./_components/Accordion";
import "./style.css";
import Link from "next/link";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { getSinglePage } from "@/server/actions/pages";

const page = async () => {
  const boothsizes = await getAllBoothSizes();
  const cardData = boothsizes.data;

  const { data } = await getSinglePage({
    name: "trade-show-booth-displays-designs",
  });
  console.log(data);
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
      <SubHeader />
      <Header />
      <div className="booth-design-bg px-20 flex justify-center gap-4 flex-col items-center">
        <h2 className="text-[2.1rem] uppercase font-semibold text-secondary text-center heading-font">
          {data.fields[0].value}
        </h2>
        <p className="text-[17.5px] text-center">{data.fields[1].value}</p>
      </div>
      <div className="px-20 flex gap-20 pt-16 pb-20">
        <Image
          src={data.fields[3].value}
          alt={data.fields[4].value ?? "booth design"}
          className="w-1/2 max-w-[590px] max-h-[570px]"
          width={800}
          height={800}
        />
        <div className="flex flex-col w-1/2 gap-6 ">
          <h3
            style={{ lineHeight: "1.2" }}
            className="text-secondary uppercase font-bold heading-font text-[1.7rem]"
          >
            {data.fields[2].value}
          </h3>
          <div className="bg-transparent flex flex-col gap-6 overflow-hidden mb-6">
            {questions.map((e, ind) => (
              <div key={ind}>
                <Accordion
                  questions={e}
                  answers={answers[ind]}
                  heading={e}
                  description={answers[ind]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product-bg w-full flex flex-col items-center py-14">
        <h2 className="text-center uppercase heading-font text-white text-[2rem] font-bold">
          {data.fields[13].value}
        </h2>
        <p className="text-center text-gray-300 text-md pt-4">
          {data.fields[14].value}
        </p>
        <div className="grid grid-cols-3 py-12 px-32 gap-x-12 gap-y-10">
          {cardData.map((item, index) => (
            <Link
              href={`/booth/size/${item.name}`}
              key={index}
              className="h-[370px] hover:scale-110 duration-300 transition-all rounded-xl shadow-one overflow-hidden w-full bg-secondary flex flex-col"
            >
              {/* Image Section */}
              <Image
                src={item.image}
                width={350}
                height={300}
                alt={item.size ?? "size"}
                className="w-full h-3/4 object-cover"
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
      <div className="p-20 flex flex-col gap-3 pb-28">
        <h3 className="heading-font text-[2.1rem] uppercase font-semibold text-secondary text-center">
          {data.fields[15].value}
        </h3>
        <div
          id="show_name_desc"
          dangerouslySetInnerHTML={{ __html: data.fields[16].value }}
        ></div>
      </div>
      <Footer />
    </>
  );
};

export default page;
