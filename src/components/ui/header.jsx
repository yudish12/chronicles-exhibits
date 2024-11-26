import { headerRoutes } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./button";

const RouteComponent = ({ link, name }) => {
  return (
    <Link className=" text-sm" href={link}>
      {name}
    </Link>
  );
};

const Header = () => {
  return (
    <div className="bg-gradient-to-b from-[#5D2A42]/95 to-[#451e2f] border-t-[1px] border-t-white w-full flex justify-between items-center pb-2 pt-3  text-white text-opacity-60 px-20 gap-4">
      <Image alt="logo" src="/chronicle-logo.svg" width={110} height={80} />
      <div className="flex items-center gap-12">
        {headerRoutes.map((route, index) => (
          <RouteComponent key={index} link={route.link} name={route.name} />
        ))}
      </div>
      <div>
        <Button>Get Quote</Button>
        <Button className="text-primary font-semibold border-2 bg-transparent border-primary">
          Schedule Call
        </Button>
      </div>
    </div>
  );
};

export default Header;
