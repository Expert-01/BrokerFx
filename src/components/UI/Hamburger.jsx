import React from "react";

export default function Hamburger({ onClick }) {
  return (
    <button
      className="md:hidden fixed top-6 right-6 z-50 bg-transparent border-none outline-none"
      onClick={onClick}
      aria-label="Open menu"
    >
      <span className="block w-12 h-12 rounded-full bg-gradient-to-b from-[#232946] to-[#0A0F1F] flex items-center justify-center shadow-lg">
        <svg width="40" height="40" viewBox="0 0 70 105" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="52.5" r="35" fill="url(#grad)" />
          <rect x="20" y="45" width="30" height="4" rx="2" fill="#232946" />
          <rect x="20" y="56" width="30" height="4" rx="2" fill="#232946" />
          <defs>
            <radialGradient id="grad" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(70 0 0 105 0 0)" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fff" />
              <stop offset="1" stopColor="#232946" />
            </radialGradient>
          </defs>
        </svg>
      </span>
    </button>
  );
}
