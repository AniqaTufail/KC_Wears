"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react" // install with: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
           {/* <div className="flex items-center gap-3 ml-10 mt-4">
    <img src="/logo.png" alt="Logo" className="w-25 h-25 object-contain"/>
    
  </div> */}

    
    <div className="fixed top-8 left-1/2 -translate-x-1/2 
            bg-white/10 backdrop-blur-lg border border-white/20 
            rounded-full shadow-xl px-10 py-4 z-50">

    <div className="flex items-center justify-between gap-10">

    {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-white font-large">
          <Link href="#" className="hover:text-orange-400 cursor-pointer">About</Link>
          <Link href="#"className="hover:text-orange-400 cursor-pointer">Shop by Categories</Link>
          <Link href="#"className="hover:text-orange-400 cursor-pointer">Shop by Industries</Link>
          <Link href="#"className="hover:text-orange-400 cursor-pointer">Contact us</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-5 w-5 text-white" />  // mobile size
            ) : (
              <Menu className="h-5 w-5 text-white" /> // mobile size
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-8 flex flex-col space-y-8 text-gray-800 font-medium">
          <Link href="#" className="hover:text-orange-400 cursor-pointer">About</Link>
          <Link href="#" className="hover:text-orange-400 cursor-pointer">Shop by Categories</Link>
          <Link href="#"className="hover:text-orange-400 cursor-pointer">Shop by Industries</Link>
          <Link href="#" className="hover:text-orange-400 cursor-pointer">Contact us</Link>
        </div>
      )}
    </div> </div>
  )
}

export default Navbar
