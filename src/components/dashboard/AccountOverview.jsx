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
    <section className="bg-black text-white min-h-screen py-10 px-4 sm:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-10 w-full max-w-[95%] mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400">Account Overview</h2>
        <span className="px-4 py-1 border border-yellow-500 text-yellow-400 rounded-full text-sm">
          Active
        </span>
      </div>

      {/* Stats Grid */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-[95%] mx-auto
                   justify-center items-stretch"
      >
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-[#0c0c0c] border border-yellow-500/30 rounded-2xl p-6 text-center 
                       shadow-[0_0_12px_rgba(255,215,0,0.2)] hover:shadow-[0_0_25px_rgba(255,215,0,0.35)]
                       transition-all duration-300 flex flex-col justify-center items-center"
          >
            <span className="text-xs text-gray-400 mb-2">{item.label}</span>
            <span className="text-sm sm:text-base font-semibold text-yellow-400">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
