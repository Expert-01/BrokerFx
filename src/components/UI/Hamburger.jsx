import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Hamburger() {
      const navItems = [
    { name: "Home", path: "/" },
    { name: "About" },
    { name: "Plans", path: "plans" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" }
  ];
      const location = useLocation();
  const [active, setActive] = useState(navItems[0].name);
  const navRefs = useRef([]);
  const [menuOpen, setMenuOpen] = useState(false);


        useEffect(() => {
          const current = navItems.findIndex(item => location.pathname === item.path);
          setActive(navItems[current]?.name || navItems[0].name);
          if (navRefs.current[current]) {
            const el = navRefs.current[current];
            setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth });
          }
        }, [location.pathname]);
      
    
    return (
        <button
            className="md:hidden shadow-lg relative z-50"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Open menu"
        >
            <span className={`block w-7 h-1 rounded bg-[#d4af37] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-7 h-1 rounded bg-[#d4af37] my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-7 h-1 rounded bg-[#d4af37] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
    )
}