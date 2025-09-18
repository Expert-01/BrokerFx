import React from "react";

const AccountOverview = () => (
  <section className="border border-[#181a20] text-white p-8 rounded-2xl shadow-2xl mb-8 w-full max-w-4xl mx-auto ">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-[#d4af37] tracking-wide">
        Account Overview
      </h2>
      <span className="bg-transparent border border-[#d4af37]/30 text-yellow-400 px-4 py-1 rounded-full text-xs font-semibold">
        Active
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1 ">Platform</span>
        <span className="text-lg font-bold text-yellow-400">
          MT5
        </span>
      </div>
      <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Account #</span>
        <span className="text-lg font-bold">123456</span>
      </div>
      <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1 ">Nickname</span>
        <span className="text-lg font-bold">account1</span>
      </div>
      <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Balance</span>
        <span className="text-lg font-bold text-yellow-400">$0.00 USD</span>
      </div>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="flex flex-col items-center bg-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Free Balance</span>
        <span className="text-lg font-bold">$0.00 USD</span>
      </div>
      <div className="flex flex-col items-center bg-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Equity</span>
        <span className="text-lg font-bold">$0.00 USD</span>
      </div>
      <div className="flex flex-col items-center bg-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Open P/L</span>
        <span className="text-lg font-bold">$0.00 USD</span>
      </div>
      <div className="flex flex-col items-center bg-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1">Net Credit</span>
        <span className="text-lg font-bold">$0.00 USD</span>
      </div>
    </div>
    <div className="flex gap-4 justify-end">
      <button className="glass-radial-btn px-6 py-2 rounded-xl font-bold">
        <span className="relative z-10">Deposit</span>
        <span className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></span>
      </button>
      <button className="glass-radial-btn px-6 py-2 rounded-xl font-bold">
        <span className="relative z-10">Log In</span>
        <span className="absolute inset-0 bg-white opacity-10 rounded-full pointer-events-none"></span>
      </button>
      <button className="glass-radial-btn px-6 py-2 rounded-xl font-bold">
        <span className="relative z-10">Add Demo Account</span>
        <span className="absolute inset-0 bg-white opacity-10 rounded-full pointer-events-none"></span>
      </button>
    </div>
  </section>
);

export default AccountOverview;
