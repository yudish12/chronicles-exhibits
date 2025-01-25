"use client";
import React, { useState, useEffect } from "react";

const Timer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-6 justify-center items-center md:space-x-6  text-white">
      {["days", "hours", "minutes", "seconds"].map((key) => (
        <div
          key={key}
          className="flex flex-col items-center justify-center border border-dashed border-gray-400 rounded-md px-4 py-6 w-full sm:w-28 md:w-32 lg:w-40 "
        >
          <span className="text-4xl font-bold">
            {timeLeft[key] !== undefined ? timeLeft[key] : "00"}
          </span>
          <span className="text-lg capitalize">{key}</span>
        </div>
      ))}
    </div>
  );
};

export default Timer;
