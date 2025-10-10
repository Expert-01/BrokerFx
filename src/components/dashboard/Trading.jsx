import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import {
  placeTrade,
  closeTrade,
  fetchOpenTrades,
  fetchTradeHistory,
} from "../../api/trade";

const Trading = () => {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [amount, setAmount] = useState("");
  const [side, setSide] = useState("buy");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [message, setMessage] = useState("");
  const [openTrades, setOpenTrades] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const loadTrades = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const [open, history] = await Promise.all([
        fetchOpenTrades(token),
        fetchTradeHistory(token),
      ]);
      setOpenTrades(open);
      setTradeHistory(history);
    } catch (err) {
      setMessage("Failed to load trades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrades();
  }, []);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!amount) return setMessage("Enter amount!");
    setLoading(true);
    setMessage("");
    try {
      await placeTrade({
        asset: symbol,
        type: side,
        amount,
        takeProfit: takeProfit || null,
        stopLoss: stopLoss || null,
        token,
      });
      setMessage("✅ Trade placed successfully!");
      setAmount("");
      setTakeProfit("");
      setStopLoss("");
      loadTrades();
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to place trade");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTrade = async (id) => {
    setLoading(true);
    setMessage("");
    try {
      await closeTrade({ id, token });
      setMessage("Trade closed successfully!");
      loadTrades();
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to close trade");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="hidden md:block z-50">
        <Sidebar />
      </aside>

      {/* Main section */}
      <main className="flex-1 p-4 md:p-8 w-full md:ml-64 space-y-10">
        {/* TradingView Widget */}
        <div className="rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(255,215,0,0.1)]">
          <TradingViewWidget symbol={symbol ? symbol.toUpperCase() : "BTCUSDT"} />
        </div>

        {/* Trading Form */}
        <div className="bg-[#0e1a2b]/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl max-w-2xl mx-auto border border-yellow-400/10">
          <h2 className="text-yellow-400 font-extrabold text-2xl mb-4 text-center tracking-wide">
            ⚡ Trade Digital Commodities
          </h2>

          <form onSubmit={handleOrder} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Symbol */}
              <div>
                <label className="block text-yellow-400 text-sm mb-1">Symbol</label>
                <select
                  className="w-full rounded-lg px-3 py-2 bg-black/60 border border-yellow-400/20 focus:border-yellow-400 text-white"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  required
                >
                  <option value="BTCUSDT">Bitcoin (BTC)</option>
                  <option value="ETHUSDT">Ethereum (ETH)</option>
                  <option value="BNBUSDT">Binance Coin (BNB)</option>
                  <option value="XRPUSDT">XRP</option>
                  <option value="SOLUSDT">Solana (SOL)</option>
                  <option value="ADAUSDT">Cardano (ADA)</option>
                  <option value="DOGEUSDT">Dogecoin (DOGE)</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-yellow-400 text-sm mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full rounded-lg px-3 py-2 bg-black/60 border border-yellow-400/20 focus:border-yellow-400 text-white"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="0.0001"
                  step="any"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Take Profit */}
              <div>
                <label className="block text-yellow-400 text-sm mb-1">
                  Take Profit (optional)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg px-3 py-2 bg-black/60 border border-yellow-400/20 focus:border-yellow-400 text-white"
                  placeholder="e.g. 50000"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(e.target.value)}
                />
              </div>

              {/* Stop Loss */}
              <div>
                <label className="block text-yellow-400 text-sm mb-1">
                  Stop Loss (optional)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg px-3 py-2 bg-black/60 border border-yellow-400/20 focus:border-yellow-400 text-white"
                  placeholder="e.g. 20000"
                  value={stopLoss}
                  onChange={(e) => setStopLoss(e.target.value)}
                />
              </div>
            </div>

            {/* Side Selection */}
            <div className="flex justify-center gap-6 mt-3">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio text-yellow-400"
                  value="buy"
                  checked={side === "buy"}
                  onChange={() => setSide("buy")}
                />
                <span className="ml-2 text-green-400 font-semibold">Buy</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="form-radio text-yellow-400"
                  value="sell"
                  checked={side === "sell"}
                  onChange={() => setSide("sell")}
                />
                <span className="ml-2 text-red-400 font-semibold">Sell</span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-2.5 rounded-lg hover:bg-yellow-500 transition transform hover:scale-[1.02] active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? "Processing..." : side === "buy" ? "Buy Now" : "Sell Now"}
            </button>

            {message && (
              <div className="mt-3 text-center text-yellow-300 text-sm animate-pulse">
                {message}
              </div>
            )}
          </form>
        </div>

        {/* Open Trades */}
        <section className="bg-[#0e1a2b]/60 p-4 md:p-6 rounded-2xl border border-yellow-400/10 shadow-lg">
          <h3 className="text-xl font-bold mb-3 text-yellow-400 text-center">
            Open Positions
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-yellow-400/20 rounded-lg">
              <thead className="bg-[#181a20] text-yellow-400">
                <tr>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Amount</th>
                  <th>Entry</th>
                  <th>TP</th>
                  <th>SL</th>
                  <th>Opened</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {openTrades.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center text-yellow-400 py-3">
                      No open trades
                    </td>
                  </tr>
                ) : (
                  openTrades.map((t) => (
                    <tr
                      key={t.id}
                      className="text-yellow-200 border-t border-yellow-400/10 hover:bg-[#1a2233]/60"
                    >
                      <td>{t.asset}</td>
                      <td
                        className={
                          t.type === "buy" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {t.type.toUpperCase()}
                      </td>
                      <td>{t.amount}</td>
                      <td>{t.entry_price}</td>
                      <td>{t.take_profit || "-"}</td>
                      <td>{t.stop_loss || "-"}</td>
                      <td>
                        {t.opened_at ? new Date(t.opened_at).toLocaleString() : "-"}
                      </td>
                      <td>
                        <button
                          onClick={() => handleCloseTrade(t.id)}
                          disabled={loading}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-3 py-1 rounded text-black font-bold text-xs hover:scale-105 transition disabled:opacity-50"
                        >
                          Close
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Trade History */}
        <section className="bg-[#0e1a2b]/60 p-4 md:p-6 rounded-2xl border border-yellow-400/10 shadow-lg">
          <h3 className="text-xl font-bold mb-3 text-yellow-400 text-center">
            Trade History
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-yellow-400/20 rounded-lg">
              <thead className="bg-[#181a20] text-yellow-400">
                <tr>
                  <th>Symbol</th>
                  <th>Side</th>
                  <th>Amount</th>
                  <th>Entry</th>
                  <th>Exit</th>
                  <th>TP</th>
                  <th>SL</th>
                  <th>P/L</th>
                  <th>Closed</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center text-yellow-400 py-3">
                      No trade history
                    </td>
                  </tr>
                ) : (
                  tradeHistory.map((t) => (
                    <tr
                      key={t.id}
                      className="text-yellow-200 border-t border-yellow-400/10 hover:bg-[#1a2233]/60"
                    >
                      <td>{t.asset}</td>
                      <td
                        className={
                          t.type === "buy" ? "text-green-400" : "text-red-400"
                        }
                      >
                        {t.type.toUpperCase()}
                      </td>
                      <td>{t.amount}</td>
                      <td>{t.entry_price}</td>
                      <td>{t.current_price || "-"}</td>
                      <td>{t.take_profit || "-"}</td>
                      <td>{t.stop_loss || "-"}</td>
                      <td
                        className={
                          t.profit_loss > 0
                            ? "text-green-400"
                            : t.profit_loss < 0
                            ? "text-red-400"
                            : ""
                        }
                      >
                        {typeof t.profit_loss === "number"
                          ? t.profit_loss.toFixed(2)
                          : "-"}
                      </td>
                      <td>
                        {t.closed_at ? new Date(t.closed_at).toLocaleString() : "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Trading;
