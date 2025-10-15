import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_API_URL;

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
  const [userId, setUserId] = useState(null);
  const [trend, setTrend] = useState("");
  const [showChart, setShowChart] = useState(false);
  const [lastTrends, setLastTrends] = useState({
    bitcoin: null,
    ethereum: null,
    "binance-coin": null,
    ripple: null,
  });

  // --- Decode user ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setMessage("❌ No token found. Please log in again.");
    try {
      const decoded = jwtDecode(token);
      const id = decoded.id || decoded.userId || decoded.user?.id;
      if (!id) return setMessage("❌ Invalid token: no userId found.");
      setUserId(id);
    } catch (err) {
      console.error("JWT decode error:", err);
      setMessage("❌ Invalid token.");
    }
  }, []);

  // --- Fetch bot status ---
  const fetchBotStatus = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_URL}/trading-bot/status/${userId}`);
      setBotStatus(res.data);
      if (res.data.simulated_trades) setTrades(res.data.simulated_trades);
    } catch (err) {
      console.error("Error fetching bot status:", err);
    }
  };

  // --- Link / Unlink bot ---
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

  // --- Fetch live prices ---
  const fetchLivePrice = async (coin) => {
    try {
      const res = await axios.get(
        `https://api.coinstats.app/public/v1/coins/${coin}?currency=USD`
      );
      return res.data.coin.price;
    } catch (err) {
      console.error("Error fetching live price:", err);
      return null;
    }
  };

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

  // --- Simulate trade on trend change ---
  const simulateTrade = async () => {
    if (!userId || botStatus?.bot_status !== "running") return;
    setSimulateLoading(true);

    try {
      const assets = ["bitcoin", "ethereum", "binance-coin", "ripple"];
      let tradesToAdd = [];
      let updatedTrends = { ...lastTrends };

      for (let asset of assets) {
        const history = priceHistory[asset] || [];
        if (history.length < 6) continue;

        const shortMA = history.slice(-3).reduce((sum, p) => sum + p, 0) / 3;
        const longMA = history.slice(-6).reduce((sum, p) => sum + p, 0) / 6;

        let currentTrend = "";
        if (shortMA > longMA) currentTrend = "Uptrend 🔺";
        else if (shortMA < longMA) currentTrend = "Downtrend 🔻";
        else currentTrend = "Sideways ➖";

        // Only trade if trend has changed for this asset
        if (currentTrend !== lastTrends[asset] && currentTrend !== "Sideways ➖") {
          const lastPrice = history.at(-1);
          const prevPrice = history.at(-2);
          const amount = (Math.random() * 0.05 + 0.01).toFixed(4);
          const priceChange = lastPrice - prevPrice;
          const profitLoss = currentTrend === "Uptrend 🔺" ? priceChange * amount : -priceChange * amount;

          const newTrade = {
            asset,
            action: currentTrend === "Uptrend 🔺" ? "buy" : "sell",
            amount,
            price: lastPrice,
            profitLoss,
            time: new Date().toLocaleTimeString(),
          };

          tradesToAdd.push(newTrade);
          updatedTrends[asset] = currentTrend;
        }
      }

      if (tradesToAdd.length > 0) {
        setTrades((prev) => [...tradesToAdd, ...prev]);
        setLastTrends(updatedTrends);
        tradesToAdd.forEach(async (trade) => {
          setHighlightedTrade(trade.time);
          await axios.post(`${API_URL}/trading-bot/simulate/${userId}`, trade);
        });
        setTimeout(() => setHighlightedTrade(null), 2000);
      }

      // Update overall bot trend (strongest)
      const strongest = Object.values(updatedTrends).filter((t) => t !== null);
      if (strongest.length > 0) setTrend(strongest[strongest.length - 1]);
    } catch (err) {
      console.error("Error simulating trade:", err);
    } finally {
      setSimulateLoading(false);
    }
  };

  // --- Check market trends ---
  const checkMarketTrends = () => {
    const trends = {};
    Object.entries(priceHistory).forEach(([asset, history]) => {
      if (history.length < 6) {
        trends[asset] = "Not enough data ⏳";
        return;
      }
      const shortMA = history.slice(-3).reduce((sum, p) => sum + p, 0) / 3;
      const longMA = history.slice(-6).reduce((sum, p) => sum + p, 0) / 6;

      if (shortMA > longMA) trends[asset] = "Uptrend 🔺";
      else if (shortMA < longMA) trends[asset] = "Downtrend 🔻";
      else trends[asset] = "Sideways ➖";
    });
    console.table(trends);
    alert(Object.entries(trends).map(([a, t]) => `${a.toUpperCase()}: ${t}`).join("\n"));
    return trends;
  };

  const totalProfit = trades.reduce((sum, t) => sum + t.profitLoss, 0);
  const totalTrades = trades.length;
  const successfulTrades = trades.filter((t) => t.profitLoss > 0).length;
  const successRate = totalTrades > 0 ? ((successfulTrades / totalTrades) * 100).toFixed(1) : 0;

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
      <aside className="hidden md:block z-50 right-9">
        <Sidebar />
      </aside>
      <main className="flex-1 p-4 md:p-8 w-full md:ml-64 space-y-6">
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-yellow-600/20">
          <TradingViewWidget symbol="BTCUSDT" />
        </div>

        {/* Bot Control */}
        <div className="bg-gradient-to-b from-[#1a1307]/90 to-[#0d0b08]/80 backdrop-blur-xl rounded-2xl p-6 shadow-[0_0_20px_rgba(139,69,19,0.3)] max-w-2xl mx-auto border border-yellow-700/20 text-center relative">
          <div className="flex flex-col items-center mb-3">
            <div
              className={`text-7xl ${
                linking || botStatus?.bot_status === "running"
                  ? "animate-rotateY metallic-bot"
                  : "metallic-bot bot-pulse"
              }`}
            >
              🤖
            </div>
          </div>

          <h2 className="text-yellow-500 font-bold text-xl mb-2 tracking-wide flex items-center justify-center gap-2">
            NexaBot — Trading Calibration
            <span
              className={`w-3 h-3 rounded-full ${
                botStatus?.bot_status === "running"
                  ? "bg-green-400 animate-pulse"
                  : botStatus?.bot_status === "inactive"
                  ? "bg-red-400 animate-pulse"
                  : "bg-yellow-400 animate-pulse"
              }`}
            ></span>
          </h2>

          {trend && <p className="text-sm mt-1 text-blue-400 font-semibold">{trend}</p>}
          {message && (
            <p
              className={`text-sm mt-1 ${
                message.includes("✅")
                  ? "text-green-400"
                  : message.includes("❌")
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
            >
              {message}
            </p>
          )}

          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={linkBot}
              disabled={linking || botStatus?.bot_status === "running"}
              className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black font-bold py-2 px-4 rounded-lg hover:brightness-110 transition text-xs"
            >
              {linking
                ? "Connecting..."
                : botStatus?.bot_status === "running"
                ? "Bot Linked"
                : "Link Bot"}
            </button>

            {botStatus?.bot_status === "running" && (
              <>
                <button
                  onClick={unlinkBot}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition text-xs"
                >
                  {loading ? "Processing..." : "Unlink Bot"}
                </button>

                <button
                  onClick={() => setShowChart(true)}
                  className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition text-xs"
                >
                  BotChart
                </button>

                <button
                  onClick={checkMarketTrends}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 px-4 rounded-lg hover:brightness-110 transition text-xs"
                >
                  Market Trends
                </button>
              </>
            )}
          </div>

          {/* --- Live Stats --- */}
          <div className="grid grid-cols-3 gap-2 text-yellow-400 mt-4 text-xs">
            <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
              <p className="font-semibold">Profit</p>
              <p className="text-green-400 font-bold">${totalProfit.toFixed(2)}</p>
            </div>
            <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
              <p className="font-semibold">Trades</p>
              <p className="text-yellow-300 font-bold">{totalTrades}</p>
            </div>
            <div className="bg-[#14110f] p-1.5 rounded-lg border border-yellow-700/30">
              <p className="font-semibold">Success Rate</p>
              <p className="text-green-300 font-bold">{successRate}%</p>
            </div>
          </div>
        </div>

        {/* Trades Table */}
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
                <tr>
                  <td colSpan="6" className="text-center py-2 text-yellow-400">
                    No simulated trades yet.
                  </td>
                </tr>
              ) : (
                trades.map((t, idx) => (
                  <tr
                    key={idx}
                    className={`border-b border-yellow-600/20 ${
                      highlightedTrade === t.time ? "bg-yellow-600/20 animate-pulse" : ""
                    }`}
                  >
                    <td className="py-1 px-2">{t.time}</td>
                    <td className="py-1 px-2">{t.asset.toUpperCase()}</td>
                    <td className={`${t.action === "buy" ? "text-green-400" : "text-red-400"} py-1 px-2`}>
                      {t.action.toUpperCase()}
                    </td>
                    <td className="py-1 px-2">{t.amount}</td>
                    <td className="py-1 px-2">${t.price.toFixed(2)}</td>
                    <td className={`${t.profitLoss >= 0 ? "text-green-400" : "text-red-400"} py-1 px-2`}>
                      ${t.profitLoss.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- Chart Modal --- */}
        {showChart && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-[#0d0b08] p-4 rounded-2xl max-w-3xl w-full relative">
              <button
                onClick={() => setShowChart(false)}
                className="absolute top-2 right-2 text-red-500 font-bold text-lg"
              >
                ✖
              </button>
              <h2 className="text-yellow-400 font-bold mb-2 text-center">Bot Trend Chart</h2>
              <div className="h-96">
                <Line
                  data={{
                    labels: Array.from({ length: priceHistory.bitcoin.length }, (_, i) => i + 1),
                    datasets: Object.entries(priceHistory).map(([asset, prices]) => ({
                      label: asset.toUpperCase(),
                      data: prices,
                      borderColor:
                        asset === "bitcoin"
                          ? "rgba(255, 215, 0, 0.8)"
                          : asset === "ethereum"
                          ? "rgba(98, 0, 238, 0.8)"
                          : asset === "binance-coin"
                          ? "rgba(255, 99, 132, 0.8)"
                          : "rgba(0, 255, 255, 0.8)",
                      backgroundColor: "transparent",
                      tension: 0.3,
                    })),
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: { position: "top", labels: { color: "#FFD700" } },
                      title: { display: false },
                    },
                    scales: {
                      x: { ticks: { color: "#FFD700" }, grid: { color: "#444" } },
                      y: { ticks: { color: "#FFD700" }, grid: { color: "#444" } },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Trading;
        
