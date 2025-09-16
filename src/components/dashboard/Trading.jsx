
import React, { useState } from "react";
import OpenPositions from "./OpenPositions";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
// This is a simple trading form for buying/selling digital commodities (investments)
const Trading = () => {
  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("buy");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [message, setMessage] = useState("");
  const [positions, setPositions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      // Simulate API call and add to open positions
      setPositions(prev => [
        ...prev,
        {
          symbol: symbol.toUpperCase(),
          amount,
          side,
          takeProfit,
          stopLoss
        }
      ]);
      setMessage(`Order placed: ${side.toUpperCase()} ${amount} of ${symbol} (TP: ${takeProfit || 'none'}, SL: ${stopLoss || 'none'})`);
      setSymbol("");
      setAmount("");
      setTakeProfit("");
      setStopLoss("");
    } catch (err) {
      setMessage("Failed to place order.");
    }
  };

  return (
    <div className="flex min-h-screen bg-black w-full">
      <aside className="z-50">
        <Sidebar />
      </aside>
      <main className="flex-1 py-1 px-1 mx-64">
  <TradingViewWidget symbol={symbol ? symbol.toUpperCase() + 'USD' : 'BTCUSD'} />
  <OpenPositions positions={positions} />
        <div className="bg-[#23272f] border border-yellow-400 rounded-2xl p-6 shadow-xl mb-8 max-w-2xl mx-auto">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Trade Digital Commodities</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Symbol</label>
              <input
                type="text"
                className="w-full rounded px-3 py-2 bg-black text-white border border-yellow-400 focus:outline-none"
                placeholder="e.g. BTC, ETH, GOLD"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Amount</label>
              <input
                type="number"
                className="w-full rounded px-3 py-2 bg-black text-white border border-yellow-400 focus:outline-none"
                placeholder="Amount"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
                min="0.0001"
                step="any"
              />
            </div>
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Take Profit (optional)</label>
              <input
                type="number"
                className="w-full rounded px-3 py-2 bg-black text-white border border-yellow-400 focus:outline-none"
                placeholder="e.g. 50000"
                value={takeProfit}
                onChange={e => setTakeProfit(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Stop Loss (optional)</label>
              <input
                type="number"
                className="w-full rounded px-3 py-2 bg-black text-white border border-yellow-400 focus:outline-none"
                placeholder="e.g. 20000"
                value={stopLoss}
                onChange={e => setStopLoss(e.target.value)}
                min="0"
                step="any"
              />
            </div>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-400"
                  value="buy"
                  checked={side === "buy"}
                  onChange={() => setSide("buy")}
                />
                <span className="ml-2 text-yellow-400">Buy</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-yellow-400"
                  value="sell"
                  checked={side === "sell"}
                  onChange={() => setSide("sell")}
                />
                <span className="ml-2 text-yellow-400">Sell</span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
            >
              {side === "buy" ? "Buy" : "Sell"}
            </button>
            {message && <div className="mt-2 text-center text-yellow-400">{message}</div>}
          </form>
          {/* TODO: Add take profit / stop loss UI here */}
        </div>
      </main>
    </div>
  );
}

export default Trading;