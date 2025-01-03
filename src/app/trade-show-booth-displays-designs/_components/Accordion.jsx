"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";

const MinusSign = ({ setOpen }) => {
  return (
    <svg
      onClick={() => setOpen(false)}
      height="20"
      className="cursor-pointer"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <line
        x1="4"
        y1="10"
        x2="16"
        y2="10"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const PlusSign = ({ setOpen }) => {
  return (
    <svg
      onClick={() => setOpen(true)}
      height="20"
      className="cursor-pointer"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <line
        x1="4"
        y1="10"
        x2="16"
        y2="10"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="4"
        x2="10"
        y2="16"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

const Accordion = ({ heading, description }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);
  console.log(heading, description);
  return (
    <>
      <div className="bg-secondary h-[50px] flex items-center p-4">
        <h4 className="text-white font-bold text-base flex items-center">
          <span className=" text-white flex justify-center items-center font-bold text-2xl">
            {open ? (
              <MinusSign setOpen={setOpen} />
            ) : (
              <PlusSign setOpen={setOpen} />
            )}
          </span>
          <span className="border-r-2 border-gray-300 mx-2 h-5"></span>
          {heading}
        </h4>
      </div>
      <div
        ref={contentRef}
        className="transition-[max-height] bg-white duration-500 ease-in-out"
        style={{
          maxHeight: open ? `${contentRef?.current?.scrollHeight}px` : "0px",
          overflow: "hidden",
        }}
      >
        <p className="text-black p-4 text-[15px]">{description}</p>
      </div>
    </>
  );
};

export default Accordion;
