import Image from "next/image";
import React from "react";

const Leadingtrade = () => {
  return (
    <div className="p-20 flex gap-10">
      {/* Image Container */}
      <div className="w-1/3">
        <Image
          layout="responsive" // Ensures the image is responsive
          width={370} // Aspect ratio width
          height={370} // Aspect ratio height
          src="/photo1.png"
          alt="photo1"
          className="object-cover" // Ensures the image covers the container
        />
      </div>
      {/* Text Content */}
      <div className="w-2/3">
        <h3
          style={{ lineHeight: "1.2" }}
          className="heading-font uppercase font-semibold text-secondary text-[2rem]"
        >
          Leading Trade Show Booth Builders for Events Across America
        </h3>
        <p className="text-black mt-6 text-base">
          Welcome to Chronicle, your prominent partner for trade show booth
          displays and exhibits. With 25+ years&apos; worth of experience and an
          excellent team, we have been providing exclusive trade show booth
          design services across the United States of America.
          <br />
          <br />
          At Chronicle, we are aware that exhibitions and trade shows serve as a
          fantastic opportunity for companies like you to display your products
          and services to potential customers. For this reason, we build
          visually attractive custom trade show booth designs that can make your
          brand stand out from the crowd.
          <br />
          <br />
          As a trusted trade show booth builder, we have completed 20800+ trade
          show booth displays design and building projects successfully. Our
          team of dedicated professionals will handle all your shows with
          efficiency and precision. We will guide you at every step, from laying
          the concept, outlining the trade show booth design, and fabricating to
          installing, dismantling, storing.
          <br />
          <br />
          You are important to us, and we will never compromise on your work.We
          believe in building long-lasting relationships and will support you
          throughout your trade show journey.
        </p>
      </div>
    </div>
  );
};

export default Leadingtrade;