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

const MobileSidebar = ({ open, onClose }) => {
  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}>
      <div className="absolute inset-0 bg-black/70" onClick={onClose}></div>
      <aside className="absolute left-0 top-0 h-full w-64 bg-gradient-to-t from-[#111216] via-[#181a20] to-[#181a1f] border-r border-[#23272f] flex flex-col shadow-xl p-4">
        <div className="flex items-center gap-3 py-6 mb-6">
          <img src={Logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <nav className="flex-1">
          {menu.map((section) => (
            <div key={section.section} className="mb-6">
              <div className="text-xs text-gray-400/60 font-bold mb-2 tracking-wide">{section.section}</div>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.link}
                      className="group flex items-center gap-1 rounded-lg px-1 py-1 mb-0.5 hover:bg-[#181a20] text-gray-400 transition-all duration-300 cursor-pointer w-full"
                      tabIndex={0}
                      onClick={onClose}
                    >
                      <span className="flex justify-center items-center w-8 h-8">
                        {item.icon}
                      </span>
                      <span className="ml-1 font-semibold text-gray-400 text-sm">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default MobileSidebar;
