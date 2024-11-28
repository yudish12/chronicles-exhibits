"use client";
import React from "react";
import { Button } from "@/components/ui/button";
const HeaderBtns = () => {
  const [hover, setHover] = React.useState(false);
  return (
    <>
      <Button className="rounded-e-none text-primary font-semibold border-2 bg-transparent border-primary">
        Schedule Call
      </Button>
      <Button className="rounded-s-none text-secondary font-semibold">
        Get Quote
      </Button>
    </>
  );
};

export default HeaderBtns;
