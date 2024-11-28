import { headerRoutes } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const RouteComponent = ({ link, name }) => {
  return (
    <Link className=" text-base text-white font-medium" href={link}>
      {name}
    </Link>
  );
};

const HeaderBtns = () => {
  return (
    <>
      <Button className="rounded-md rounded-e-none py-[18px]  text-primary font-semibold border-2 bg-transparent border-primary">
        Schedule A Call
      </Button>
      <Button className="rounded-md rounded-s-none  py-[18px] border-2 border-primary  text-secondary font-semibold">
        Get Quote
      </Button>
    </>
  );
};

const Header = () => {
  return (
    <div className="bg-gradient-to-b sticky top-[-1px] z-10 from-[#5D2A42]/95 to-[#451e2f] border-t-2 border-t-white/60 border-b-2 border-b-primary w-full flex justify-between items-center pb-2 pt-3  text-white text-opacity-60 px-20 gap-4">
      <Image alt="logo" src="/chronicle-logo.svg" width={110} height={80} />
      <div className="flex items-center gap-12">
        {headerRoutes.map((route, index) => (
          <RouteComponent key={index} link={route.link} name={route.name} />
        ))}
      </div>
      <div>
        <HeaderBtns />
      </div>
    </div>
  );
};

export default Header;
