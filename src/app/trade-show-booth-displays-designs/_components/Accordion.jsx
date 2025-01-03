"use client";
import React, { useState } from "react";

// SVG Icon Components for Plus and Minus
const MinusSign = () => (
  <svg
    height="20"
    width="20"
    className="cursor-pointer text-white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <line
      x1="4"
      y1="10"
      x2="16"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const PlusSign = () => (
  <svg
    height="20"
    width="20"
    className="cursor-pointer text-white"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
  >
    <line
      x1="4"
      y1="10"
      x2="16"
      y2="10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <line
      x1="10"
      y1="4"
      x2="10"
      y2="16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Accordion Component
const Accordion = ({ questions, answers }) => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <>
      {questions.map((item, index) => (
        <div key={index} className="border-b last:border-none">
          {/* Accordion Header */}
          <div
            className="flex justify-between items-center bg-secondary text-white font-bold p-3 cursor-pointer"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            role="button"
          >
            <h4 className="text-lg">{item}</h4>
            <span className="ml-4">
              {openIndex === index ? <MinusSign /> : <PlusSign />}
            </span>
          </div>

          {/* Accordion Content */}
          <div
            className={`overflow-hidden transition-all px-3 duration-500 ease-in-out ${
              openIndex === index ? "max-h-screen py-2 bg-white" : "max-h-0 "
            }`}
          >
            <p className="text-gray-800 text-sm">{answers[index]}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
