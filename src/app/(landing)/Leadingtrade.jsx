import Image from "next/image";
import "./faq.css";
import React from "react";

const Leadingtrade = ({ fields }) => {
  return (
    <div className="p-6 md:p-20 flex flex-col md:flex-row gap-6 md:gap-10">
      {/* Image Container */}
      <div className="w-full md:w-1/2 sm:rounded-lg md:rounded-none ">
        <Image
          layout="responsive" // Ensures the image is responsive
          width={370} // Aspect ratio width
          height={250} // Aspect ratio height
          src={fields[37].value}
          alt={fields[38].value}
          className="max-h-[300px] md:max-h-[530px] object-cover sm:rounded-lg md:rounded-none "
        />
      </div>
      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-center md:text-justify">
        <h3
          style={{ lineHeight: "1.2" }}
          className="heading-font-700 uppercase font-semibold text-secondary text-lg md:text-xl lg:text-[2rem]"
        >
          {fields[39].value}
        </h3>
        <div
          id="faq-body"
          dangerouslySetInnerHTML={{ __html: fields[40].value }}
          className="text-black mt-4 md:mt-6 text-base "
        ></div>
      </div>
    </div>
  );
};

export default Leadingtrade;
