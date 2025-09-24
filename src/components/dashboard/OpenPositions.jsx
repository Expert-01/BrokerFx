import React from "react";

const OpenPositions = ({ positions }) => {
  if (!positions || positions.length === 0) {
    return (
      <div className="bg-[#23272f] border border-yellow-400 rounded-2xl p-6 shadow-xl mb-8 text-center text-yellow-400">
        No open positions
      </div>
    );
  }
  return (
    <div className="border border-[#181a20]  rounded-2xl p-6 shadow-xl mb-8 overflow-x-auto">
      <h3 className="text-yellow-400 font-bold text-lg mb-4">Open Positions</h3>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-yellow-400">
            <th>Symbol</th>
            <th>Side</th>
            <th>Amount</th>
            <th>Take Profit</th>
            <th>Stop Loss</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos, i) => (
            <tr key={i} className="text-white">
              <td>{pos.symbol}</td>
              <td className={pos.side === "buy" ? "text-green-400" : "text-red-400"}>{pos.side.toUpperCase()}</td>
              <td>{pos.amount}</td>
              <td>{pos.takeProfit || <span className="text-gray-400">-</span>}</td>
              <td>{pos.stopLoss || <span className="text-gray-400">-</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OpenPositions;
