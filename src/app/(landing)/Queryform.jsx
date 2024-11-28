import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

const Queryform = () => {
  return (
    <div className="p-20 queryform flex flex-col items-center gap-4">
      <h5 className="text-primary text-center text-[1.3rem] font-semibold">
        Enquiry Form
      </h5>
      <h2 className="heading-font text-white text-center text-[2rem] uppercase font-semibold">
        Describe Your Trade Show Booth Requirements
      </h2>
      <div className="grid grid-cols-2 mx-auto gap-6  w-[64%]">
        <Input
          placeholder="First Name"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <Input
          placeholder="Last Name"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <Input
          placeholder="Email ID"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <Input
          placeholder="Phone Number"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <Input
          placeholder="$ Budget"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <Input
          placeholder="Choose File"
          className="bg-white border-primary placeholder:text-secondary/50 border-2 text-black py-4 rounded-lg h-11"
        />
        <textarea
          rows={3}
          placeholder="Message/Customisations"
          className="border-primary placeholder:text-secondary/50 p-4 border-2 col-span-2 rounded-lg"
        ></textarea>
      </div>
      <Button
        style={{ transitionDuration: "500ms" }}
        className="bg-transparent mt-2 border-2 border-primary text-primary transition-all hover:bg-primary hover:text-secondary font-semibold"
      >
        Customize Now
      </Button>
    </div>
  );
};

export default Queryform;
