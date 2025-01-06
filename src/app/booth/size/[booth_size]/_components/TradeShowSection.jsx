import React from "react";
import "./styles.css";

export const DiamondSvg = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="16"
      height="16"
    >
      <polygon
        points="50,0 100,50 50,100 0,50"
        fill="#B0CB1F"
        stroke="#B0CB1F"
        strokeWidth="2"
      />
    </svg>
  );
};

const TradeShowSection = ({ fields, size }) => {
  return (
    <div className="bg-white py-12 px-4 sm:px-8 md:px-20 lg:px-32">
      {/* Section 1 */}
      <section className="py-10 text-secondary">
        <h2 className="text-2xl text-center md:text-3xl font-bold heading-font text-secondary mb-4">
          {fields[7].value}
        </h2>
        <div
          id="blog_content"
          dangerouslySetInnerHTML={{ __html: fields[8].value }}
        ></div>
      </section>
    </div>
  );
};

export default TradeShowSection;
