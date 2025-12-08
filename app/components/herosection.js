"use client";
import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const { scrollY } = useScroll();

  // Parallax image movement
  const imgY = useTransform(scrollY, [0, 400], [0, -100]);
  // Text moves up and fades out on scroll
  const textY = useTransform(scrollY, [0, 300], [0, -50]);
  const textOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Typing effect
  const fullText = ["Affordable","Workwear for","Every Profession"];
  const tagline = ["Your ultimate destination for stylish,",
  "comfortable, and versatile clothing",
  "that elevates every moment of your day."];
  const [text, setText] = useState("");
  return (
    <div className="relative w-full h-screen flex justify-center items-center px-0">
      {/* Full-width hero with rounded corners */}
      <div className="relative w-full h-full overflow-hidden shadow-2xl">
        
        {/* Background Image with parallax */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/2.png')",
            y: imgY,
          }}
        />

        {/* Overlay gradient for readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Text Section */}
        <motion.div
          className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16"
          style={{ y: textY, opacity: textOpacity }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white text-left">
            {fullText.map((line, index) => (
          <span key={index}>
            {line}
              <br />
            </span>
            )     )}
          </h1>
          <div className="mt-10">
          <button className="px-6 py-3 bg-white text-black rounded-3xl hover:bg-orange-400 transition inline-block">
    Shop Now
    
  </button></div>

        <motion.p
        className="mt-15 text-l md:text-xl text-white text-left leading-relaxed w-[300px] md:w-[400px] 
             border-l-2 border-white/20 pl-4"
          >
          {tagline.map((line, index) => (
          <span key={index}>
            {line}
              <br />
            </span>
            )     )}
</motion.p>
        </motion.div>
      </div>
    </div>
  );
}
