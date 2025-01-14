"use client";
import { useState, useEffect, useRef } from "react";

const Counter = ({ targetNumber }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [isInView, setIsInView] = useState(false); // Track if the element is in view
  const counterRef = useRef(null);
  const startTimeRef = useRef(null); // Ref to store startTime across renders

  useEffect(() => {
    const duration = 2000; // Duration for animation in milliseconds

    const animateCounter = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp; // Initialize startTime once
      const elapsed = timestamp - startTimeRef.current;
      const newNumber = Math.min(
        Math.floor((elapsed / duration) * targetNumber),
        targetNumber
      );

      setCurrentNumber(newNumber);

      if (elapsed < duration) {
        requestAnimationFrame(animateCounter); // Continue the animation
      }
    };

    if (isInView) {
      requestAnimationFrame(animateCounter); // Start the animation when in view
    }
  }, [targetNumber, isInView]); // Re-run when targetNumber or isInView changes

  // Set up Intersection Observer to check when the element is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting); // Set state based on whether the element is in view
        });
      },
      { threshold: 0.5 } // Trigger when at least 50% of the element is in view
    );

    if (counterRef.current) {
      observer.observe(counterRef.current); // Observe the counter element
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current); // Clean up when the component is unmounted
      }
    };
  }, []);

  return (
    <div className="text-2xl font-bold transition-all duration-300">
      <span ref={counterRef} className="block text-secondary pt-2 heading-font">
        {currentNumber}
      </span>
    </div>
  );
};

export default Counter;
