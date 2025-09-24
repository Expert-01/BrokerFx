import React from "react";

export default function HamburgerIcon({ open, onClick, className = "" }) {
  return (
    <button
      className={`md:hidden shadow-lg relative z-50 flex flex-col items-center justify-center w-9 h-9 bg-transparent border-none focus:outline-none ${className}`}
      onClick={onClick}
      aria-label="Open menu"
      type="button"
    >
      <span className={`block w-7 h-1 rounded bg-[#fff] transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`}></span>
      <span className={`block w-7 h-1 rounded bg-[#fff] my-1 transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>
      <span className={`block w-7 h-1 rounded bg-[#fff] transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`}></span>
    </button>
  );
}
