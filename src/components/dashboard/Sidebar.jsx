import React, { useState, useEffect } from "react";
import {
  LayoutDashboardIcon,
  DollarSign,
  CreditCard,
  Info,
  Sliders,
  Bell,
  FileText,
  Table,
  UserCheck,
  LogOut,
  User,
  ChevronLeft,
  Copy,
  Check,
} from "lucide-react";
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
      { name: "Trade with Bot", icon: <Table size={20} />, link: "/trading" },
      { name: "Partner Area", icon: <UserCheck size={20} />, link: "/partner-area" },
      { name: "Sign Out", icon: <LogOut size={20} />, link: "/logout" },
    ],
  },
];

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        console.log("Decoded JWT:", decoded); // ✅ helpful for debugging
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <>
      {/* 🟡 Hamburger (mobile only) */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed top-4 right-4 z-[9999] md:hidden flex flex-col justify-center items-center focus:outline-none"
      >
        <span
          className={`block w-7 h-1 rounded bg-white transition-all duration-300 ${
            mobileOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 rounded bg-white my-1 transition-all duration-300 ${
            mobileOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-7 h-1 rounded bg-white transition-all duration-300 ${
            mobileOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>

      {/* 🟡 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gradient-to-t from-[#111216] via-[#181a20] to-[#181a1f]
          border-r border-[#23272f] flex flex-col shadow-xl transition-all duration-300 z-[9998]
          ${expanded ? "w-56" : "w-[70px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
        style={{ overflowY: "hidden" }}
      >
        {/* 🟡 Logo + User Info */}
        <div className={`flex items-center gap-3 ${expanded ? "py-6" : "py-4"} mb-6 px-4`}>
          <img
            src={Logo}
            alt="Logo"
            className={`${expanded ? "w-20 h-20" : "w-12 h-12"} object-contain transition-all duration-300`}
          />
          {expanded && (
            <div className="md:block">
              <div className="font-semibold text-gray-400 text-sm">
                {user?.name || "User"}
              </div>

              {/* 🆔 Display User ID with Copy Icon */}
              {user?.user_id && (
                <div className="flex items-center gap-1 text-white text-xs font-bold tracking-wide mt-1">
                  <span>ID: {user.user_id}</span>
                  <button
                    onClick={() => handleCopy(user.user_id)}
                    className="p-1 rounded hover:bg-[#2a2f38] transition-all duration-300"
                  >
                    {copied ? (
                      <Check size={14} className="text-green-400" />
                    ) : (
                      <Copy size={14} className="text-gray-400 hover:text-yellow-400" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🟡 Menu */}
        <nav className="flex-1 px-2 overflow-y-auto">
          {menu.map((section) => (
            <div key={section.section} className="mb-6">
              {expanded && (
                <div className="text-xs text-gray-400/60 font-bold mb-2 tracking-wide">
                  {section.section}
                </div>
              )}
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.link;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.link}
                        className={`group flex items-center gap-1 rounded-lg px-1 py-1 mb-0.5 transition-all duration-300 cursor-pointer w-full ${
                          isActive
                            ? "bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 text-black shadow-lg border-yellow-400 border-2"
                            : "hover:bg-[#181a20] text-gray-400"
                        }`}
                        style={
                          isActive
                            ? {
                                background:
                                  "linear-gradient(90deg, #bfa33389 0%, #ffd9001c 60%, #23272f 100%)",
                                color: "#23272f",
                                boxShadow: "0 2px 12px 0 rgba(191,162,51,0.25)",
                                border: "2px solid #ffd90018",
                                fontWeight: "bold",
                                textShadow: "0 0 8px #ffd90029, 0 0 2px #bfa233",
                              }
                            : {}
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex justify-center items-center w-8 h-8">
                          {React.cloneElement(item.icon, {
                            size: 20,
                            color: isActive ? "#bfa233" : undefined,
                          })}
                        </span>
                        <span
                          className={`ml-1 font-semibold text-gray-400 transition-all duration-300 text-sm ${
                            expanded ? "block" : "hidden"
                          }`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* 🟡 Collapse Button */}
        <div className="flex justify-center items-center py-4 border-t border-[#23272f]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#23272f] hover:bg-[#2e323a] transition-all duration-300"
          >
            <ChevronLeft
              size={20}
              className={`text-gray-300 transition-transform duration-300 ${
                !expanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
