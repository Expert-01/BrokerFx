import React, { useState, useEffect } from "react";
import { Home, Grid, Mail, Monitor, PieChart, Table, Layout, LayoutDashboardIcon, Map, LogOut, User, DollarSign, CreditCard, Info, Sliders, Bell, FileText, Users, UserCheck } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Link, useLocation } from "react-router-dom";
import Logo from "@/assets/logo.png";


const menu = [
  {
    section: "ACCOUNT",
    items: [
  { name: "My Account", icon: <User size={20} />, link: "/my-account" },
  { name: "Dashboard", icon: <LayoutDashboardIcon size={20} />, link: "/dashboard" },
  { name: "Deposit", icon: <DollarSign size={20} />, link: "/deposit" },
  { name: "Withdrawal", icon: <CreditCard size={20} />, link: "/withdrawal" },
  { name: "Personal Data", icon: <Info size={20} />, link: "/personal-data" },
  { name: "Account Status", icon: <Sliders size={20} />, link: "/account-status" },
  { name: "Promo/Offers", icon: <Bell size={20} />, link: "/promo-offers" },
  { name: "Documents", icon: <FileText size={20} />, link: "/documents" },
  { name: "Pamm", icon: <PieChart size={20} />, link: "/pamm" },
  { name: "Copy Trading", icon: <Users size={20} />, link: "/copy-trading" },
  { name: "Trading", icon: <Table size={20} />, link: "/trading" },
  { name: "Partner Area", icon: <UserCheck size={20} />, link: "/partner-area" },
  { name: "Sign Out", icon: <LogOut size={20} />, link: "/logout" },
    ],
  },
];

const Sidebar = () => {
  const [ user, setUser ] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const location = useLocation();
  //Get user
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token)
        setUser(decoded); 
      } catch (error) {
        console.error("Invalid token:", error);
        
      }
    }
  }, []);

  // Remove hardcoded active
  return (
    <aside
      tabIndex={0}
      className={`fixed left-0 p-4 top-0 h-full
         bg-gradient-to-t from-[#111216] via-[#181a20] to-[#181a1f] border-r border-[#23272f] flex flex-col shadow-xl transition-all duration-300 z-10 md:block hidden
        ${expanded ? "w-56" : "w-[65px]"} hidden md:flex focus:outline-none`}
      onClick={() => setExpanded((prev) => !prev)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
      style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      {/* Logo Card */}
      <div
        className={`flex items-center gap-3 ${expanded ? 'py-6' : 'py-2'} mb-6 transition-all duration-300`}
      >
        <div className="flex items-center justify-center">
          <img
            src={Logo}
            alt="Logo"
            className={`${expanded ? "w-20 h-20" : "w-12 h-12"} object-contain transition-all duration-300`}
          />
        </div>
        {/* Show username only when expanded */}
        {expanded && (
          <div className="hidden group-hover:block md:block">
            <div className="font-semibold text-gray-400">{user?.name}</div>
          </div>
        )}
      </div>
  {/* Menu Sections */}
  <nav className="flex-1">
        {menu.map((section) => (
          <div key={section.section} className="mb-6">
            {expanded && (
              <div className="text-xs text-gray-400/60 font-bold mb-2 tracking-wide hidden group-hover:block md:block">{section.section}</div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = location.pathname === item.link;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className={`group flex items-center gap-1 rounded-lg px-1 py-1 mb-0.5 shadow border-none transition-all duration-300 cursor-pointer w-full ${
                        isActive
                          ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-black shadow-lg border-yellow-400 border-2"
                          : "hover:bg-[#181a20] text-gray-400"
                      }`}
                      style={isActive ? {
                        background: 'linear-gradient(90deg, #bfa33389 0%, #ffd9001c 60%, #23272f 100%)',
                        color: '#23272f',
                        boxShadow: '0 2px 12px 0 rgba(191,162,51,0.25)',
                        border: '2px solid #ffd90018',
                        fontWeight: 'bold',
                        textShadow: '0 0 8px #ffd90029, 0 0 2px #bfa233',
                      } : {}}
                      tabIndex={0}
                    >
                      <span className="flex justify-center items-center w-8 h-8">
                        {React.cloneElement(item.icon, { size: 20, color: isActive ? '#bfa233' : undefined })}
                      </span>
                      <span className={`ml-1 font-semibold text-gray-400 transition-all duration-300 text-sm ${expanded ? "block" : "hidden"}`}>{item.name}</span>
                      <span className="ml-auto text-xs text-gray-400/60 hidden group-hover:inline md:inline">{["Home","Dashboard"].includes(item.name) ? null : ""}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
