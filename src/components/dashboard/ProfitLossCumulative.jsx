import React from "react";

const ProfitLossCumulative = ({ data = [0,20,10,50,30,70,40,60,30,60] }) => {
  // Convert data to SVG points
  const points = data.map((y, i) => `${i * (200/(data.length-1))},${80-y*0.7}`).join(" ");
  return (
    <div className="bg-gradient-to-b from-black via-[#181a20] to-[#23272f] rounded-2xl shadow-xl p-6 mb-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-bold text-lg">Profit/Loss Cumulative</span>
        <button className="border border-yellow-400 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">Change</button>
      </div>
      {/* Replace with chart library for real data */}
      <svg viewBox="0 0 200 80" className="w-full h-32">
        <polyline
          fill="none"
          stroke="#d4af37"
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
};

export default ProfitLossCumulative;
