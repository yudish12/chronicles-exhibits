import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import { getAllData } from "@/server/actions/locations";
import { getSinglePage } from "@/server/actions/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const majorExhibitingCities = [
  "Anaheim",
  "Atlanta",
  "Austin",
  "Baltimore",
  "Boston",
  "Charlotte",
  "Chicago",
  "Dallas",
  "Denver",
  "Detroit",
  "Houston",
  "Indianapolis",
  "Las Vegas",
  "Long Beach",
  "Kansas City",
  "Los Angeles",
  "Louisville",
  "Miami",
  "Milwaukee",
  "Minneapolis",
  "Nashville",
  "New Orleans",
  "New York",
  "Novi",
  "Ohio",
  "Omaha",
  "Palm Springs",
  "Orlando",
  "Philadelphia",
  "Phoenix",
  "Portland",
  "Riverside County",
  "Rosemont",
  "Sacramento",
  "Salt Lake City",
  "San Antonio",
  "San Diego",
  "San Francisco",
  "San Jose",
  "Santa Clara",
  "Seattle",
  "South Carolina",
  "St. Louis",
  "Tampa",
  "Tennessee",
  "Utah",
  "Washington DC",
];

export const generateMetadata = async () => {
  const { data } = await getSinglePage({ name: "locations" });
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

const Page = async () => {
  let locations = await getAllData();
  console.log("==locations==", locations.data);

  const { data } = await getSinglePage({ name: "locations" });

  return (
    <>
      <SubHeader />
      <Header />
      <div className="booth-design-bg px-4 md:px-8 lg:px-20 text-white gap-8 justify-center items-center flex flex-col sm:rounded-none rounded-b-2xl">
        <Image
          src={"/location-bg-icon.png"}
          width={35}
          height={35}
          alt="location-bg"
          className=""
        />
        <h3 className="text-white heading-font text-4xl font-bold">
          {data.fields[0].value}
        </h3>
        <p className=" hidden text-center mx-4 md:mx-8 lg:mx-16 xl:mx-24 font-medium text-lg lg:text-xl md:block ">
          {data.fields[1].value}
        </p>
        <p className="hidden md:block text-center text-lg lg:text-xl font-medium">
          {data.fields[2].value}
        </p>
      </div>
      <div className="us-bg flex  items-center justify-center md:hidden py-6 px-6 text-lg sm:text-xl ">
        <p className="text-center font-bold">{data.fields[1].value}</p>
      </div>
      <div className="us-bg flex items-center justify-center md:hidden px-2   ">
        <h1 className="font-bold text-center py-4  px-4 text-lg sm:text-xl ">
          {data.fields[2].value}
        </h1>
      </div>
      <div className="us-bg px-4 sm:px-20 py-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {majorExhibitingCities.map((city, index) => (
          <Link
            href={`/trade-show-booth-rentals-${city
              .toLowerCase()
              .replace(" ", "-")}`}
            key={index}
          >
            <div
              key={index}
              className="flex flex-col max-w-[250px] transition-all duration-300 hover:shadow-xl hover:scale-110 rounded-xl items-center gap-4 py-4 sm:py-6 text-center shadow-one sm:shadow-none sm:rounded-none"
            >
              <Image
                src={`/location-2955.svg`}
                width={40}
                height={40}
                alt="location-bg"
                className="p-2"
              />
              <h3 className="text-secondary heading-font font-bold text-2xl p-2">
                {city}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Page;
