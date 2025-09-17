
import React, { useState, useEffect } from "react";
import { Home, Grid, Mail, Monitor, PieChart, Table, Layout, Boxes, Map, LogOut, User, DollarSign, CreditCard, Info, Sliders, Bell, FileText, Users, UserCheck } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";


const menu = [
  {
    section: "ACCOUNT",
    items: [
      { name: "My Account", icon: <User size={20} /> },
      { name: "Deposit", icon: <DollarSign size={20} /> },
      { name: "Withdrawal", icon: <CreditCard size={20} /> },
      { name: "Personal Data", icon: <Info size={20} /> },
      { name: "Account Status", icon: <Sliders size={20} /> },
      { name: "Promo/Offers", icon: <Bell size={20} /> },
      { name: "Documents", icon: <FileText size={20} /> },
      { name: "Pamm", icon: <PieChart size={20} /> },
      { name: "Copy Trading", icon: <Users size={20} /> },
      { name: "Trading", icon: <Table size={20} />, link: "/trading" },
      { name: "Partner Area", icon: <UserCheck size={20} /> },
      { name: "Sign Out", icon: <LogOut size={20} /> },
    ],
  },
];

const Sidebar = () => {
  const [ user, setUser ] = useState(null);
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
      className="fixed left-0 top-0 h-screen bg-gradient-to-b from-black via-[#181a20] to-[#23272f] text-[#bfa233] flex flex-col shadow-xl transition-all duration-300
        w-16 hover:w-64 md:w-64 md:hover:w-64 z-50 group"
    >
      {/* User Profile Card */}
      <div
        className="flex items-center gap-3 bg-[#181a20] rounded-xl p-4 mb-6 shadow border border-[#23272f] transition-all duration-300
          opacity-0 group-hover:opacity-100 group-hover:flex
          md:opacity-100 md:flex"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#23272f] to-[#181a20] flex items-center justify-center">
          <span className="text-[#bfa233] font-bold text-lg">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name || "User"}&background=222&color=bfa233`}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </span>
        </div>
        <div className="hidden group-hover:block md:block">
          <div className="font-semibold text-[#bfa233]">{user?.name}</div>
        </div>
      </div>
  {/* Menu Sections */}
  <nav className="flex-1">
        {menu.map((section) => (
          <div key={section.section} className="mb-6">
            <div className="text-xs text-[#bfa233]/60 font-bold mb-2 tracking-wide hidden group-hover:block md:block">{section.section}</div>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.name}>
                  {item.name === "Trading" ? (
                    <Link
                      to="/trading"
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-left ${
                        active === item.name
                          ? "bg-gradient-to-r from-[#bfa233] to-[#23272f] text-black shadow"
                          : "hover:bg-[#181a20] text-[#bfa233]"
                      }`}
                    >
                      {item.icon}
                      <span className="hidden group-hover:inline md:inline">{item.name}</span>
                      <span className="ml-auto text-xs text-[#bfa233]/60 hidden group-hover:inline md:inline">{["Home","Dashboard"].includes(item.name) ? null : ">"}</span>
                    </Link>
                  ) : (
                    <button
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-left ${
                        active === item.name
                          ? "bg-gradient-to-r from-[#bfa233] to-[#23272f] text-black shadow"
                          : "hover:bg-[#181a20] text-[#bfa233]"
                      }`}
                    >
                      {item.icon}
                      <span className="hidden group-hover:inline md:inline">{item.name}</span>
                      <span className="ml-auto text-xs text-[#bfa233]/60 hidden group-hover:inline md:inline">{["Home","Dashboard"].includes(item.name) ? null : ">"}</span>
                    </button>
                  )}
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
