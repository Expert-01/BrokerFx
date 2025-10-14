import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Trading = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [loading, setLoading] = useState(false); // For simulation & unlink
  const [linking, setLinking] = useState(false); // For linking
  const [message, setMessage] = useState(""); // General status message

  // Simulation states
  const [simulateAsset, setSimulateAsset] = useState("bitcoin");
  const [simulateAction, setSimulateAction] = useState("buy");
  const [simulateAmount, setSimulateAmount] = useState("");
  const [simulateMessage, setSimulateMessage] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch bot status
  const fetchBotStatus = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_URL}/api/trading-bot/status/${userId}`);
      setBotStatus(res.data);
    } catch (err) {
      console.error("Error fetching bot status:", err);
    }
  };

  // Link NexaBot
  const linkBot = async () => {
    if (!userId) return;
    setLinking(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/api/trading-bot/link`, { userId });
      if (res.status === 200) {
        setMessage("✅ NexaBot linked and activated!");
        await fetchBotStatus();
      } else {
        setMessage("⚠️ Unexpected response while linking NexaBot.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to link NexaBot. Please try again.");
    } finally {
      setLinking(false);
    }
  };

  // Unlink NexaBot
  const unlinkBot = async () => {
    if (!userId) return;
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${API_URL}/api/trading-bot/unlink`, { userId });
      if (res.status === 200) {
        setMessage("🔌 NexaBot disconnected successfully!");
        await fetchBotStatus();
      } else {
        setMessage("⚠️ Unexpected response while unlinking NexaBot.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to unlink NexaBot.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch live price
  const fetchLivePrice = async (coin) => {
    try {
      const res = await axios.get(`https://api.coinstats.app/public/v1/coins/${coin}?currency=USD`);
      return res.data.coin.price;
    } catch (err) {
      console.error("Error fetching live price:", err);
      return null;
    }
  };

  // Simulate trade
  const handleSimulateTrade = async () => {
    if (!userId || !simulateAmount) {
      setSimulateMessage("⚠️ Please enter an amount to simulate.");
      return;
    }
    setLoading(true);
    setSimulateMessage("");

    try {
      const price = await fetchLivePrice(simulateAsset);
      if (!price) throw new Error("Failed to fetch price");

      const profitLoss =
        simulateAction === "buy"
          ? price * 0.01 * parseFloat(simulateAmount)
          : -price * 0.01 * parseFloat(simulateAmount);

      await axios.post(`${API_URL}/api/trading-bot/simulate/${userId}`, {
        asset: simulateAsset,
        action: simulateAction,
        amount: parseFloat(simulateAmount),
        price,
        profitLoss,
      });

      setSimulateMessage(
        `✅ Trade simulated for ${simulateAction.toUpperCase()} ${simulateAmount} ${simulateAsset.toUpperCase()} @ $${price.toFixed(
          2
        )} | P/L: $${profitLoss.toFixed(2)}`
      );

      await fetchBotStatus();
      setSimulateAmount("");
    } catch (err) {
      console.error(err);
      setSimulateMessage("❌ Failed to simulate trade. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotStatus();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0a0908] text-[#f5e6ca]">
      <aside className="hidden md:block z-50 right-9">
        <Sidebar />
      </aside>

      <main className="flex-1 p-4 md:p-8 w-full md:ml-64 space-y-10">
        {/* Chart */}
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)] border border-yellow-600/20">
          <TradingViewWidget symbol="BTCUSDT" />
        </div>

        {/* NexaBot Control Panel */}
        <div className="bg-gradient-to-b from-[#1a1307]/90 to-[#0d0b08]/80 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_25px_rgba(139,69,19,0.3)] max-w-2xl mx-auto border border-yellow-700/20 text-center">
          <h2 className="text-yellow-500 font-extrabold text-3xl mb-4 tracking-wide">
            🤖 NexaBot — AI Trading Assistant
          </h2>
          <p className="text-yellow-200 mb-6 text-sm md:text-base">
            Automate your trades with AI. NexaBot analyzes the market using real-time
            data from TradingView and executes trades based on top-performing assets.
          </p>

          <div className="space-y-4">
            {/* Message always visible */}
            {message && (
              <div
                className={`text-sm ${
                  message.includes("✅")
                    ? "text-green-400"
                    : message.includes("❌")
                    ? "text-red-400"
                    : "text-yellow-300"
                }`}
              >
                {message}
              </div>
            )}

            {botStatus ? (
              <>
                <p className="text-yellow-300 text-lg font-semibold">
                  Status:{" "}
                  <span
                    className={
                      botStatus.bot_status === "running"
                        ? "text-green-400"
                        : botStatus.bot_status === "inactive"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }
                  >
                    {botStatus.bot_status?.toUpperCase() || "UNKNOWN"}
                  </span>
                </p>

                <div className="grid grid-cols-3 gap-3 text-yellow-400 mt-4 text-sm">
                  <div className="bg-[#14110f] p-3 rounded-lg border border-yellow-700/30">
                    <p className="font-semibold">Profit</p>
                    <p className="text-green-400 font-bold">
                      ${Number(botStatus.total_profit || 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-[#14110f] p-3 rounded-lg border border-yellow-700/30">
                    <p className="font-semibold">Trades</p>
                    <p className="text-yellow-300 font-bold">
                      {botStatus.total_trades || 0}
                    </p>
                  </div>
                  <div className="bg-[#14110f] p-3 rounded-lg border border-yellow-700/30">
                    <p className="font-semibold">Success Rate</p>
                    <p className="text-green-300 font-bold">
                      {botStatus.total_trades > 0
                        ? ((botStatus.successful_trades / botStatus.total_trades) * 100).toFixed(1)
                        : 0}
                      %
                    </p>
                  </div>
                </div>

                <button
                  onClick={unlinkBot}
                  disabled={loading}
                  className="mt-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2.5 px-6 rounded-lg hover:brightness-110 transition"
                >
                  {loading ? "Processing..." : "Unlink NexaBot"}
                </button>
              </>
            ) : (
              <>
                <p className="text-yellow-300 mb-4">
                  NexaBot is currently not linked to your account.
                </p>
                <button
                  onClick={linkBot}
                  disabled={linking}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black font-bold py-2.5 px-8 rounded-lg hover:brightness-110 transition"
                >
                  {linking ? "Connecting..." : "Link Account with NexaBot"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Simulate Trade */}
        <div className="bg-gradient-to-b from-[#1a1307]/90 to-[#0d0b08]/80 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_25px_rgba(139,69,19,0.3)] max-w-2xl mx-auto border border-yellow-700/20 text-center mt-10">
          <h3 className="text-yellow-500 font-extrabold text-2xl mb-4 tracking-wide">
            ⚡ Simulate NexaBot Trade (Live Price)
          </h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-yellow-500 mb-1">Asset</label>
              <select
                className="w-full rounded-lg px-3 py-2 bg-[#12100e]/90 border border-yellow-600/30 text-white"
                value={simulateAsset}
                onChange={(e) => setSimulateAsset(e.target.value)}
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="binance-coin">BNB</option>
                <option value="ripple">XRP</option>
              </select>
            </div>

            <div>
              <label className="block text-yellow-500 mb-1">Action</label>
              <select
                className="w-full rounded-lg px-3 py-2 bg-[#12100e]/90 border border-yellow-600/30 text-white"
                value={simulateAction}
                onChange={(e) => setSimulateAction(e.target.value)}
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-yellow-500 mb-1">Amount</label>
            <input
              type="number"
              className="w-full rounded-lg px-3 py-2 bg-[#12100e]/90 border border-yellow-600/30 text-white"
              value={simulateAmount}
              onChange={(e) => setSimulateAmount(e.target.value)}
              placeholder="0.01"
            />
          </div>

          <button
            onClick={handleSimulateTrade}
            disabled={loading}
            className="mt-2 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black font-bold py-2.5 px-6 rounded-lg hover:brightness-110 transition"
          >
            {loading ? "Simulating..." : "Simulate Trade"}
          </button>

          {simulateMessage && (
            <p
              className={`mt-3 text-sm ${
                simulateMessage.includes("✅")
                  ? "text-green-400"
                  : simulateMessage.includes("❌")
                  ? "text-red-400"
                  : "text-yellow-300"
              }`}
            >
              {simulateMessage}
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Trading;

          
