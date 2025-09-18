import React from "react";

const AccountOverview = () => (
  <section className="border border-[#181a20] text-white p-8 rounded-2xl shadow-2xl mb-8 w-full max-w-4xl mx-auto ">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-yellow-400 tracking-wide">
        Account Overview
      </h2>
      <span className="bg-transparent border border-yellow-400 text-yellow-400 px-4 py-1 rounded-full text-xs font-semibold">
        Active
      </span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
        <span className="text-xs text-gray-400 mb-1 ">Platform</span>
        <span className="text-lg font-bold text-yellow-400">
          MetaTrader 5
        </span>
      </div>
      <div className="flex flex-col items-center bg-black border border-[#181a20] fmrounded-xl p-4 shadow-lg">
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
      <button className="bg-yellow-400 border border-[#181a20]  text-black px-6 py-2 rounded-lg fancy-btn font-semibold shadow hover:bg-yellow-500 transition">
        Deposit
      </button>
      <button className="bg-[#181a20] text-yellow-400 px-6 py-2 rounded-lg font-semibold shadow border border-yellow-400 hover:bg-yellow-400 hover:text-black transition">
        Log In
      </button>
      <button className="bg-[#181a20] text-yellow-400 px-6 py-2 rounded-lg font-semibold shadow border border-yellow-400 hover:bg-yellow-400 hover:text-black transition">
        Add Demo Account
      </button>
    </div>
  </section>
);

export default AccountOverview;
