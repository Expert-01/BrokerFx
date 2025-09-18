import { useState, useRef, useEffect } from "react";
import Button from "@/components/UI/Button.jsx";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "About" },
    { name: "Plans", path: "plans" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Contact", path: "/contact" }
  ];
  const location = useLocation();
  const [active, setActive] = useState(navItems[0].name);
  const [sliderStyle, setSliderStyle] = useState({ left: 0, width: 70 });
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
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-3 md:px-9 py-6 md:py-9 mb-0">
      <img src={Logo} className="w-28 h-12 md:w-40 md:h-24 object-contain ml-0 md:ml-0" />
      {/* Desktop Nav */}
      <div className="hidden md:block relative w-[30%] ">
        <ul className="flex md:flex space-x-2 text-gray-300 backdrop-blur-md border border-[1px] border-[#fff]/10 bg-[#fff]/10 backdrop-blur-md p-3 w-[105%] justify-center rounded-full relative">
          {/* Slider */}
          <span
            className="absolute top-0 h-full glass-radial-btn rounded-full transition-all duration-300"
            style={{ left: sliderStyle.left, width: sliderStyle.width, zIndex: 0 }}
          ></span>
          {navItems.map((item, idx) => (
            <li
              key={item.name}
              ref={el => navRefs.current[idx] = el}
              className={`w-full px-4 py-2 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center font-semibold relative z-10 
                ${active === item.name ? "text-white-700 " : " hover:w-full hover:h-full hover:block hover:text-white"}`}
            >
              <Link to={item.path} className="w-full h-full block" onClick={() => setActive(item.name)}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Desktop Login Button */}
      <div className="hidden md:block">
        <Link to="/login">
          <Button className="bg-[#d4af37] text-black font-semibold glass-radial-btn w-[100px] rounded-full">
            Login
          </Button>
        </Link>
      </div>
      {/* Hamburger Icon for Mobile */}
        <button
          className="md:hidden shadow-lg relative z-50 ml-4"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <span className={`block w-7 h-1 rounded bg-[#d4af37] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`block w-7 h-1 rounded bg-[#d4af37] my-1 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}></span>
          <span className={`block w-7 h-1 rounded bg-[#d4af37] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40 flex flex-col items-center justify-center">
          <ul className="space-y-8 text-2xl font-orbitron">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link to={item.path} onClick={() => setMenuOpen(false)} className="text-white">
                  {item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <Button className="bg-[#d4af37] text-black font-semibold glass-radial-btn w-[120px] rounded-full text-lg">
                  Login
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
      <style>{`

    
        
      `}</style>
    </nav>
  );
};

export default Navbar;


