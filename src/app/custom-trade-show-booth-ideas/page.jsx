import Header from "@/components/ui/header";
import SubHeader from "@/components/ui/sub-header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ourWorksData from "../../utils/constants/dev-data/our-works.json";
import { StoreIcon } from "lucide-react";
import Queryform from "../(landing)/Queryform";
import Footer from "@/components/ui/footer";
import Ourworks from "../(landing)/Ourworks";

const Page = () => {
  return (
    <>
      <SubHeader />
      <Header />
      <div className="featured-bg flex justify-center flex-col gap-8 items-center">
        <h2 className="text-4xl uppercase font-semibold heading-font text-white">
          Custom Trade Show Booth Design Ideas
        </h2>
        <h4 className="text-2xl font-semibold text-center heading-font text-white">
          Create Custom Trade Show Booth Design
          <br /> to help you promote your brand on the Show Floor
        </h4>
      </div>
      <div className="bg-background px-20 flex flex-col gap-6 py-12">
        <h2 className="text-3xl text-center font-medium heading-font text-secondary">
          The foundation of a custom Trade Show Booth is Creative Designs.
        </h2>
        <p className="text-[17px] text-center">
          Awe-inspiring booth designs can draw our attention and impress our
          minds like none other! In the case of trade shows or other events, an
          appealing customized trade show booth can easily attract visitors’
          attention while displaying your brand’s presence on the event floor.
          The combination of unique customized booth designs and high
          top-quality materials can give distinctive appeal to your booth’s look
          and generate high-quality leads. Be a pillar of your company’s image.
        </p>
        <p className="text-[17px] text-center">
          Examining each aspect of your custom
          <Link href={"/"}>trade show booth design</Link> is crucial to creating
          an engaging and captivating custom trade booth. Our team of experts at
          Chronicle conducts thorough market research as well as intense
          brainstorming to assess designs for custom trade show booth ideas that
          have the potential to entice visitors. Additionally, thanks to our
          knowledge and highly skilled creative team, we design and build
          exclusive trade show exhibits custom-designed to your specifications
          that will convey your message quickly. Since we are one of the most
          reputable custom trade fair booth manufacturers, we use only
          top-quality materials to design customized trade show exhibits to
          promote your message. In addition, the Chronicle staff can comprehend
          your goals and goals and then suggest the most effective method to
          turn your ideas into a selling-oriented stand.
        </p>
      </div>
      <div className="p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src="/photo1.png"
            alt="photo1"
            className="max-h-[300px] md:max-h-[530px] object-cover"
          />
        </div>
        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className="heading-font uppercase font-semibold text-secondary text-lg sm:text-xl md:text-[2rem]"
          >
            A Perfect Solution for Every Need for Your Custom Trade Show Booths
            Design Requirements
          </h3>
          <p className="text-black mt-4 sm:mt-6 text-base ">
            As the most renowned customized tradeshow booth business, our team
            knows the industry’s specifications and produces top-quality bespoke
            booths to ensure top-quality results. Additionally, we strive to
            create a creative display with our innovative thinking and
            cutting-edge technology. Through bridging the communication gap, our
            entire team works with you, offering our clients the most valuable
            experience in your company.
            <br />
            <br />
            Our variety of custom tradeshow exhibit designs is supported by a
            decade of experience. Furthermore, our expert group of designers
            creates the latest custom booth designs that match your company’s
            vision. The most appropriate aesthetics, strategies, and the latest
            technologies are utilized by our in-house specialists, who assist us
            in designing custom booth designs for trade shows.
          </p>
        </div>
      </div>
      <div className="p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
        <div className="w-full md:w-1/2">
          <h3
            style={{ lineHeight: "1.2" }}
            className="heading-font uppercase font-semibold text-secondary text-lg sm:text-xl md:text-[2rem]"
          >
            Can we help you with Customized Booths for Trade Shows?
          </h3>
          <p className="text-black mt-4 sm:mt-6 text-base ">
            As the most renowned customized tradeshow booth business, our team
            knows the industry’s specifications and produces top-quality bespoke
            booths to ensure top-quality results. Additionally, we strive to
            create a creative display with our innovative thinking and
            cutting-edge technology. Through bridging the communication gap, our
            entire team works with you, offering our clients the most valuable
            experience in your company.
            <br />
            <br />
            Our variety of custom tradeshow exhibit designs is supported by a
            decade of experience. Furthermore, our expert group of designers
            creates the latest custom booth designs that match your company’s
            vision. The most appropriate aesthetics, strategies, and the latest
            technologies are utilized by our in-house specialists, who assist us
            in designing custom booth designs for trade shows.
          </p>
        </div>
        {/* Image Container */}
        <div className="w-full md:w-1/2">
          <Image
            layout="responsive" // Ensures the image is responsive
            width={370} // Aspect ratio width
            height={250} // Aspect ratio height
            src="/photo1.png"
            alt="photo1"
            className="max-h-[300px] md:max-h-[530px] object-cover"
          />
        </div>
        {/* Text Content */}
      </div>
      <div className="flex flex-col px-20 py-8 gap-6">
        <h3 className="text-secondary text-center text-4xl font-semibold heading-font">
          Are You Searching for Trade Show Exhibits and Booth Design Services?
        </h3>
        <p className="text-[17px] text-center">
          We aim to attain the sole goal of ensuring customer satisfaction
          through the unique custom-designed trade show. Hence, our graphic
          designers and production team will work according to your needs. There
          is a well-known expression, “the first impression is the final
          impression.” Our fully-integrated headquarters work closely to create
          a memorable first glimpse of your company’s image. Additionally, when
          creating attractive exhibit designs, we concentrate on making every
          angle appealing so that your target viewers get the most effective
          perspectives from all angles. Our customized designs convey your
          message through subtle and sophisticated colors to increase
          engagement. The most sophisticated custom booth or exhibits designs
          will get the news you want to say, engage your audience, and offer you
          top-quality results.
        </p>
        <p className="text-[17px] text-center">
          Our team is also there to assist you with our after-sales service and
          help make your job simple and stress-free on the exhibition floor by
          assembling and disassembling your booth for trade shows. We also
          assign you a project manager who will be attentive to each need and
          address any issues concerning the exhibiting process.
        </p>
      </div>
      <div className="flex flex-col pb-0 py-8 gap-6">
        <h3 className="text-secondary text-center text-4xl font-semibold heading-font">
          Recent Booth Designs & Displays in The USA
        </h3>
        <p className="text-[17px] text-center">
          Our recent work in the USA showcases stunning images of our
          exceptional projects. From trade show booths to eye-catching displays,
          our portfolio reflects the expertise and creativity we bring to every
          project. Get inspired by our work and let us create a standout
          experience for your brand.
        </p>
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
