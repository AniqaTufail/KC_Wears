"use client"
import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react" // install with: npm install lucide-react

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="z-20 absolute top-0 left-0 w-full px-20 mt-10">
      <div className="flex justify-between items-center">
        
        
        <div className="h-25 w-25 flex items-center">
          <Image
            src="/logo.png"
            alt="KC Wears collection"
            width={280}
            height={207}
            className="block"
            priority
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-12 text-amber-50 font-medium">
          <Link href="#">About</Link>
          <Link href="#">Shop by Categories</Link>
          <Link href="#">Shop by Industries</Link>
          <Link href="#">Contact us</Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="h-8 w-8 text-white" />  // mobile size
            ) : (
              <Menu className="h-8 w-8 text-white" /> // mobile size
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-8 flex flex-col space-y-8 text-amber-50 font-medium">
          <Link href="#">About</Link>
          <Link href="#">Shop by Categories</Link>
          <Link href="#">Shop by Industries</Link>
          <Link href="#">Contact us</Link>
        </div>
      )}
    </div>
  )
}

export default Navbar
