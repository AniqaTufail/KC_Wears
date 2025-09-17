import React from "react";
import Link from "next/link";
import Image from "next/image"

const HeroSection = () => {
  return (
    <div className=""> 
    <div className= "relative h-screen w-screen"> 
        <Image
          src="/herosection.jpg" 
          alt="KC Wears collection"
          className="object-cover"
          fill
          
        />
        </div>
    
    </div>



  );
};
export default  HeroSection