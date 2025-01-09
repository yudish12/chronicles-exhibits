import { Button } from "@/components/ui/button";
import Header from "@/components/ui/header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectGroup,
  SelectTrigger,
} from "@/components/ui/select";
import SubHeader from "@/components/ui/sub-header";
import tradeShows from "../../../utils/constants/dev-data/trade-shows.json";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Products from "@/app/(landing)/Products";
import { DiamondSvg } from "@/app/booth/size/[booth_size]/_components/TradeShowSection";
import Footer from "@/components/ui/footer";
import Queryform from "@/app/(landing)/Queryform";
import { Calendar, MapPin } from "lucide-react";
import moment from "moment";
import "./style.css";
// import { majorExhibitingCities } from "../page";
import { getLocationPagebyCity } from "@/server/actions/locations";
import { getAllBoothSizes } from "@/server/actions/booth-sizes";
import { getAllPortfolios } from "@/server/actions/portfolio";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { getAllLocations } from "@/server/actions/events";
// import { useRouter } from "next/navigation";
import { getEventByCity } from "@/server/actions/events";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const location_name = resolvedParams.location_name;

  const { data } = await getLocationPagebyCity(location_name);
  return {
    title: data[0]?.meta_title || "Default Title",
    description: data[0]?.meta_description || "Default Description",
    keywords: data[0]?.meta_keywords?.join(",") ?? "Default Keywords",
  };
}

const Page = async ({ params }) => {
  const city = (await params).location_name;
  // console.log("city==" , city)
  const eventByCity = await getEventByCity(city, 0, 4);
  console.log("eventByCity", eventByCity);
  // console.log("eventByCity",eventByCity.data.slice(0,3))
  let majorExhibitingCities = await getAllLocations();
  let boothSizes = await getAllBoothSizes();
  // if(!eventByCity.data){

  // }
  const { data } = await getLocationPagebyCity(city);
  if (!data) {
    notFound();
  }
  console.log(data);

  const shows = tradeShows.splice(0, 4);
  const ua = await userAgent({ headers: headers() });
  const isMobile = ua?.device?.type === "mobile";
  const ourWorksData = await getAllPortfolios(0, 9);

  const displayedData = isMobile
    ? ourWorksData.data.slice(0, 6)
    : ourWorksData.data;
  // const router = useRouter();
  // const handleSearch = (city)=>{
  //   router.push(`/admin/locations/${city}`)
  // }
  return (
    <>
      <SubHeader />
      <Header />
      <div className="single-location-bg flex flex-col justify-center">
        <h1 className="text-center font-bold text-[2.5rem] heading-font uppercase text-white">
          {data[0].fields[0].value}
        </h1>
        <h2 className="text-center font-bold text-[2.5rem] heading-font uppercase text-primary">
          {data[0].name}
        </h2>
        <div className="flex flex-col sm:flex-row relative mt-6 gap-4  sm:bg-gray-400/20 rounded-full p-4 justify-center w-4/5 mx-auto">
          <Select>
            <SelectTrigger className="text-secondary text-lg font-semibold bg-white rounded-full p-6">
              <SelectValue placeholder="Select a City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Cities</SelectLabel>
                {majorExhibitingCities.data.map((city, index) => (
                  <SelectItem value={city.city} key={index}>
                    {city.city}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="text-secondary text-lg  font-semibold bg-white rounded-full p-6">
              <SelectValue placeholder="Select a Booth Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Booth Sizes</SelectLabel>
                {boothSizes.data.map((sizes, index) => (
                  <SelectItem value={sizes.name} key={index}>
                    {sizes.name}
                  </SelectItem>
                ))}
                {/* <SelectItem value="banana">10x20</SelectItem>
                <SelectItem value="blueberry">10x30</SelectItem>
                <SelectItem value="grapes">20x20</SelectItem>
                <SelectItem value="pineapple">20x30</SelectItem> */}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button className="bg-transparent border-2 font-semibold text-lg border-white py-5 self-center hover:bg-white transition-all duration-300 hover:text-secondary px-6 rounded-full">
            Search
          </Button>
        </div>
        <Button className="bg-primary border border-secondary font-semibold text-secondary mt-8 hover:bg-primary mx-auto py-5 text-lg">
          {data[0].fields[1].value}
        </Button>
      </div>
      <div className="bg-background px-6 sm:px-8 md:px-10 py-16 lg:px-20 flex flex-col gap-8">
        <h2 className="text-center max-w-full sm:w-[600px] lg:w-[800px] mx-auto break-words uppercase leading-10 font-semibold text-secondary text-[2.1rem] heading-font">
          {data[0].fields[2].value}
          {data[0].fields[3].value}
        </h2>

        <p className="text-[17px] text-center text-balance mx-0 sm:mx-8 md:mx-16 lg:mx-36">
          {data[0].fields[4].value} {data[0].fields[5].value}
        </p>
      </div>
      <div className="product-bg flex flex-col md:flex-row gap-12 px-4 md:px-20 py-16">
        <Image
          height={300}
          width={200}
          className="w-full md:w-1/2 rounded-lg max-h-[520px]"
          src={data[0].fields[6].value}
          alt={data[0].fields[7].value}
        />
        <div className="w-full font-normal md:w-1/2 flex flex-col gap-4">
          <h2 className="text-primary uppercase heading-font text-3xl md:text-4xl font-semibold">
            {data[0].fields[8].value}
          </h2>
          <div
            id="show_name_desc"
            className="text-white"
            dangerouslySetInnerHTML={{ __html: data[0].fields[9].value }}
          ></div>

          <Button
            style={{ transitionDuration: "500ms" }}
            className="rounded-full w-full md:w-[30%] mx-auto px-16 py-6 font-thin text-lg text-white border hover:bg-primary hover:text-black hover:font-medium mt-4 bg-transparent border-primary"
          >
            {data[0].fields[10].value}
          </Button>
        </div>
      </div>
      <div className="py-8 px-6 sm:p-12 lg:px-20 xl:px-36  pb-10">
        <h2 className="uppercase text-3xl heading-font-600 text-primary text-center font-semibold">
          {data[0].fields[11].value}
        </h2>
        <p className="text-center md:mx-28 lg:mx-44 mt-7">
          {data[0].fields[12].value}
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-x-4 gap-y-4">
          {displayedData.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl w-full h-[200px] sm:h-[250px] md:h-[230px]"
            >
              <Image
                width={370}
                height={300}
                className="transition-transform w-full h-full duration-300 transform hover:scale-110"
                src={item.image}
                alt={item.image_alt_text}
              />
            </div>
          ))}
        </div>
        <Link className="flex mt-10" href="/portfolio">
          <Button
            style={{ transitionDuration: "500ms" }}
            className="bg-transparent hover:bg-secondary hover:text-white mx-auto border-2 border-secondary font-semibold text-secondary text-sm sm:text-base"
          >
            View Portfolio
          </Button>
        </Link>
      </div>
      <Products
        title={data[0].fields[13].value}
        subTitle={data[0].fields[14].value}
        location={city}
      />
      <div className="bg-background mx-auto pt-8 pb-3 px-8 md:px-20 lg:px-32 w-[92%]">
        {/* Section 1 */}
        <section className="py-10 text-secondary">
          <h2 className="text-2xl md:text-3xl font-bold uppercase heading-font text-secondary mb-4">
            {data[0].fields[15].value}
          </h2>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data[0].fields[16].value }}
          ></div>
        </section>
      </div>
      <div className="bg-white pb-10">
        <h2 className="text-3xl heading-font text-secondary text-center uppercase">
          {data[0].fields[17].value}
        </h2>
        <div className="grid place-content-center mx-auto xl:grid-cols-[270px,270px,270px,270px] lg:grid-cols-3 gap-x-8 gap-y-8 md:grid-cols-2 grid-cols-1 gap-4 px-6 sm:px-12 md:px-20 pb-10 mt-12">
          {eventByCity.data.map((show) => (
            <div
              key={show.id}
              className="h-[350px] w-full bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6 justify-between"
            >
              <h4 className="text-secondary heading-font text-xl  font-semibold">
                {show.event_name}
              </h4>
              <Image
                className="rounded-full"
                width={120}
                height={120}
                src={show.icon}
                alt={show.title}
              />
              <div className="flex flex-col gap-2 w-full px-4">
                <p className="flex gap-4">
                  <MapPin color="#B0CB1F" />
                  <span className="text-[16px]">
                    {show.city},{show.country}
                  </span>
                </p>
                <p className="flex gap-4  ">
                  <Calendar color="#B0CB1F" />
                  <span className="text-[16px]">
                    {moment(show.start_date).format("DD")}-
                    {moment(show.end_date).format("DD")}{" "}
                    {moment(show.start_date).format("MMMM")}{" "}
                    {moment(show.end_date).format("YYYY")}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Button className="text-white p-4 py-[22px] duration-300 transition-all text-lg hover:bg-primary hover:text-secondary font-semibold bg-secondary">
            {data[0].fields[18].value}
          </Button>
        </div>
      </div>
      {/* <Queryform /> */}
      <Footer />
    </>
  );
};

export default Page;
