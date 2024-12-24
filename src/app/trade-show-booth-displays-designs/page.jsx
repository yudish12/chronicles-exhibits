import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import React from "react";
import cardData from "../../utils/constants/dev-data/product-card.json";
import Accordion from "./_components/Accordion";
import accData from "../../utils/constants/dev-data/booth-design-accordion.json";
import Link from "next/link";

const page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="booth-design-bg px-20 flex justify-center gap-4 flex-col items-center">
        <h2 className="text-[2.1rem] uppercase font-semibold text-secondary text-center heading-font">
          Trade Show Booth Design and Exhibit Displays
        </h2>
        <p className="text-[17.5px] text-center">
          Chronicle Exhibits LLC – Your ultimate choice for custom and modular
          trade show booth displays. We pride ourselves on crafting bespoke
          exhibition stands that perfectly embody your brand&apos;s unique
          identity. Elevate your trade show experience with Chronicle Exhibits
          LLC and make a statement that sets you apart from the competition.
        </p>
      </div>
      <div className="px-20 flex gap-20 pt-16 pb-20">
        <Image
          src="/booth-design-2.png"
          alt="booth design"
          className="w-1/2 max-w-[590px] max-h-[570px]"
          width={800}
          height={800}
        />
        <div className="flex flex-col w-1/2 gap-6 ">
          <h4 className="text-primary text-xl font-semibold">How It Works</h4>
          <h3
            style={{ lineHeight: "1.2" }}
            className="text-secondary uppercase font-bold heading-font text-[1.7rem]"
          >
            exclusive Trade Show Exhibit Designs & creative Booth Building
            Concept
          </h3>
          <p className="text-[16px] font-medium text-black">
            Get visually stunning, space-efficient, and highly functional rental
            booths with us and gain maximum visitor engagement at your next
            event. Our professionals follow a streamlined process for trade show
            rentals to make your exhibit experience smooth. Let us come together
            to drive your brand value to new heights.
          </p>
          <div className="bg-transparent flex flex-col gap-6 overflow-hidden mb-6">
            {accData.map((e, ind) => (
              <div key={ind}>
                <Accordion heading={e.heading} description={e.description} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="product-bg w-full flex flex-col items-center py-14">
        <h4 className="text-[1.3rem] font-bold text-primary pt-4 mb-3">
          Booth By Size
        </h4>
        <h2 className="text-center uppercase heading-font text-white text-[2rem] font-bold">
          Explore Our Impressive Range of Exhibition Stand Rentals
        </h2>
        <p className="text-center text-gray-300 text-md pt-4">
          Check out our extensive range of engaging trade show display rentals
          to find the best fit size according to your event needs.
        </p>
        <div className="grid grid-cols-3 py-12 px-32 gap-x-12 gap-y-10">
          {cardData.map((item, index) => (
            <Link
              href={`/booth/size/${item.size}`}
              key={index}
              className="h-[370px] hover:scale-110 duration-300 transition-all rounded-xl shadow-one overflow-hidden w-full bg-secondary flex flex-col"
            >
              {/* Image Section */}
              <Image
                src={item.imgSrc}
                width={350}
                height={300}
                alt={item.size}
                className="w-full h-3/4 object-cover"
              />
              {/* Content Section */}
              <div className="flex h-1/4 heading-font bg-white flex-col justify-center items-center bg-secondary/[.94] text-secondary">
                <p className=" text-[1.65rem] font-semibold">{item.size}</p>
                <p className="uppercase text-lg font-semibold">
                  trade show booth rental
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="p-20 flex flex-col gap-3 pb-28">
        <h4 className="text-primary text-[1.3rem] font-semibold text-center">
          Advantages of Trade Show Booth Displays with Chronicle
        </h4>
        <h3 className="heading-font text-[2.1rem] uppercase font-semibold text-secondary text-center">
          Why Choose Trade Show Booth or Exhibits Displays?
        </h3>
        <p
          style={{ lineHeight: "1.4" }}
          className="text-[15.8px] mt-2 text-center text-black"
        >
          At Chronicle Exhibits LLC, we understand that exhibitors worldwide
          seek trade show booth designs that are not just visually appealing but
          also compelling and engaging. Custom trade show booths hold the power
          to captivate audiences and set your brand apart from the competition.
          We pride ourselves on being leaders in creating unique and innovative
          trade show booth displays that effectively convey your brand’s message
          and leave a lasting impression on your audience.
        </p>
        <p
          style={{ lineHeight: "1.4" }}
          className="text-[15.8px] mt-3 text-center text-black"
        >
          Investing in a custom trade show booth design with us translates into
          elevated return on investment and boosted sales. The unique design and
          strategic placement of your brand elements ensure that your booth
          becomes an unforgettable experience for visitors, resulting in higher
          engagement and lead generation.
        </p>
        <p
          style={{ lineHeight: "1.4" }}
          className="text-[15.8px] mt-3 text-center text-black"
        >
          So, when it comes to creating an exceptional trade show experience
          that showcases your brand’s essence and captivates visitors, choose
          Chronicle Exhibits LLC. as Trade Show Booth Builder Let our
          creativity, passion, and commitment to excellence elevate your brand’s
          presence at every trade show you attend. Stand out from the
          competition, attract your target audience, and leave a lasting
          impression with a trade show booth designed by us.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default page;
