import React from "react";
import "./about-us.css";

const Introduction = ({ fields }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 w-full">
      {/* Heading */}
      <h2 className="text-secondary text-3xl sm:text-4xl heading-font py-6 px-4 sm:px-0 text-center">
        {fields[1].value}
      </h2>
      <div
        id="blog_content"
        className="lg:mx-36 md:mx-20 sm:mx-10 mx-4"
        dangerouslySetInnerHTML={{ __html: fields[2].value }}
      ></div>
    </div>
  );
};

export default Introduction;
