"use client";

import { headerRoutes } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { Menu, X } from "lucide-react"; // Import Lucide Icons

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-b sticky top-[-1px] z-10 from-[#5D2A42]/95 to-[#451e2f] border-t-2 border-t-white/60 border-b-2 border-b-primary w-full flex justify-between items-center pb-2 pt-3 text-white text-opacity-60 px-6 md:px-20 gap-4">
      <Image alt="logo" src="/chronicle-logo.svg" width={110} height={80} />
      <div className="hidden md:flex items-center gap-12">
        {headerRoutes.map((route, index) => (
          <RouteComponent key={index} link={route.link} name={route.name} />
        ))}
      </div>
      <div>
        <HeaderBtns />
      </div>

      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
          {/* Lucide Icons */}
        </button>
      </div>

      {/* Mobile Menu (Full-Screen Overlay) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full  bg-opacity-70 z-30 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed top-0 left-0 w-3/4 h-full bg-secondary p-6 text-black flex flex-col gap-6 transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex flex-row absolut left-0 justify-items-end text-black ">
            <button
              onClick={closeMenu}
              className="text-white bg-secondary p-2 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col text-white gap-6">
            {headerRoutes.map((route, index) => (
              <RouteComponent key={index} link={route.link} name={route.name} />
            ))}
            <div className="mt-4">
              <Button>Get Quote</Button>
              <Button className="text-primary font-semibold border-2 bg-transparent border-primary">
                Schedule Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
