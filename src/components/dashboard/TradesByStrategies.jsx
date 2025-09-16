import React from "react";

const TradesByStrategies = ({ data = [4,2,6,1,3] }) => (
  <div className="bg-gradient-to-b from-black via-[#181a20] to-[#23272f] rounded-2xl shadow-xl p-6 mb-6 w-full max-w-md mx-auto">
    <div className="flex justify-between items-center mb-2">
      <span className="text-white font-bold text-lg">Trades By Strategies</span>
      <button className="border border-yellow-400 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">Show</button>
    </div>
    {/* Replace with chart library for real data */}
    <div className="h-40 flex items-end gap-3">
      {data.map((val, i) => (
        <div key={i} className="bg-yellow-400 w-8" style={{height: `${val*20}px`}}></div>
      ))}
    </div>
  </div>
);

export default TradesByStrategies;
