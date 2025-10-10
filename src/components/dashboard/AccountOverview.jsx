import React from "react";

export default function AccountOverview() {
  const stats = [
    { label: "Platform", value: "MT5" },
    { label: "Account #", value: "123456" },
    { label: "Nickname", value: "account" },
    { label: "Balance", value: "$500.00 USD" },
    { label: "Free Balance", value: "$0.00 USD" },
    { label: "Equity", value: "$0.00 USD" },
    { label: "Open P/L", value: "$0.00 USD" },
    { label: "Net Credit", value: "$0.00 USD" },
  ];

  return (
    <section className="bg-black text-white min-h-screen py-10 px-6 sm:px-9">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="w-[1000px] sm:w-[90%] mx-auto border border-white/10 rounded-2xl px-9 sm:p-10 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">Account Overview</h2>
            <span className="px-4 py-1 border border-yellow-500 text-yellow-400 rounded-full text-sm">
              Active
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full justify-center items-stretch">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-[#0c0c0c] border border-yellow-500/30 rounded-2xl p-5 text-center shadow-[0_0_12px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] transition-all duration-300 flex flex-col justify-center items-center"
              >
                <span className="text-xs text-gray-400 mb-1">{item.label}</span>
                <span className="text-sm sm:text-base font-semibold text-yellow-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="max-w-sm mx-auto bg-[#0a0a0a] p-6 rounded-3xl shadow-lg border border-white/10">
          {/* Top Portfolio Card */}
          <div className="bg-gradient-to-br from-[#0e1a3a] to-[#0c162c] p-6 rounded-3xl mb-6 text-center shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <p className="text-gray-300 text-sm mb-2">Your Balance</p>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">$500.00</h1>
            <p className="text-green-400 text-xs">+2.5% this month</p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#111] p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Free Balance</p>
              <p className="text-base font-semibold text-yellow-400">$0.00</p>
            </div>
            <div className="bg-[#111] p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Equity</p>
              <p className="text-base font-semibold text-yellow-400">$0.00</p>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">Portfolio</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#111] p-4 rounded-2xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">AAPL</p>
                  <p className="text-xs text-gray-400">Apple Inc.</p>
                </div>
                <p className="text-green-400 text-sm font-semibold">+2.5%</p>
              </div>
              <div className="flex justify-between items-center bg-[#111] p-4 rounded-2xl border border-white/10">
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
            <div className="flex justify-between items-center bg-[#111] p-4 rounded-2xl border border-white/10">
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
