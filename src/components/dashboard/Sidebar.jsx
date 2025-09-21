import React, { useState, useEffect } from "react";
import { Home, Grid, Mail, Monitor, PieChart, Table, Layout, Boxes, Map, LogOut, User, DollarSign, CreditCard, Info, Sliders, Bell, FileText, Users, UserCheck } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";


const menu = [
  {
    section: "ACCOUNT",
    items: [
  { name: "My Account", icon: <User size={20} />, link: "/my-account" },
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
  const [expanded, setExpanded] = useState(false);
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

  const active = "Dashboard";
  return (
    <aside
      tabIndex={0}
        className={`fixed left-6 p-4  top-9 h-screen/2 rounded-lg bg-gradient-to-t from-black via-[#181a20] to-[#23272f] text-white flex flex-col shadow-xl transition-all duration-300 z-10 md:block hidden
          ${expanded ? "w-56" : "w-[65px]"} hidden md:flex focus:outline-none`}
      onClick={() => setExpanded((prev) => !prev)}
      onFocus={() => setExpanded(true)}
      onBlur={() => setExpanded(false)}
  style={{ overflowY: "hidden", overflowX: "hidden" }}
    >
      {/* User Profile Card */}
      <div
        className={`flex items-center gap-3 bg-[#181a20] rounded-lg ${expanded ? 'p-4' : 'p-1'} mb-6 shadow border border-[#23272f] transition-all duration-300`}
      >
  <div className="w-12 h-12 rounded-full flex items-center justify-center">
          {/* Show logo when collapsed, full avatar when expanded */}
          {expanded ? (
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=222&color=bfa233`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <img
              src={Logo}
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
          )}
        </div>
        {/* Show username only when expanded */}
        {expanded && (
          <div className="hidden group-hover:block md:block">
            <div className="font-semibold text-white">{user?.name}</div>
          </div>
        )}
      </div>
  {/* Menu Sections */}
  <nav className="flex-1">
        {menu.map((section) => (
          <div key={section.section} className="mb-6">
            {expanded && (
              <div className="text-xs text-white/60 font-bold mb-2 tracking-wide hidden group-hover:block md:block">{section.section}</div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.link}
                    className={`group flex items-center gap-1 rounded-lg px-1 py-1 mb-0.5 shadow border-none transition-all duration-300 cursor-pointer w-full ${
                      active === item.name
                        ? "bg-gradient-to-r from-[#bfa233] to-[#23272f] text-black shadow"
                        : "hover:bg-[#181a20] text-white"
                    }`}
                    tabIndex={0}
                  >
                    <span className="flex justify-center items-center w-8 h-8">
                      {React.cloneElement(item.icon, { size: 20 })}
                    </span>
                    <span className={`ml-1 font-semibold text-white transition-all duration-300 text-sm ${expanded ? "block" : "hidden"}`}>{item.name}</span>
                    <span className="ml-auto text-xs text-white/60 hidden group-hover:inline md:inline">{["Home","Dashboard"].includes(item.name) ? null : ""}</span>
                    <style>{`
                      .group:hover {
                        background: radial-gradient(circle at center, rgba(255,255,255,0.12) 60%, rgba(180,180,180,0.18) 100%);
                        box-shadow: 0 2px 8px 0 rgba(180,180,180,0.08);
                        backdrop-filter: blur(4px);
                      }
                    `}</style>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
