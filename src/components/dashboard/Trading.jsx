
import React, { useState, useEffect } from "react";
import TradingViewWidget from "./TradingViewWidget";
import Sidebar from "./Sidebar";
import { placeTrade, closeTrade, fetchOpenTrades, fetchTradeHistory } from "../../api/trade";
// This is a simple trading form for buying/selling digital commodities (investments)
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
      setMessage("Trade placed successfully!");
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
      setMessage("Trade closed.");
      loadTrades();
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to close trade");
    } finally {
      setLoading(false);
    }
  };

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
        <TradingViewWidget symbol={symbol ? symbol.toUpperCase() : 'BTCUSDT'} />
        <div className="bg-[#23272f] backdrop-blur-md rounded-2xl p-6 shadow-xl mb-8 max-w-2xl mx-auto">
          <h2 className="text-yellow-400 font-bold text-lg mb-4">Trade Digital Commodities</h2>
          <form onSubmit={handleOrder} className="space-y-4">
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Symbol</label>
              <select
                className="w-full rounded px-3 py-2 bg-black text-white focus:outline-none"
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
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
            <div>
              <label className="block text-yellow-400 text-sm mb-1">Amount</label>
              <input
                type="number"
                className="w-full rounded px-3 py-2 bg-black text-white focus:outline-none"
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
                className="w-full rounded px-3 py-2 bg-black text-white focus:outline-none"
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
                className="w-full rounded px-3 py-2 bg-black text-white focus:outline-none"
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
              disabled={loading}
            >
              {loading ? "Placing..." : side === "buy" ? "Buy" : "Sell"}
            </button>
            {message && <div className="mt-2 text-center text-yellow-400">{message}</div>}
          </form>
        </div>

        {/* Open Trades Table */}
        <div className="mb-8">
          <h3 className="text-lg font-bold mb-2 text-yellow-400">Open Positions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-yellow-400/20 rounded-lg">
              <thead>
                <tr className="text-yellow-400 bg-[#181a20]">
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
                  <tr><td colSpan={8} className="text-center text-yellow-400">No open trades</td></tr>
                ) : (
                  openTrades.map((t) => (
                    <tr key={t.id} className="text-yellow-300">
                      <td>{t.asset}</td>
                      <td className={t.type === "buy" ? "text-green-400" : "text-red-400"}>{t.type.toUpperCase()}</td>
                      <td>{t.amount}</td>
                      <td>{t.entry_price}</td>
                      <td>{t.take_profit || '-'}</td>
                      <td>{t.stop_loss || '-'}</td>
                      <td>{t.opened_at ? new Date(t.opened_at).toLocaleString() : '-'}</td>
                      <td>
                        <button
                          onClick={() => handleCloseTrade(t.id)}
                          disabled={loading}
                          className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-2 py-1 rounded text-black font-bold text-xs hover:scale-105 transition disabled:opacity-60"
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
        </div>

        {/* Trade History Table */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-yellow-400">Trade History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border border-yellow-400/20 rounded-lg">
              <thead>
                <tr className="text-yellow-400 bg-[#181a20]">
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
                  <tr><td colSpan={9} className="text-center text-yellow-400">No trade history</td></tr>
                ) : (
                  tradeHistory.map((t) => (
                    <tr key={t.id} className="text-yellow-300">
                      <td>{t.asset}</td>
                      <td className={t.type === "buy" ? "text-green-400" : "text-red-400"}>{t.type.toUpperCase()}</td>
                      <td>{t.amount}</td>
                      <td>{t.entry_price}</td>
                      <td>{t.current_price || '-'}</td>
                      <td>{t.take_profit || '-'}</td>
                      <td>{t.stop_loss || '-'}</td>
                      <td className={t.profit_loss > 0 ? "text-green-400" : t.profit_loss < 0 ? "text-red-400" : ""}>{typeof t.profit_loss === "number" ? t.profit_loss.toFixed(2) : '-'}</td>
                      <td>{t.closed_at ? new Date(t.closed_at).toLocaleString() : '-'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Trading;