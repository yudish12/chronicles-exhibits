import Footer from "@/components/ui/footer";
import Header from "@/components/ui/header";
import React from "react";
import Queryform from "../(landing)/Queryform";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import SubHeader from "@/components/ui/sub-header";
import Carousel from "./_components/Carousel";

const ServicePage = () => {
  return (
    <>
      <SubHeader />
      <Header />
      {/* <div className="service-bg flex flex-col gap-16 items-center justify-center">
        <h2 className="text-secondary text-5xl font-semibold heading-font text-center">
          Design | Build | Services
        </h2>
        <Button
          style={{ transitionDuration: "500ms" }}
          className="p-6 hover:scale-110 transition-all hover:bg-black bg-secondary text-white font-semibold text-lg"
        >
          Get A Free Quote
        </Button>
      </div>
      <div className="bg-background px-20 py-16">
        <h3 className="text-secondary font-semibold text-center text-[2rem] heading-font">
          EYE CATCHING TRADE SHOW BOOTH SERVICES
        </h3>
        <p className="text-[17px] text-black text-center mt-6">
          Chronicle Exhibits USA is one of the leading trade show booth
          construction companies known to provide high-quality and eye-catchy
          custom trade show booths and rentals Services. We offer turnkey trade
          show booth services to our clients and strive hard to ensure a smooth
          exhibiting experience for them. Our team of highly adept experts has
          extensive experience in the industry and has successfully served
          innumerable brands and companies with world-class services to date.
        </p>
        <div className="mt-20 grid bg-transparent grid-cols-2 gap-x-20">
          <div
            style={{ transitionDuration: "500ms" }}
            className="group shadow-one hover:bg-secondary bg-white max-w-[650px] p-8 flex flex-col items-center gap-5 rounded-lg justify-center"
          >
            <Image src={"/cube.svg"} width={70} height={70} alt="cube" />
            <h4
              style={{ transitionDuration: "500ms" }}
              className="text-secondary group-hover:text-white text-center text-2xl heading-font font-semibold"
            >
              BOOTH DESIGN
            </h4>
            <p
              style={{ transitionDuration: "500ms" }}
              className="text-black group-hover:text-white text-center"
            >
              Transform your trade show presence with our booth design
              expertise. Our team of designers excels in crafting visually
              striking booths that leave a lasting impression on attendees.
              Whether you need a modern and sleek design or a cozy and inviting
              space, we tailor our services to meet your specific needs,
              ensuring you make a memorable impact at every trade show.
            </p>
          </div>

          <div
            style={{ transitionDuration: "500ms" }}
            className="group shadow-one bg-white hover:bg-secondary max-w-[650px] p-8 flex flex-col items-center gap-5 rounded-lg"
          >
            <Image
              src={"/layers-stacked.svg"}
              width={70}
              height={70}
              alt="cube"
            />
            <h4
              style={{ transitionDuration: "500ms" }}
              className="text-secondary group-hover:text-white text-center text-2xl heading-font font-semibold"
            >
              BOOTH FABRICATION
            </h4>
            <p
              style={{ transitionDuration: "500ms" }}
              className="text-black group-hover:text-white text-center"
            >
              Watch your booth design come to life through our booth fabrication
              service. Our skilled team handles every aspect of the construction
              process, delivering a sturdy and visually appealing booth that
              aligns with your brand aesthetic. With our commitment to quality,
              you can trust your booth will impress visitors and create a
              lasting impression at any event.
            </p>
          </div>
        </div>
      </div> */}
      <div className="text-center mt-8">
        <h2 className="scale-110 text-2xl text-[#B0CB1F] ">Services</h2>
        <p className="mt-6 sm:text-4xl heading-font-700 uppercase text-secondary ">
          eye catching trade show booth solutions
        </p>
      </div>
      <Carousel />
      <Queryform />
      <Footer />
    </>
  );
};

export default ServicePage;
