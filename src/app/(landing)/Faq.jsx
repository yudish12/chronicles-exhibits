import React from "react";
// import faqs from "../../utils/constants/dev-data/faqs.json";
import "./faq.css";

const Faq = ({ fields }) => {
  const faqs = fields[43].value.map((faq) => ({
    heading: faq.question,
    text: faq.answer,
  }));
  return (
    <>
      <div id="" className="px-6 bg-gray-200 md:px-20 py-8 md:py-12">
        <h4
          style={{ lineHeight: "42px" }}
          className="heading-font lg:mx-52 xl:mx-72 text-secondary text-xl md:text-3xl text-center font-semibold mb-4 md:mb-6"
        >
          {fields[41].value}
        </h4>
        <p className="text-center lg:mx-36 xl:mx-56 text-base">
          {fields[42].value}
        </p>
        <div className="flex items-center justify-center py-2 lg:px-12">
          <div className="container pb-8 ">
            <div className="grid sm:w-[95%] md:w-[90%] mx-auto grid-cols-1 mt-8 md:grid-rows-3 gap-0">
              {faqs.map((e, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg  border border-black overflow-hidden mb-4 md:mb-6"
                >
                  <div className="bg-black flex items-center p-4">
                    <h4 className="text-primary body-bold  text-sm md:text-base flex items-center">
                      <span className="text-primary flex justify-center items-center body-bold text-lg md:text-xl">
                        0{index + 1}
                      </span>
                      <span className="border-r-2 border-gray-300 mx-3 h-5"></span>
                      {e.heading}
                    </h4>
                  </div>
                  <p className="text-black p-4 text-sm md:text-[15px]">
                    {e.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
