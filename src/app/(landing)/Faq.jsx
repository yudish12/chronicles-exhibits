import React from "react";
import faqs from "../../utils/constants/dev-data/faqs.json";

const Faq = () => {
  return (
    <div className="px-6 md:px-20 py-8 md:py-12">
      <h4 className="heading-font text-secondary text-lg md:text-2xl text-center font-semibold">
        WHY CHOOSE CHRONICLE EXHIBITS AS YOUR NEXT
      </h4>
      <h4 className="heading-font text-secondary text-lg md:text-2xl text-center font-semibold mb-4 md:mb-6">
        EXHIBITING PARTNER IN THE USA?
      </h4>
      <p className="text-center mb-4 md:mb-6 text-sm md:text-base">
        With more than 25 years of experience in the industry, we understand
        each and every need of exhibitors and strive to provide quality custom
        trade show booths and rentals with an unforgettable exhibiting
        experience.
      </p>
      <div className="grid grid-cols-1 md:grid-rows-3 gap-0">
        {faqs.map((e, index) => (
          <div
            key={index}
            className="bg-white shadow-lg overflow-hidden mb-4 md:mb-6"
          >
            <div className="bg-[#5D2A42] h-auto flex items-center p-4">
              <h4 className="text-white font-bold text-sm md:text-base flex items-center">
                <span className="text-white flex justify-center items-center font-bold text-lg md:text-xl">
                  0{e.id}
                </span>
                <span className="border-r-2 border-gray-300 mx-3 h-5"></span>
                {e.heading}
              </h4>
            </div>
            <p className="text-black p-4 text-sm md:text-[15px]">{e.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
