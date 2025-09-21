import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ReactApexChart from "react-apexcharts";

// Color constants for candlestick chart
const GREEN_CANDLE = "#4ade80";
const RED_CANDLE = "#ef4444";

function TradePanel() {
  const [symbol, setSymbol] = useState("BTCUSDT"); // default asset
  const [candles, setCandles] = useState([]);
  const [price, setPrice] = useState(null);
  const [amount, setAmount] = useState("");
  const [orderType, setOrderType] = useState("buy");
  const [chartType, setChartType] = useState("line"); // "line" or "candle"

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
    const interval = setInterval(fetchCandles, 10000); // refresh every 10s
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

  const handleOrder = () => {
    if (!amount) return alert("Enter amount!");
    alert(
      `Order placed: ${orderType.toUpperCase()} ${amount} of ${symbol} @ ${price}`
    );
    setAmount("");
  };

  return (
    <div className="bg-gradient-to-br from-black via-[#181a20] to-[#23272f] text-[#d4af37] p-6 rounded-2xl shadow-lg w-full max-w-4xl mx-auto border border-[#bfa233]/30">
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
          className={`px-3 py-1 rounded font-semibold border border-[#bfa233]/40 transition-all duration-200 ${
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
          <div style={{ width: "100%", height: "100%" }}>
            <ApexCandleChart data={candles} />
          </div>
        )}
      </div>



      {/* Order Form */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="number"
          placeholder="Amount"
          onChange={(e) => setAmount(e.target.value)}
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
          className="bg-gradient-to-r from-yellow-500 to-yellow-700 px-4 py-2 rounded font-bold text-black hover:scale-105 transition"
        >
          Place Order
        </button>
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


