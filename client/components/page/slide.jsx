"use client";
import { useState, useEffect } from "react";

import Image from "./imagekit";

const slides = [
  {
    id: 1,
    image: "https://your-image-link-1.jpg",
  },
  {
    id: 2,
    image: "https://your-image-link-2.jpg",
  },
  {
    id: 3,
    image: "https://your-image-link-3.jpg",
  },
];

export default function Slide() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = slides.length;

  // Chuyển đổi slide tự động mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 1000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
      {/* Danh sách các slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <Image
              path={"page/captam-slide"}
              width={1360}
              height={450}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Nút Previous */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❮
      </button>

      {/* Nút Next */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
      >
        ❯
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
