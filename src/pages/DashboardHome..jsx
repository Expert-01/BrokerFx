import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import HomePage from "../components/data";
import Deposit from "./Deposit";
const Investment = React.lazy(() => import("./Investment.jsx"));

export default function DashboardHome() {
  const [user, setUser] = useState(null);
  const [investmentBalance, setInvestmentBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Fetch latest user info from backend
        fetch(`http://localhost:5000/api/users/${decoded.id}`)
          .then((res) => res.json())
          .then((data) => setUser(data))
          .catch(() => setUser(decoded));
        // Fetch investments and calculate total
        fetch(`http://localhost:5000/api/investment`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            const total = Array.isArray(data)
              ? data.reduce((sum, inv) => sum + Number(inv.amount), 0)
              : 0;
            setInvestmentBalance(total);
          });
      } catch (err) {
        console.error("Invalid token:", err.message);
      }
    }
  }, []);

  return (
    <main className="min-h-screen flex-1 md:ml-4 px-0 py-6 bg-black text-white overflow-x-hidden">
      {/* User Info Row */}
      <div className="flex items-center gap-4 mb-8">
        <img
          src={`https://ui-avatars.com/api/?name=${
            user?.name || "User"
          }&background=0A0F1F&color=fff`}
          alt="avatar"
          className="w-12 h-12 rounded-full border-2 border-[#222]"
        />
        <div>
          <div className="font-bold">{user?.name}</div>
          <div className="text-xs text-gray-400">
            {user?.email || "user@email.com"}
          </div>
          <div className="text-xs text-gray-400">
            Last login: {user?.lastLogin || "Today"}
          </div>
        </div>
        <span className="">
          <Deposit />
        </span>
      </div>

      {/* Welcome */}
      <h1 className="text-2xl font-semibold mb-6">
        Welcome Back, <span className="text-yellow-400">{user?.name}</span>
      </h1>

      {/* Dashboard Cards (Desktop) */}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        <div className="bg-black p-6 rounded-xl border border-[#222]">
          <h2 className="text-gray-400">Wallet Balance</h2>
          <p className="text-3xl font-bold mt-2">
            ${Number(user?.balance).toFixed(2)}
          </p>
        </div>
        <div className="bg-black p-6 rounded-xl border border-[#222]">
          <h2 className="text-gray-400">Active Investments</h2>
          <p className="text-3xl font-bold mt-2">5 Plans</p>
        </div>
        <div className="bg-black p-6 rounded-xl border border-[#222]">
          <h2 className="text-gray-400">Investment Balance</h2>
          <p className="text-3xl font-bold mt-2 text-green-400">
            ${investmentBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Swipeable Cards (Mobile) */}
      <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4">
        <div className="min-w-[80%] bg-black p-6 rounded-xl border border-[#222] snap-center">
          <h2 className="text-gray-400">Wallet Balance</h2>
          <p className="text-2xl font-semibold mt-2">
            ${Number(user?.balance).toFixed(2)}
          </p>
        </div>
        <div className="min-w-[80%] bg-black p-6 rounded-xl border border-[#222] snap-center">
          <h2 className="text-gray-400">Active Investments</h2>
          <p className="text-2xl font-bold mt-2">5 Plans</p>
        </div>
        <div className="min-w-[80%] bg-black p-6 rounded-xl border border-[#222] snap-center">
          <h2 className="text-gray-400">Investment Balance</h2>
          <p className="text-2xl font-bold mt-2 text-green-400">
            ${investmentBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Extra Components */}
      <HomePage user={user} />
    </main>
  );
}