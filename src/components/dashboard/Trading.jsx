import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Trading = () => {
  const [botStatus, setBotStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");

  // Assuming you store the user object in localStorage after login
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // Fetch bot status
  const fetchBotStatus = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`${API_URL}/api/trading-bot/status/${userId}`);
      setBotStatus(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Link account with NexaBot
  const linkBot = async () => {
    if (!userId) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${API_URL}/api/trading-bot/link`, { userId });
      setMessage("✅ NexaBot linked and activated!");
      fetchBotStatus();
    } catch (err) {
      setMessage("❌ Failed to link NexaBot");
    } finally {
      setLoading(false);
    }
  };

  // Unlink NexaBot
  const unlinkBot = async () => {
    if (!userId) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${API_URL}/api/trading-bot/unlink`, { userId });
      setMessage("🔌 NexaBot disconnected successfully!");
      fetchBotStatus();
    } catch (err) {
      setMessage("❌ Failed to unlink NexaBot");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotStatus();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#0a0908] text-[#f5e6ca]">
      {/* Sidebar */}
      <aside className="hidden md:block z-50 right-9">
        <Sidebar />
      </aside>

      {/* Main */}
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
                        ? (
                            (botStatus.successful_trades /
                              botStatus.total_trades) *
                            100
                          ).toFixed(1)
                        : 0}
                      %
                    </p>
                  </div>
                </div>

                <button
                  onClick={unlinkBot}
                  disabled={loading}
                  className="mt-6 bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2.5 px-6 rounded-lg hover:brightness-110 transition transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50"
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
                  disabled={loading}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 text-black font-bold py-2.5 px-8 rounded-lg hover:brightness-110 transition transform hover:scale-[1.03] active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? "Connecting..." : "Link Account with NexaBot"}
                </button>
              </>
            )}
          </div>

          {message && (
            <div className="mt-4 text-yellow-300 text-sm animate-pulse">
              {message}
            </div>
          )}
        </div>

        {/* --- Original Trade Forms & Tables (Commented Out) --- */}
        {/*
        <div>
          // all your original manual trade forms and tables go here (commented out)
        </div>
        */}
      </main>
    </div>
  );
};

export default Trading;
