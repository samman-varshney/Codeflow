"use client";
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip.jsx";

const people = [
  {
    id: 1,
    name: "Samman Varshney",
    designation: "Backend Engineer",
    image: "/images/samman.jpg", 
  },
  {
    id: 2,
    name: "Yuvraj Singh",
    designation: "Frontend Developer",
    image: "/images/yuvi.jpg",
  },
  {
    id: 3,
    name: "Yash Bansal",
    designation: "Testing Engineer",
    image: "/images/yash.jpg",
  },
  {
    id: 4,
    name: "Ritik Saxena",
    designation: "LLM Engineer",
    image: "/images/ritik.jpg",
  },
];

export default function Contributors() {
  return (
    <section className="flex flex-col items-center justify-center mb-20 w-full">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Our Contributors
      </h2>

      {/* Tooltip with avatars */}
      <div className="flex flex-row items-center justify-center w-full">
        <AnimatedTooltip items={people} />
      </div>
    </section>
  );
}
