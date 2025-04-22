import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";

import { getAllData } from "@/server/actions/locations";
import { getSinglePage } from "@/server/actions/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const generateMetadata = async () => {
  const { data } = await getSinglePage({ name: "locations" });
  return {
    title: data?.meta_title || "Default Title",
    description: data?.meta_description || "Default Description",
    keywords: data?.meta_keywords?.join(",") ?? "Default Keywords",
  };
};

const Page = async () => {
  let locations = await getAllData(null, null, "name");
  // const { data } = await getSinglePage({ name: "locations" });
  const res = await fetch(
    "https://chronicles-exhibits.vercel.app/api/page/all-locations",
    {
      next: { revalidate: 60 },
    }
  );
  console.log(res);
  const resp = await res.json();
  const data = resp.data;
  console.log(resp);
  return (
    <>
      {/* <  /> */}
      <Header />
      <div className="booth-design-bg px-4 md:px-8 lg:px-20 text-white gap-8 justify-center items-center flex flex-col">
        <h1 className="text-white heading-font text-3xl md:text-4xl font-extrabold text-center">
          {data.fields[0].value}
        </h1>
        <p className="hidden text-center mx-4 md:mx-8 lg:mx-16 xl:mx-24 font-medium text-lg lg:text-xl md:block">
          {data.fields[1].value}
        </p>
        <p className="hidden md:block text-center text-lg lg:text-xl font-light text-gray-200">
          {data.fields[2].value}
        </p>
      </div>

      <div className="px-4 sm:px-20 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {locations.data.map((city, index) => (
          <Link
            href={`/trade-show-booth-rentals-${city.name
              .toLowerCase()
              .replaceAll(/ /g, "-")
              .replace(".", "")}`}
            key={index}
          >
            <div className="relative bg-white border border-gray-300 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 p-8 text-center flex flex-col items-center gap-4">
              <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                <Image
                  loading="eager"
                  src={`/location-2955.svg`}
                  width={50}
                  height={50}
                  alt="location-icon"
                  className="rounded-full shadow-md border border-primary p-2 bg-white"
                />
              </div>
              <h3 className="text-primary font-bold text-2xl mt-10">
                {city.name}
              </h3>
              {/* <p className="text-gray-600 text-sm">
          Discover trade show opportunities in {city}. Elevate your brand presence with top-tier booth designs.
        </p> */}
              <button className="mt-4 bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-secondary transition-all">
                View More
              </button>
            </div>
          </Link>
        ))}
      </div>

      <Footer />
    </>
  );
};

export default Page;
