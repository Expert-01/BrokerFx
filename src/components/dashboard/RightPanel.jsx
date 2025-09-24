import React, { useState } from "react";

export default function RightPanel() {
  const [tab, setTab] = useState("Buy");
  const [animating, setAnimating] = useState(false);

  const handleTabChange = (newTab) => {
    if (tab === newTab) return;
    setAnimating(true);
    setTimeout(() => {
      setTab(newTab);
      setAnimating(false);
    }, 180); // match transition duration
  };

  return (
    <aside className="h-full border-l border-[#23272f] bg-[#111216] p-6 flex flex-col gap-6 min-w-[320px]">
      {/* Trading Tabs */}
      <div className="flex gap-2 mb-4">
        {['Buy', 'Sell', 'Transfer'].map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-lg font-semibold focus:outline-none transition-all duration-200 ${
              tab === t
                ? 'bg-[#181a20] text-white'
                : 'bg-transparent text-gray-400 hover:bg-[#181a20]'
            }`}
            onClick={() => handleTabChange(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {/* Trading Card with Animation */}
      <div
        className={`bg-[#181a20] rounded-xl p-6 flex flex-col gap-3 transition-all duration-200 ease-in-out transform ${
          animating ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
        key={tab}
      >
        {/* Asset Selector */}
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#181a20] border border-[#181a20] rounded-full px-3 py-1 flex items-center gap-2">
            <span className="text-white font-semibold">BTC</span>
            <span className="text-gray-400 text-xs">(BTC)</span>
          </div>
        </div>
        {/* Price and percent */}
        <div className="flex items-center gap-2">
          <span className="text-white text-2xl font-bold">$67,231.23</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gray-400 text-xs">CA276*</span>
          <span className="text-[#14e3c7] text-sm font-semibold">+2.45%</span>
        </div>
        {/* Trading Form */}
        <form className="flex flex-col gap-3 mt-2">
          <label className="text-gray-400 text-sm font-medium">Amount</label>
          <input type="number" className="bg-[#23272f] rounded-lg px-4 py-2 text-white placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#14e3c7]/30" placeholder="Enter amount" />
          <label className="text-gray-400 text-sm font-medium">Price</label>
          <input type="number" className="bg-[#23272f] rounded-lg px-4 py-2 text-white placeholder-gray-500 border-none outline-none focus:ring-2 focus:ring-[#14e3c7]/30" placeholder="Enter price" />
          <label className="text-gray-400 text-sm font-medium">Order Type</label>
          <div className="bg-[#23272f] rounded-lg px-4 py-2 text-white font-semibold">Limit</div>
          <button type="submit" className="w-full mt-2 bg-[#23272f] text-white font-bold py-2 rounded-lg hover:bg-[#222] transition">{tab}</button>
        </form>
      </div>
      {/* Recent Activity (optional, not shown in screenshot) */}
    </aside>
  );
}
