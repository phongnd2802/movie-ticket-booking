"use client";

import Image from "next/image";

export function HeroBanner({ thumbnailUrl, onPlayVideo }) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <Image
        src={thumbnailUrl || "/placeholder.svg?height=500&width=1920"}
        alt="Movie Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <button
          onClick={onPlayVideo}
          className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Play trailer"
        >
          <div className="rounded-full bg-white/80 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
