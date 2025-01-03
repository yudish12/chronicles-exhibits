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

const Page = async ({ params }) => {
  const city = (await params).location_name;

  let majorExhibitingCities = await getAllLocations();
  let boothSizes = await getAllBoothSizes();

  const { data } = await getLocationPagebyCity(city);
  console.log(data);

  const shows = tradeShows.splice(0, 4);
  const ua = userAgent({ headers: headers() });
  const isMobile = ua?.device?.type === "mobile";
  const ourWorksData = await getAllPortfolios(0, 6);

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
        <h2 className="text-center font-bold text-[2.5rem] heading-font uppercase text-white">
          {data[0].fields[0].value}
        </h2>
        <h2 className="text-center font-bold text-[2.5rem] heading-font uppercase text-primary">
          {city}
        </h2>
        <div className="flex flex-col sm:flex-row relative mt-6 gap-4  sm:bg-black/40 rounded-full p-4 justify-center w-4/5 mx-auto">
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
        <Button className="bg-primary border border-secondary font-semibold text-secondary w-[200px] mt-8 hover:bg-primary mx-auto py-6 text-lg">
          {data[0].fields[1].value}
        </Button>
      </div>
      <div className="bg-background px-10 py-16 sm:px-20 flex flex-col gap-8">
        <h2 className="text-center uppercase leading-10 font-semibold text-secondary text-[2.1rem] heading-font">
          {data[0].fields[2].value}
          <br /> {data[0].fields[3].value}
          {city}
        </h2>
        <p className="text-center text-[17px]">{data[0].fields[4].value}</p>
        <p className="text-center text-[16px] text-secondary/90">
          {data[0].fields[5].value}
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
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-primary uppercase heading-font text-3xl md:text-4xl font-semibold">
            {data[0].fields[8].value}
          </h2>
          <div
            id="show_name_desc"
            dangerouslySetInnerHTML={{ __html: data[0].fields[9].value }}
          ></div>
          {/* <p className="text-white font-medium">
            Welcome to Chronicle, your prominent partner for trade show booth
            displays and exhibits. With 25+ years’ worth of experience and an
            excellent team, we have been providing exclusive trade show booth
            design services across the United States of America.
          </p>
          <p className="text-white font-medium">
            At Chronicle, we are aware that exhibitions and trade shows serve as
            a fantastic opportunity for companies like you to display your
            products and services to potential customers. For this reason, we
            build visually attractive custom trade show booth designs that can
            make your brand stand out from the crowd.
          </p>
          <p className="text-white font-medium">
            As a trusted trade show booth builder, we have completed 20800+
            trade show booth displays design and building projects successfully.
            Our team of dedicated professionals will handle all your shows with
            efficiency and precision. We will guide you at every step, from
            laying the concept, outlining the trade show booth design, and
            fabricating to installing, dismantling, and storing.
          </p>
          <p className="text-white font-medium">
            You are important to us and we will never compromise on your work.
            We believe in building long-lasting relationships and will support
            you throughout your trade show journey.
          </p> */}
          <Button
            style={{ transitionDuration: "500ms" }}
            className="rounded-full w-full md:w-[30%] mx-auto px-16 py-6 font-thin text-lg text-white border hover:bg-primary hover:text-black hover:font-medium mt-4 bg-transparent border-primary"
          >
            Get Personalised Quote
          </Button>
        </div>
      </div>
      <div className="p-10 md:p-20 pb-10">
        <h2 className="uppercase text-3xl heading-font-600 text-primary text-center font-semibold">
          HAVE A LOOK AT OUR TRADE SHOW EXHIBIT RENTAL WORK IN {city}
        </h2>
        <p className="text-center mt-4">
          We have always considered the opinions of our clients while building a
          trade show booth. It has helped us in meeting their expectation in the
          best possible manner. Let us take a look at various that we have built
          for our clients. All these designs have met the goals and requirements
          of the clients.
        </p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[420px,420px,420px] w-full md:w-max mx-auto gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-6">
          {displayedData.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl w-full sm:w-[420px] h-[200px] sm:h-[250px] md:h-[230px]"
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
      <Products location={city} />
      <div className="bg-background py-12 px-8 md:px-20 lg:px-32">
        {/* Section 1 */}
        <section className="py-10 text-secondary">
          <h2 className="text-2xl md:text-3xl font-bold uppercase heading-font text-secondary mb-4">
            FINEST QUALITY {city} TRADE SHOW DISPLAYS FOR IMPACTFUL BRAND
            PRESENCE
          </h2>
          <p className="text-gray-800  mb-6">
            While participating in a trade show, every business looks for
            stunning booth rentals that help it stand out from the crowd. It
            becomes a more challenging task for exhibitors who are new or have a
            low budget for exhibition endeavors. Chronicle Exhibits LLC. has the
            perfect solution for such needs i.e. {city} trade show booth
            rentals.
          </p>
          <p className="text-secondary mb-6">
            A {city} booth exhibit rental empowers your business to have an
            impactful presence on the trade show floor if you choose the best
            booth builder like us. Our experts ensure:
          </p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 py-2 ">
              <DiamondSvg />
              <span>
                You gain the maximum advantage of the available space in terms
                of utility with the best aesthetics.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2">
              <DiamondSvg />
              <span>
                You get enough space to showcase your product or service and
                interact with your booth visitors.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 ">
              <DiamondSvg />
              <span>
                You leave a positive impact on your target audience with our
                premium quality {city} trade show booth ideas.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 ">
              <DiamondSvg />
              <span>
                You get the best value for your money invested through our
                extraordinary exhibition stands.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2 ">
              <DiamondSvg />
              <span>
                You accomplish your branding and marketing goals convincingly
                with our trade show booths.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="py-10 text-secondary ">
          <h2 className="text-2xl md:text-3xl font-bold uppercase heading-font text-secondary mb-4">
            FINEST QUALITY {city} TRADE SHOW DISPLAYS FOR IMPACTFUL BRAND
            PRESENCE
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            Our proficient team follows a comprehensive approach to meet your{" "}
            {city} rental booth requirements. When you collaborate with us for
            {city} custom exhibit rentals, you gain an unbeatable edge over
            other exhibitors.
          </p>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 py-2 ">
              <DiamondSvg />
              <span>
                We use astonishing fabric, eye-catching graphics, and appealing
                displays to give your {city} booth an elegant look.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2">
              <DiamondSvg />
              <span>
                Every business has its requirements and that is why we offer
                customized trade show booth rentals.
              </span>
            </li>
            <li className="flex items-center gap-2 py-2">
              <DiamondSvg />
              <span>
                We convert your brand essence and your vision into brilliant
                exhibit booth rentals to help you achieve your branding goals.
              </span>
            </li>
            <li className="flex items-center gap-2 text-secondary py-2 ">
              <DiamondSvg />
              <span>
                Our expert team and latest manufacturing capabilities allow us
                to attain excellent quality standards for every project.
              </span>
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="py-10">
          <h2 className="text-2xl md:text-3xl uppercase font-bold heading-font text-secondary mb-4">
            GET IN TOUCH WITH US FOR CREATIVE {city} TRADE SHOW BOOTH IDEAS
          </h2>
          <p className="text-gray-800 ">
            At Chronicle Exhibits LLC, we believe in building long-lasting
            business relationships by building trust. Our experts always strive
            to provide impressive {city} trade show booth rentals at the best
            prices. We are just a few clicks away from making your business
            stand out at the next trade show with {city} trade show exhibit
            rentals that convert foot traffic into customers. Call us or send
            your query to us directly through our website now.
          </p>
        </section>
      </div>
      <div className="bg-white py-10">
        <h2 className="text-3xl heading-font text-secondary text-center uppercase">
          Top Trade Shows in {city}
        </h2>
        <div className="grid lg:grid-cols-[290px,290px,290px,290px] md:grid-cols-3 gap-x-12 gap-y-12 sm:grid-cols-2 gap-4 px-20 pb-10 mt-12">
          {shows.map((show) => (
            <div
              key={show.id}
              className="h-[300px] bg-white flex shadow-one rounded-xl flex-col gap-5 items-center p-6"
            >
              <h4 className="text-secondary heading-font text-2xl uppercase font-semibold">
                {show.title}
              </h4>
              <Image
                className="rounded-full"
                width={120}
                height={120}
                src={show.image}
                alt={show.title}
              />
              <div className="flex flex-col gap-2 w-full px-4">
                <p className="flex gap-4">
                  <MapPin color="#B0CB1F" />
                  <span className="text-[16px]">{show.location}</span>
                </p>
                <p className="flex  gap-4">
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
            View All Trade Shows in {city}
          </Button>
        </div>
      </div>
      {/* <Queryform /> */}
      <Footer />
    </>
  );
};

export default Page;
