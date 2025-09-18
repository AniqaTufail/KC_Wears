"use client";
import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import Link from "next/link";

const HeroSection = () => {
  const [typingDone, setTypingDone] = useState(false);

  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center text-center">
    
      <div className="absolute inset-0">
        <img
          src="/herosection.png"
          alt="KC Wears Hero"
          className="w-full h-full object-cover brightness-90"
        />
        

      

    </div>
    </div>
  );
};

export default HeroSection;
