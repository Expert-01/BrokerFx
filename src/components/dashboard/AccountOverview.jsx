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
    <section className="bg-black text-white min-h-screen py-10 px-4 sm:px-6">
      {/* Outer Container */}
      <div className="max-w-5xl mx-auto border border-white/10 rounded-2xl px-6 sm:px-10 py-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.05)]">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-10">
          <h2 className="text-3xl font-bold text-yellow-400 text-center sm:text-left">
            Account Overview
          </h2>
          <span className="px-4 py-1 border border-yellow-500 text-yellow-400 rounded-full text-sm">
            Active
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-[#0c0c0c] border border-yellow-500/30 rounded-2xl p-4 sm:p-5 text-center 
                         shadow-[0_0_12px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)] 
                         transition-all duration-300 flex flex-col justify-center items-center"
            >
              <span className="text-[0.7rem] sm:text-xs text-gray-400 mb-1">
                {item.label}
              </span>
              <span className="text-sm sm:text-base font-semibold text-yellow-400">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
