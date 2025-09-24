import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  placeTrade,
  closeTrade,
  fetchOpenTrades,
  fetchTradeHistory,
} from "../api/trade";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactApexChart from "react-apexcharts";
import Sidebar  from "../components/dashboard/Sidebar";
// Color constants for candlestick chart
const GREEN_CANDLE = "#4ade80";
const RED_CANDLE = "#ef4444";

function TradePanel() {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [candles, setCandles] = useState([]);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("buy");
  const [takeProfit, setTakeProfit] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [chartType, setChartType] = useState("line");
  const [openTrades, setOpenTrades] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch candlestick data
  useEffect(() => {
    const fetchCandles = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/market/candles/${symbol}`
        );
        // Use the backend's formatted data
        const data = res.data.data || [];
        setCandles(
          data.map((c) => ({
            ...c,
            time: new Date(c.time),
            price: parseFloat(c.close),
          }))
        );
      } catch (err) {
        setCandles([]);
        console.error("Candles error:", err.message);
      }
    };

    fetchCandles();
    const interval = setInterval(fetchCandles, 6000); // refresh every 10s
    return () => clearInterval(interval);
  }, [symbol]);

  // Fetch current price
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_LOCAL_URL}/market/price/${symbol}`
        );
        setPrice(res.data.price);
      } catch (err) {
        setPrice(null);
        console.error("Price error:", err.message);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 1000); // refresh every 1s
    return () => clearInterval(interval);
  }, [symbol]);

  // Get token from localStorage (adjust as needed for your auth)
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
    // Optionally poll for open trades
    // const interval = setInterval(loadTrades, 10000);
    // return () => clearInterval(interval);
  }, []);

  const handleOrder = async () => {
    if (!amount) return setMessage("Enter amount!");
    setLoading(true);
    setMessage("");
    try {
      await placeTrade({
        asset: symbol.toLowerCase(),
        type: orderType,
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

  return (
    <div className=" text-[#d4af37] p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
          <aside>
            <Sidebar/>
          </aside>
  <h2 className="text-2xl font-bold mb-4 text-[#bfa233]">Trading Panel</h2>

      {/* Select Asset */}
  <div className="mb-4 flex gap-2">
        <select
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-2 rounded bg-[#181a20] text-[#d4af37] border border-[#bfa233]/40 focus:border-[#bfa233]"
        >
          <option value="BTCUSDT">Bitcoin (BTC)</option>
          <option value="ETHUSDT">Ethereum (ETH)</option>
          <option value="BNBUSDT">Binance Coin (BNB)</option>
          <option value="XRPUSDT">XRP</option>
          <option value="SOLUSDT">Solana (SOL)</option>
          <option value="ADAUSDT">Cardano (ADA)</option>
          <option value="DOGEUSDT">Dogecoin (DOGE)</option>
        </select>

  <span className="ml-auto text-lg font-semibold text-[#bfa233]">
          Live Price:{" "}
          {price ? `$${parseFloat(price).toFixed(2)}` : "Loading..."}
        </span>
      </div>

      {/* Chart View Toggle */}
  <div className="mb-2 flex gap-2">
        <button
          className={`px-3 py-1 rounded font-semibold border glass-radial-btn border-[#bfa233]/40 transition-all duration-200 ${
            chartType === "line"
              ? "bg-gradient-to-r from-[#bfa233] to-[#d4af37] text-black shadow"
              : "bg-[#181a20] text-[#d4af37]"
          }`}
          onClick={() => setChartType("line")}
        >
          Line Chart
        </button>
        <button
          className={`px-3 py-1 rounded font-semibold border border-[#bfa233]/40 transition-all duration-200 ${
            chartType === "candle"
              ? "bg-gradient-to-r from-[#bfa233] to-[#d4af37] text-black shadow"
              : "bg-[#181a20] text-[#d4af37]"
          }`}
          onClick={() => setChartType("candle")}
        >
          Candlestick
        </button>
      </div>

      {/* Chart */}
  <div className="h-64 mb-6 bg-[#181a20] rounded-lg p-2 border border-[#bfa233]/20">
        {chartType === "line" ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={candles}>
              <XAxis dataKey="time" hide />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#FFD700" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div style={{ width: "100%", height: "500px" }}>
            <ApexCandleChart data={candles} />
          </div>
        )}
      </div>



      {/* Order Form */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 rounded bg-[#181a20] text-[#d4af37] border border-[#bfa233]/40 focus:border-[#bfa233] flex-1"
        />
        <input
          type="number"
          placeholder="Take Profit (optional)"
          value={takeProfit}
          onChange={(e) => setTakeProfit(e.target.value)}
          className="p-2 rounded bg-[#181a20] text-[#d4af37] border border-[#bfa233]/40 focus:border-[#bfa233] flex-1"
        />
        <input
          type="number"
          placeholder="Stop Loss (optional)"
          value={stopLoss}
          onChange={(e) => setStopLoss(e.target.value)}
          className="p-2 rounded bg-[#181a20] text-[#d4af37] border border-[#bfa233]/40 focus:border-[#bfa233] flex-1"
        />
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="p-2 rounded bg-[#181a20] text-[#d4af37] border border-[#bfa233]/40 focus:border-[#bfa233]"
        >
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <button
          onClick={handleOrder}
          disabled={loading}
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-4 py-2 rounded font-bold text-black hover:scale-105 transition disabled:opacity-60"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

      {message && (
        <div className="mb-4 text-center text-yellow-400 font-semibold">{message}</div>
      )}

      {/* Open Trades Table */}
      <div className="mb-8">
        <h3 className="text-lg font-bold mb-2 text-[#bfa233]">Open Positions</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-[#bfa233]/20 rounded-lg">
            <thead>
              <tr className="text-[#bfa233] bg-[#181a20]">
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
                  <tr key={t.id} className="text-[#d4af37]">
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
        <h3 className="text-lg font-bold mb-2 text-[#bfa233]">Trade History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-[#bfa233]/20 rounded-lg">
            <thead>
              <tr className="text-[#bfa233] bg-[#181a20]">
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
                  <tr key={t.id} className="text-[#d4af37]">
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
    </div>
  );
}

export default TradePanel;


// --- ApexCandleChart component ---
function ApexCandleChart({ data }) {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-400">No data</div>;
  }

  // Format data for ApexCharts
  const series = [
    {
      data: data.map((c) => ({
        x: typeof c.time === "string" ? c.time : c.time.toLocaleTimeString(),
        y: [Number(c.open), Number(c.high), Number(c.low), Number(c.close)],
      })),
    },
  ];

  // Example price levels for horizontal lines
  const priceLevels = [
    50000, // Example: resistance
    45000, // Example: support
    47000, // Example: custom level
  ];

  const options = {
    chart: {
      type: "candlestick",
      toolbar: { show: false },
      background: "transparent",
    },
    xaxis: {
      type: "category",
      labels: { show: false },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: { style: { colors: "#fff" } },
    },
    grid: { show: false },
    tooltip: { enabled: true },
    theme: { mode: "dark" },
    annotations: {
      yaxis: priceLevels.map((level, idx) => ({
        y: level,
        borderColor: ["#ff0000", "#00ff00", "#ffd700"][idx % 3],
        label: {
          text: `Level ${idx + 1}: $${level}`,
          style: {
            color: "#181a20",
            background: ["#ff0000", "#00ff00", "#ffd700"][idx % 3],
          },
        },
        strokeWidth: 4, // Thicker line
      })),
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="candlestick"
      height={240}
      width="100%"
    />
  );
}


