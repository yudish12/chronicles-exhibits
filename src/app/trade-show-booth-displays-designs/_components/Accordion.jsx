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

// Accordion Component with smooth transitions
const Accordion = ({ questions, answers }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {questions.map((item, index) => (
        <div key={index} className="border-b border-gray-300 last:border-none">
          {/* Accordion Header */}
          <button
            className="flex justify-between items-center w-full bg-secondary text-white font-bold p-4 cursor-pointer transition-all duration-300 ease-in-out"
            onClick={() => toggleAccordion(index)}
            aria-expanded={openIndex === index}
          >
            <h4 className="text-lg">{item}</h4>
            <span className="ml-4 transform transition-transform duration-300">
              {openIndex === index ? (
                <MinusSign />
              ) : (
                <PlusSign />
              )}
            </span>
          </button>

          {/* Accordion Content with smooth transition */}
          <div
            className={`grid transition-all duration-500 ease-in-out ${
              openIndex === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-gray-800 text-lg p-4 bg-white shadow-md rounded-md">
                {answers[index]}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
