import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import axios from "axios";

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
  const [logs, setLogs] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Helper to log messages both to state and console
  const addLog = (msg) => {
    console.log(msg);
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  addLog("Trading Page Loaded | userId: " + userId);

  // Fetch bot status
  const fetchBotStatus = async () => {
    addLog("Fetching bot status...");
    if (!userId) {
      addLog("No userId available");
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/api/trading-bot/status/${userId}`);
      addLog("Bot status response: " + JSON.stringify(res.data));
      setBotStatus(res.data);
      if (res.data.simulated_trades) {
        setTrades(res.data.simulated_trades);
        addLog("Simulated trades updated from backend: " + JSON.stringify(res.data.simulated_trades));
      }
    } catch (err) {
      addLog("Error fetching bot status: " + err);
    }
  };

  // Link bot
  const linkBot = async () => {
    addLog("Link bot clicked");
    if (!userId) {
      addLog("Cannot link bot: no userId");
      return;
    }
    setLinking(true);
    setMessage("");
    try {
      addLog("Sending link request to backend...");
      const res = await axios.post(`${API_URL}/api/trading-bot/link`, { userId });
      addLog("Link response: " + JSON.stringify(res));
      if (res.status === 200) {
        setMessage("✅ Bot linked and active!");
        await fetchBotStatus();
      } else {
        setMessage("⚠️ Unexpected response while linking.");
      }
    } catch (err) {
      addLog("Link bot error: " + err);
      setMessage("❌ Failed to link bot.");
    } finally {
      setLinking(false);
    }
  };

  // Unlink bot
  const unlinkBot = async () => {
    addLog("Unlink bot clicked");
    if (!userId) {
      addLog("Cannot unlink bot: no userId");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      addLog("Sending unlink request to backend...");
      const res = await axios.post(`${API_URL}/api/trading-bot/unlink`, { userId });
      addLog("Unlink response: " + JSON.stringify(res));
      if (res.status === 200) {
        setMessage("🔌 Bot disconnected!");
        await fetchBotStatus();
      } else {
        setMessage("⚠️ Unexpected response while unlinking.");
      }
    } catch (err) {
      addLog("Unlink bot error: " + err);
      setMessage("❌ Failed to unlink bot.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch live price
  const fetchLivePrice = async (coin) => {
    addLog("Fetching live price for: " + coin);
    try {
      const res = await axios.get(
        `https://api.coinstats.app/public/v1/coins/${coin}?currency=USD`
      );
      addLog(`${coin} price: ${res.data.coin.price}`);
      return res.data.coin.price;
    } catch (err) {
      addLog("Error fetching live price: " + err);
      return null;
    }
  };

  // Update price history
  const updatePriceHistory = async () => {
    addLog("Updating price history...");
    const assets = ["bitcoin", "ethereum", "binance-coin", "ripple"];
    for (let asset of assets) {
      const price = await fetchLivePrice(asset);
      if (!price) continue;
      setPriceHistory((prev) => {
        const history = [...(prev[asset] || []), price];
        if (history.length > 12) history.shift();
        addLog(`Price history updated for ${asset}: ${JSON.stringify(history)}`);
        return { ...prev, [asset]: history };
      });
    }
  };

  // Simulate trade
  const simulateTrade = async () => {
    addLog("Simulate trade triggered");
    if (!userId) {
      addLog("Cannot simulate trade: no userId");
      return;
    }
    if (botStatus?.bot_status !== "running") {
      addLog("Bot not running, skipping simulation");
      return;
    }
    setSimulateLoading(true);

    try {
      const assets = ["bitcoin", "ethereum", "binance-coin", "ripple"];
      const asset = assets[Math.floor(Math.random() * assets.length)];
      const action = Math.random() < 0.5 ? "buy" : "sell";
      const amount = (Math.random() * 0.05 + 0.01).toFixed(4);

      const history = priceHistory[asset] || [];
      if (history.length < 2) {
        addLog("Not enough price history for simulation: " + asset);
        return;
      }

      const lastPrice = history[history.length - 1];
      const prevPrice = history[history.length - 2];
      const priceChange = lastPrice - prevPrice;
      const profitLoss = action === "buy" ? priceChange * amount : -priceChange * amount;

      addLog("Simulated trade details: " + JSON.stringify({ asset, action, amount, lastPrice, profitLoss }));

      const res = await axios.post(`${API_URL}/api/trading-bot/simulate/${userId}`, {
        asset,
        action,
        amount: parseFloat(amount),
        price: lastPrice,
        profitLoss,
      });

      addLog("Simulation response: " + JSON.stringify(res.data));

      const newTrade = {
        asset,
        action,
        amount,
        price: lastPrice,
        profitLoss,
        time: new Date().toLocaleTimeString(),
      };
      setTrades((prev) => [newTrade, ...prev]);
      addLog("Trade added to state: " + JSON.stringify(newTrade));
    } catch (err) {
      addLog("Error simulating trade: " + err);
    } finally {
      setSimulateLoading(false);
    }
  };

  // Initial fetch and interval
  useEffect(() => {
    addLog("Mounting Trading component, starting intervals");
    if (!userId) {
      addLog("No userId, cannot start intervals");
      return;
    }

    fetchBotStatus();
    const interval = setInterval(async () => {
      addLog("Interval tick: fetching bot status, updating prices, simulating trade");
      await fetchBotStatus();
      await updatePriceHistory();
      await simulateTrade();
    }, 5000);

    return () => {
      addLog("Unmounting Trading component, clearing interval");
      clearInterval(interval);
    };
  }, [userId]);

  return (
    <div className="flex min-h-screen bg-[#0a0908] text-[#f5e6ca] relative">
      <aside className="hidden md:block z-50 right-9">
        <Sidebar />
      </aside>

      <main className="flex-1 p-4 md:p-8 w-full md:ml-64 space-y-6">
        {/* Chart and Bot Panel */}
        {/* ... your existing JSX remains the same ... */}

        {/* Log Panel */}
        <div className="fixed bottom-0 left-0 w-full max-h-40 overflow-y-auto bg-black/80 text-yellow-400 text-xs p-2 z-50">
          {logs.map((log, idx) => (
            <div key={idx}>{log}</div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Trading;
