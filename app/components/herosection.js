"use client";
import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-center text-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/herosection.png"
          alt="KC Wears Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 md:px-12">
     
        <div className="font-medium text-white text-3xl sm:text-4xl md:text-5xl lg:text-5xl">
          KC Wears Is Crafted As A Premium B2B Clothing Brand.
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 text-lg sm:text-xl md:text-2xl text-white">
          With a focus on versatility, durability, and modern design, we empower
          businesses to stand out
        </div>
        <div className="text-lg sm:text-xl md:text-2xl text-white">
          with apparel that makes a statement.
        </div>
        <div className="mt-10 sm:mt-14 md:mt-20">
          <Link
            href="/all-products"
            className="bg-white text-gray-800 rounded-full px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base md:text-lg hover:bg-amber-200 transition duration-300"
          >
            Shop All
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
