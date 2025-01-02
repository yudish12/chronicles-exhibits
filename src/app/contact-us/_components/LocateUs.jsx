import React from "react";

const LocateUs = () => {
  return (
    <div className="bg-background flex flex-col justify-center items-center ">
      <div className="text-[#B0CB1F] text-xl font-bold py-4 ">
        Locate Us On The Map
      </div>
      <div className="text-secondary font-light  py-2  ">
        <p>
          {" "}
          Want to meet us ? You are welcome at Chronicle&apos;s head office .
          Refer to the map given below to find our location.{" "}
        </p>
      </div>
      <div className="py-6">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d25775.73460659082!2d-115.276006!3d36.143021!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c1edca3c4097%3A0x3d67c01115c86d20!2sChronicle%20Exhibits%20LLC%20%7C%20Trade%20Show%20Booth%20Rental%20Company!5e0!3m2!1sen!2sin!4v1735836505245!5m2!1sen!2sin"
          style={{
            width: "1000px",
            height: "500px",
            border: "2px solid #B0CB1F",
            borderRadius: 5,
          }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default LocateUs;
