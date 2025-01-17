"use client";

import { headerRoutes } from "@/lib/config";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./button";
import { Menu, X } from "lucide-react"; // Import Lucide Icons
import useScrollPosition from "../useScroll";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import EnquiryForm from "../Form";
import ScheduleCallForm from "../ScheduleCallForm";
import BoothsizeDropdown from "../booth-size-dropdown";

const RouteComponent = ({ link, name, className }) => {
  if (link === "booth-sizes") {
    return <BoothsizeDropdown className={className} />;
  }

  return (
    <Link
      className={cn(" text-[16.5px]  text-white font-medium", className)}
      href={link}
    >
      {name}
    </Link>
  );
};

export const HeaderBtns = ({ scrollPosition }) => {
  return (
    <div className={cn(scrollPosition > 55 ? "flex gap-4" : "flex gap-4")}>
      <Dialog>
        <DialogTrigger asChild>
          <button
            class="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 schedule-btn bg-primary shadow h-9 px-4 rounded-md hover:bg-primary py-[18px] border-2 border-primary text-secondary body-bold"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:R15hfnt7:"
            data-state="closed"
          >
            Schedule &nbsp; Call
          </button>
        </DialogTrigger>
        <DialogContent className="">
          <ScheduleCallForm />
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-md hover:bg-primary  py-[18px] border-2 border-primary  text-secondary body-bold ">
            Get Quote
          </Button>
        </DialogTrigger>
        <DialogContent className="">
          <EnquiryForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollPosition = useScrollPosition();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-b sticky top-[-1px] z-10 bg-secondary border-t-2 border-t-white/60 border-b-2 border-b-primary w-full flex justify-between items-center py-4 text-white text-opacity-60 px-6 sm:px-8 md:px-12 lg:px-20 gap-4">
      <Link className="relative" href={"/"}>
        <Image
          className="max-h-[60px] min-h-[40px] object-fill"
          alt="logo"
          src="/chronicle-tm-white.svg"
          width={110}
          height={80}
        />
        <span
          style={{ lineHeight: "4px", fontSize: "8px", letterSpacing: "1px" }}
          className="text-white absolute top-5 right-4"
        >
          TM
        </span>
      </Link>
      <div className={cn("hidden lg:flex items-center gap-8")}>
        {headerRoutes.map((route, index) => (
          <RouteComponent key={index} link={route.link} name={route.name} />
        ))}
      </div>
      {/* Hamburger Menu Button for Mobile */}
      <div
        className={`opacity-100 flex items-center gap-10 transition-all duration-700 ease-in-out`}
      >
        <HeaderBtns scrollPosition={scrollPosition} />
        <button
          onClick={toggleMenu}
          className={cn("text-white", scrollPosition < 55 && "hidden")}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>
      </div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className={cn("text-white")}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-opacity-70 z-30 transition-opacity ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      >
        <div
          className={`fixed top-0 left-0 w-1/2 md:w-1/5 h-full bg-secondary p-6 text-black flex flex-col gap-6 transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <div className="flex flex-row justify-between text-black ">
            <Image
              alt="logo"
              src="/chronicle-logo.svg"
              width={110}
              height={80}
            />
            <button
              onClick={closeMenu}
              className="text-white bg-secondary p-2 rounded-full"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col justify-center h-full text-white gap-6">
            {headerRoutes.map((route, index) => (
              <RouteComponent key={index} link={route.link} name={route.name} />
            ))}
          </div>
        </div>
        <div className="fixed bottom-10 left-5">
          <HeaderBtns />
        </div>
      </div>
    </div>
  );
};

export default Header;
