

import { useState, useRef, useEffect } from "react";
import Button from "@/components/UI/Button.jsx";
import { Link, useLocation } from "react-router-dom";

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

  useEffect(() => {
    const current = navItems.findIndex(item => location.pathname === item.path);
    setActive(navItems[current]?.name || navItems[0].name);
    if (navRefs.current[current]) {
      const el = navRefs.current[current];
      setSliderStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-9 py-9 mb-0">
      <h1 className="text-2xl font-bold text-[#d4af37]">EliteFx</h1>
      <div className="hidden md:block relative w-[30%] ">
  <ul className="flex md:flex space-x-2 text-gray-300 border border-[2px] border-[#fff]/10 bg-[#000]/30 backdrop-blur-md p-3 w-[105%] justify-center rounded-full relative">
          {/* Slider */}
          <span
            className="absolute top-0 h-full bg-[#d4af37] rounded-full transition-all duration-300"
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
      <Link to="/login">
        <Button className="bg-[#d4af37] text-black font-semibold rounded-full fancy-btn">
          Login
        </Button>
      </Link>
            <style>{`
  
    
        
      `}</style>
    </nav>
  );
};

export default Navbar;


