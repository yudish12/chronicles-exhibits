import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Queryform = () => {
  return (
    <div className="p-6 sm:p-14 md:p-20 queryform flex flex-col items-center gap-4">
      <h5 className="text-primary text-center text-lg sm:text-xl font-semibold">
        Enquiry Form
      </h5>
      <h2 className="heading-font text-white text-center text-xl sm:text-2xl md:text-3xl uppercase font-semibold">
        Describe Your Trade Show Booth Requirements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full sm:w-[80%] md:w-[64%]">
        <Input
          placeholder="First Name"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-5 col-span-1 sm:col-span-2 rounded-lg"
        />
        <Input
          placeholder="Email ID"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <Input
          placeholder="Phone Number"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <Input
          placeholder="Budget"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <Input
          placeholder="Choose File"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-5 rounded-lg"
        />
        <textarea
          rows={3}
          placeholder="Message/Customisations"
          className="bg-white border-primary placeholder:text-secondary/50 p-4 border-2 rounded-lg col-span-1 sm:col-span-2"
        ></textarea>
      </div>
      <Button
        style={{ transitionDuration: "500ms" }}
        className="bg-transparent rounded-full mt-2 border-2 border-primary text-primary transition-all hover:bg-primary hover:text-secondary font-semibold px-6 py-2"
      >
        Customize Now
      </Button>
    </div>
  );
};

export default Queryform;
