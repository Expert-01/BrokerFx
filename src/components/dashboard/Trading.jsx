import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // make sure it's like: https://brokerx-backend-pcgs.onrender.com

const Trading = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [linking, setLinking] = useState(false);
  const [message, setMessage] = useState("");
  const [trades, setTrades] = useState([]);
  const [simulateLoading, setSimulateLoading] = useState(false);
  const [priceHistory, setPriceHistory] = useState({
    bitcoin: [],
    ethereum: [],
    "binance-coin": [],
    ripple: [],
  });
  const [highlightedTrade, setHighlightedTrade] = useState(null);
  const [heartbeat, setHeartbeat] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // --- Fetch bot status ---
  const fetchBotStatus = async () => {
    if (!userId) return console.warn("No userId available");
    try {
      const res = await axios.get(`${API_URL}/trading-bot/status/${userId}`);
      setBotStatus(res.data);
      if (res.data.simulated_trades) setTrades(res.data.simulated_trades);
    } catch (err) {
      console.error("Error fetching bot status:", err);
    }
  };

  // --- Link Bot ---
  const linkBot = async () => {
    if (!userId) return setMessage("❌ No userId found.");
    setLinking(true);
    setMessage("⏳ Linking bot...");
    try {
      const res = await axios.post(`${API_URL}/trading-bot/link`, { userId });
      if (res.status === 200 || res.data?.success) {
        setMessage("✅ Bot linked and active!");
        setBotStatus(res.data.bot_status || { bot_status: "running" });
        if (res.data.simulated_trades) setTrades(res.data.simulated_trades);
      } else setMessage(`⚠️ Unexpected response: ${JSON.stringify(res.data)}`);
    } catch (err) {
      console.error("Link bot error:", err);
      setMessage("❌ Failed to link bot.");
    } finally {
      setLinking(false);
    }
  };

  // --- Unlink Bot ---
  const unlinkBot = async () => {
    if (!userId) return setMessage("❌ No userId found.");
    setLoading(true);
    setMessage("⏳ Disconnecting bot...");
    try {
      const res = await axios.post(`${API_URL}/trading-bot/unlink`, { userId });
      if (res.status === 200 || res.data?.success) {
        setMessage("🔌 Bot disconnected!");
        setBotStatus({ bot_status: "inactive" });
      } else setMessage(`⚠️ Unexpected response: ${JSON.stringify(res.data)}`);
    } catch (err) {
      console.error("Unlink bot error:", err);
      setMessage("❌ Failed to unlink bot.");
    } finally {
      setLoading(false);
    }
  };

  // --- Fetch live price ---
  const fetchLivePrice = async (coin) => {
    try {
      const res = await axios.get(`https://api.coinstats.app/public/v1/coins/${coin}?currency=USD`);
      return res.data.coin.price;
    } catch (err) {
      console.error("Error fetching live price:", err);
      return null;
    }
  };

  // --- Update price history ---
  const updatePriceHistory = async () => {
    const assets = ["bitcoin", "ethereum", "binance-coin", "ripple"];
    for (let asset of assets) {
      const price = await fetchLivePrice(asset);
      if (!price) continue;
      setPriceHistory((prev) => {
        const history = [...(prev[asset] || []), price];
        if (history.length > 12) history.shift();
        return { ...prev, [asset]: history };
      });
    }
  };

  // --- Simulate trade ---
  const simulateTrade = async () => {
    if (!userId || botStatus?.bot_status !== "running") return;
    setSimulateLoading(true);
    try {
      const assets = ["bitcoin", "ethereum", "binance-coin", "ripple"];
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const action = Math.random() < 0.5 ? "buy" : "sell";
      const amount = (Math.random() * 0.05 + 0.01).toFixed(4);

      const history = priceHistory[asset] || [];
      if (history.length < 2) return;

      const lastPrice = history[history.length - 1];
      const prevPrice = history[history.length - 2];
      const priceChange = lastPrice - prevPrice;
      const profitLoss = action === "buy" ? priceChange * amount : -priceChange * amount;

      const newTrade = { asset, action, amount, price: lastPrice, profitLoss, time: new Date().toLocaleTimeString() };
      setHighlightedTrade(newTrade.time);
      setTrades((prev) => [newTrade, ...prev]);
      await axios.post(`${API_URL}/trading-bot/simulate/${userId}`, newTrade);
      setTimeout(() => setHighlightedTrade(null), 2000);
    } catch (err) {
      console.error("Error simulating trade:", err);
    } finally {
      setSimulateLoading(false);
    }
  };

  // --- Interval & heartbeat ---
  useEffect(() => {
    if (!userId) return;
    fetchBotStatus();
    const interval = setInterval(async () => {
      setHeartbeat((prev) => !prev);
      await fetchBotStatus();
      await updatePriceHistory();
      await simulateTrade();
    }, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-[#0a0908] text-[#f5e6ca]">
      <aside className="hidden md:block z-50 right-9"><Sidebar /></aside>
      <main className="flex-1 p-4 md:p-8 w-full md:ml-64 space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-yellow-600/20">
          <TradingViewWidget symbol="BTCUSDT" />
        </div>

        <div className="bg-gradient-to-b from-[#1a1307]/90 to-[#0d0b08]/80 backdrop-blur-xl rounded-2xl p-5 shadow-[0_0_20px_rgba(139,69,19,0.3)] max-w-2xl mx-auto border border-yellow-700/20 text-center text-sm relative">
          <h2 className="text-yellow-500 font-bold text-xl mb-2 tracking-wide flex items-center justify-center gap-2">
            🤖 NexaBot — Trading Calibration
            <span className={`w-3 h-3 rounded-full inline-block ${botStatus?.bot_status === "running" ? "bg-green-400 animate-pulse" : botStatus?.bot_status === "inactive" ? "bg-red-400 animate-pulse" : "bg-yellow-400 animate-pulse"}`}></span>
          </h2>

          <p className="text-yellow-200 mb-3 text-xs md:text-sm">Automated trading based on live market data.</p>
          {message && <div className={`mb-2 ${message.includes("✅") ? "text-green-400" : message.includes("❌") ? "text-red-400" : "text-yellow-300"}`}>{message}</div>}

          <div className="text-xs text-yellow-400 mb-2">
            Interval heartbeat: <span className={`inline-block w-2 h-2 rounded-full ${heartbeat ? "bg-yellow-400" : "bg-yellow-700"}`}></span>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-2 mt-2">
            <button onClick={linkBot} disabled={linking || botStatus?.bot_status === "running"} className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black font-bold py-1.5 px-4 rounded-lg hover:brightness-110 transition text-xs">
              {linking ? "Connecting..." : botStatus?.bot_status === "running" ? "Bot Linked" : "Link Bot"}
            </button>
            {botStatus?.bot_status === "running" && (
              <button onClick={unlinkBot} disabled={loading} className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-1.5 px-4 rounded-lg hover:brightness-110 transition text-xs">
                {loading ? "Processing..." : "Unlink Bot"}
              </button>
            )}
          </div>

          {/* Bot stats */}
          {botStatus && (
            <div className="grid grid-cols-3 gap-2 text-yellow-400 mt-3 text-xs">
              <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
                <p className="font-semibold">Profit</p>
                <p className="text-green-400 font-bold">${Number(botStatus.total_profit || 0).toFixed(2)}</p>
              </div>
              <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
                <p className="font-semibold">Trades</p>
                <p className="text-yellow-300 font-bold">{botStatus.total_trades || 0}</p>
              </div>
              <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
                <p className="font-semibold">Success Rate</p>
                <p className="text-green-300 font-bold">{botStatus.total_trades > 0 ? ((botStatus.successful_trades / botStatus.total_trades) * 100).toFixed(1) : 0}%</p>
              </div>
            </div>
          )}
        </div>

        {/* Trades table */}
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden border border-yellow-700/20 bg-[#0d0b08]/90 shadow-[0_0_15px_rgba(255,215,0,0.1)] p-4">
          <h3 className="text-yellow-500 font-bold text-lg mb-2">📊 Trade Log</h3>
          <table className="w-full text-xs md:text-sm text-left text-yellow-200">
            <thead>
              <tr className="border-b border-yellow-600/30">
                <th className="py-1 px-2">Time</th>
                <th className="py-1 px-2">Asset</th>
                <th className="py-1 px-2">Action</th>
                <th className="py-1 px-2">Amount</th>
                <th className="py-1 px-2">Price (USD)</th>
                <th className="py-1 px-2">P/L</th>
              </tr>
            </thead>
            <tbody>
              {trades.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-2 text-yellow-400">No simulated trades yet.</td></tr>
              ) : trades.map((t, idx) => (
                <tr key={idx} className={`border-b border-yellow-600/20 ${highlightedTrade === t.time ? "bg-yellow-600/20 animate-pulse" : ""}`}>
                  <td className="py-1 px-2">{t.time}</td>
                  <td className="py-1 px-2">{t.asset.toUpperCase()}</td>
                  <td className={`py-1 px-2 ${t.action === "buy" ? "text-green-400" : "text-red-400"}`}>{t.action.toUpperCase()}</td>
                  <td className="py-1 px-2">{t.amount}</td>
                  <td className="py-1 px-2">${t.price.toFixed(2)}</td>
                  <td className={`py-1 px-2 ${t.profitLoss >= 0 ? "text-green-400" : "text-red-400"}`}>${t.profitLoss.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Trading;
