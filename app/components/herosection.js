"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";

export default function HeroCarousel() {
  const slides = [
    { id: 1, title: "Slide One", image: "/5.jpg" },
    { id: 2, title: "Slide Two", image: "/5.jpg" },
    { id: 3, title: "Slide Three", image: "/7.jpg" },
    { id: 4, title: "Slide Four", image: "/8.jpg" }, // ✅ fixed duplicate id
  ];

  return (
    <div className="w-screen h-screen">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-screen h-screen">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* Title */}
              <h1 className="absolute bottom-20 left-10 text-white text-5xl font-bold drop-shadow-lg">
                {slide.title}
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
