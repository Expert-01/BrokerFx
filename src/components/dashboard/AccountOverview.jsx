import React, { useState, useEffect } from "react";
import { fetchUserBalance } from "../../api/user";

export default function AccountOverview({ userId }) {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Platform", value: "MT5" },
    { label: "Account #", value: "123456" },
    { label: "Nickname", value: "account" },
    { label: "Balance", value: balance !== null ? `$${Number(balance).toFixed(2)} USD` : "Loading..." },
    { label: "Free Balance", value: "$0.00 USD" },
    { label: "Equity", value: "$0.00 USD" },
    { label: "Open P/L", value: "$0.00 USD" },
    { label: "Net Credit", value: "$0.00 USD" },
  ];

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchUserBalance(userId)
      .then((data) => setBalance(data.balance))
      .catch((err) => console.error("[AccountOverview] Error fetching balance:", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <section className="bg-black text-white min-h-screen py-10 px-6 sm:px-9">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="w-[1000px] sm:w-[90%] mx-auto border border-[#bfa23320] rounded-2xl px-12 py-12 backdrop-blur-lg bg-[#1b1410cc] shadow-[0_0_10px_rgba(191,162,51,0.08)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-[#bfa233]">Account Overview</h2>
            <span className="px-4 py-1 border border-[#bfa233] text-[#bfa233] rounded-full text-sm">
              Active
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-[#0f0a07] border border-[#bfa23330] rounded-2xl p-6 text-center
                           shadow-[0_0_10px_rgba(191,162,51,0.05)] hover:shadow-[0_0_20px_rgba(191,162,51,0.15)]
                           transition-all duration-300"
              >
                <span className="text-xs text-gray-400 mb-1 block">{item.label}</span>
                <span className="text-base font-semibold text-[#bfa233]">
                  {loading && item.label === "Balance" ? "Loading..." : item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="max-w-sm mx-auto bg-[#1a120d] p-7 rounded-3xl shadow-md border border-[#bfa23320]">
          {/* Top Portfolio Card */}
          <div className="bg-gradient-to-br from-[#3a2a1a] to-[#1e1309] p-7 rounded-3xl mb-6 text-center shadow-[0_0_15px_rgba(191,162,51,0.1)] backdrop-blur-md">
            <p className="text-gray-300 text-sm mb-2">Your Balance</p>
            <h1 className="text-4xl font-bold text-[#bfa233] mb-2">
              {loading ? "Loading..." : balance !== null ? `$${Number(balance).toFixed(2)}` : "-"}
            </h1>
            <p className="text-green-400 text-xs">+2.5% this month</p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#0f0a07] p-5 rounded-2xl border border-[#bfa23320]">
              <p className="text-xs text-gray-400 mb-1">Free Balance</p>
              <p className="text-base font-semibold text-[#bfa233]">$0.00</p>
            </div>
            <div className="bg-[#0f0a07] p-5 rounded-2xl border border-[#bfa23320]">
              <p className="text-xs text-gray-400 mb-1">Equity</p>
              <p className="text-base font-semibold text-[#bfa233]">$0.00</p>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">Portfolio</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#0f0a07] p-5 rounded-2xl border border-[#bfa23320]">
                <div>
                  <p className="text-sm font-semibold text-white">AAPL</p>
                  <p className="text-xs text-gray-400">Apple Inc.</p>
                </div>
                <p className="text-green-400 text-sm font-semibold">+2.5%</p>
              </div>
              <div className="flex justify-between items-center bg-[#0f0a07] p-5 rounded-2xl border border-[#bfa23320]">
                <div>
                  <p className="text-sm font-semibold text-white">POWA</p>
                  <p className="text-xs text-gray-400">Chrome Stock</p>
                </div>
                <p className="text-green-400 text-sm font-semibold">+1.2%</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-sm text-gray-400 mb-3">Recent Transaction</h3>
            <div className="flex justify-between items-center bg-[#0f0a07] p-5 rounded-2xl border border-[#bfa23320]">
              <div>
                <p className="text-sm font-semibold text-white">Manulife Cash Fund</p>
                <p className="text-xs text-gray-400">Mutual Funds</p>
              </div>
              <p className="text-green-400 text-sm font-semibold">+2.5%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
