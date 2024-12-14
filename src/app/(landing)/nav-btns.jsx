"use client";
import React from "react";
import { Button } from "@/components/ui/button";
const HeaderBtns = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <Button className="rounded-full hover:bg-primary hover:text-white px-8 py-4 font-thin text text-lg rounded-e-none text-black border bg-transparent border-primary">
        Schedule Call
      </Button>
      <Button className="rounded-full hover:bg-primary hover:text-white px-8 py-4 font-thin text text-lg rounded-s-none text-black border border-l-0 bg-transparent border-primary">
        Get Quote
      </Button>
    </>
  );
};

export default HeaderBtns;
