"use client";

import { useState } from "react";

export default function SubNav({
  title,
  nav1,
  nav2,
  className,
  defaultActive = null,
  onNavChange,
}) {
  const [activeNav, setActiveNav] = useState(defaultActive);

  const handleNavClick = (nav) => {
    setActiveNav(nav);
    if (onNavChange) {
      onNavChange(nav);
    }
  };

  return (
    <nav
      className={`w-full flex flex-wrap gap-4 md:gap-10 font-bold text-[#4a4a4a] text-lg md:text-xl ${
        className || ""
      }`}
      aria-label={title}
    >
      <div className="flex items-center">
        <span
          className="border-l-4 border-solid border-[#034ea2] mr-2 h-6"
          aria-hidden="true"
        />
        <span className="opacity-50 hover:text-blue-900 transition-all duration-300 cursor-pointer">
          {title}
        </span>
      </div>

      <button
        className={`hover:text-blue-900 transition-all duration-300 cursor-pointer relative
                  ${activeNav === "nav1" ? "text-[#041ECB]" : "opacity-50"}`}
        onClick={() => handleNavClick("nav1")}
        aria-pressed={activeNav === "nav1"}
      >
        {nav1}
        {activeNav === "nav1" && (
          <span
            className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#041ECB] mt-1"
            aria-hidden="true"
          />
        )}
      </button>

      <button
        className={`hover:text-blue-900 transition-all duration-300 cursor-pointer relative
                  ${activeNav === "nav2" ? "text-[#0D4DA2]" : "opacity-50"}`}
        onClick={() => handleNavClick("nav2")}
        aria-pressed={activeNav === "nav2"}
      >
        {nav2}
        {activeNav === "nav2" && (
          <span
            className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#041ECB] mt-1"
            aria-hidden="true"
          />
        )}
      </button>
    </nav>
  );
}
