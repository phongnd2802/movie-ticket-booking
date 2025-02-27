"use client";
import { useState, useEffect } from "react";
import Circle from "./circle";
import Image from "./imagekit";

const IMAGE = [
  "page/samsung.jpg",
  "page/captam-slide",
  "page/interstellar.jpg",
];

export default function Slide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true); // Kích hoạt animation

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % IMAGE.length);
        setIsSliding(false);
      }, 500); // Đợi animation hoàn tất rồi đổi ảnh
    }, 2500); // Tổng thời gian (2s đứng yên + 0.5s chuyển động)

    return () => clearInterval(interval);
  }, []);

  const leftIndex = (currentIndex - 1 + IMAGE.length) % IMAGE.length;
  const centerIndex = currentIndex;
  const rightIndex = (currentIndex + 1) % IMAGE.length;

  return (
    <div className="relative w-full overflow-hidden flex justify-between">
      <div
        className={`w-[15%] pr-2 overflow-hidden max-mds:pr-0 max-md:hidden transition-transform duration-500 ease-in-out ${
          isSliding ? "slide-animation" : ""
        }`}
      >
        <Image width={1360} height={450} path={IMAGE[leftIndex]} />
      </div>

      <div
        className={`flex w-[70%] max-mds:px-0 px-2 max-md:w-full relative max-md:h-full
        transition-transform duration-500 ease-in-out ${
          isSliding ? "slide-animation" : ""
        }`}
      >
        <Image
          className="max-md:h-full max-md:w-full"
          width={1360}
          height={450}
          path={IMAGE[centerIndex]}
        />
        <div className="absolute bottom-2 left-[50%] flex gap-2 translate-x-[-50%]">
          {IMAGE.map((_, index) => (
            <Circle key={index} isShow={index === centerIndex} />
          ))}
        </div>
      </div>

      <div
        className={`w-[15%] pl-2 overflow-hidden max-mds:pl-0 max-md:hidden transition-transform duration-500 ease-in-out ${
          isSliding ? "slide-animation" : ""
        }`}
      >
        <Image width={1360} height={450} path={IMAGE[rightIndex]} />
      </div>
    </div>
  );
}
