import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import { getAllData } from "@/server/actions/locations";
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

const Page = async () => {
  let locations = await getAllData();
  console.log("==locations==", locations.data);
  return (
    <>
      <SubHeader />
      <Header />
      <div className="bg-[url('/location-bg.png')] grayscale-[70%] px-20 text-white gap-8 h-[420px] justify-center items-center flex flex-col">
        <Image
          src={"/location-bg-icon.png"}
          width={40}
          height={40}
          alt="location-bg"
          className="object-cover"
        />
        <h3 className="text-white heading-font text-4xl font-bold">
          LOCATIONS
        </h3>
        <p className="text-center font-medium">
          We are just around the corner and our service centers make it easy for
          you.
        </p>
        <p className="text-center font-medium ">
          Chronicle’s backbone is professionals and dealers located all around
          the U.S. that assist our partners with their trade shows. By renting
          locally, you enjoy custom designs with reduced costs and no problems
          of shipping delays and any Custom hassles. We provide innovative booth
          platforms, which you can use in near all cities in the USA to showcase
          your brand.
        </p>
      </div>
      <div className="us-bg px-20 py-6 grid grid-cols-4 gap-4">
        {majorExhibitingCities.map((city, index) => (
          <Link href={`/locations/${city}`} key={index}>
            <div
              key={index}
              className="flex flex-col max-w-[250px] transition-all duration-300  hover:shadow-xl hover:scale-110 rounded-xl items-center gap-4 py-6 text-center"
            >
              <Image
                src={`/location-2955.svg`}
                width={40}
                height={40}
                alt="location-bg"
                className="object-cover"
              />
              <h3 className="text-secondary heading-font font-bold text-2xl">
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
