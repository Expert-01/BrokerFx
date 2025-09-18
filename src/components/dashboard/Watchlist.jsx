import React, { useEffect, useState } from "react";

const pairs = [
  { symbol: "USD/EUR", id: "eur" },
  { symbol: "USD/GBP", id: "gbp" },
  { symbol: "USD/JPY", id: "jpy" },
  { symbol: "USD/NGN", id: "ngn" },
  { symbol: "USD/INR", id: "inr" },
  { symbol: "USD/CAD", id: "cad" },
  { symbol: "USD/AUD", id: "aud" },
  { symbol: "USD/CHF", id: "chf" },
];

const Watchlist = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      async function fetchPrices() {
        setLoading(true);
        try {
          // ExchangeRate-API (free, no key needed for demo): https://open.er-api.com/v6/latest/USD
          const res = await fetch("https://open.er-api.com/v6/latest/USD");
          const json = await res.json();
          if (!json.rates) throw new Error("No rates");
          // No 24h change, so show '-'
          const usdRates = pairs.map(pair => {
            const rate = json.rates[pair.id.toUpperCase()];
            return {
              ...pair,
              last: rate ? rate.toFixed(4) : "-",
              change: "-"
            };
          });
          setData(usdRates);
        } catch (e) {
          setData([]);
        }
        setLoading(false);
      }
      fetchPrices();
    }, []);

  return (
    <div className=" bg-[#181a20]/30 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-6 w-full max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-bold text-lg">Watchlist</span>
        <button className="border border-yellow-400 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      <table className="w-full text-left mt-2">
        <thead>
          <tr className="text-yellow-400 text-xs">
            <th>Symbol</th>
            <th>Last</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3} className="text-center text-gray-400">Loading...</td></tr>
          ) : data.length === 0 ? (
            <tr><td colSpan={3} className="text-center text-red-400">No data</td></tr>
          ) : data.map((item) => (
            <tr key={item.symbol} className="text-white text-sm">
              <td>{item.symbol}</td>
              <td>{item.last}</td>
              <td className="text-gray-400">{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Watchlist;
