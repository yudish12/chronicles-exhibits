import React from "react";
import faqs from "../../utils/constants/dev-data/faqs.json";

const Faq = () => {
  return (
    <div className="px-20 py-12">
      <h4 className="text-primary text-[1.35rem] text-center font-semibold mb-8">
        FAQs
      </h4>
      <div className={"grid grid-rows-3"}>
        {faqs.map((e, index) => (
          <div key={index} className="bg-white shadow-lg overflow-hidden mb-6">
            <div className="bg-[#5D2A42] h-[25%] flex items-center p-4">
              <h4 className="text-white font-bold text-base flex items-center">
                <span className=" text-white flex justify-center items-center font-bold text-xl">
                  0{e.id}
                </span>
                <span className="border-r-2 border-gray-300 mx-3 h-5"></span>
                {e.heading}
              </h4>
            </div>
            <p className="text-black p-4 text-[15px]">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
