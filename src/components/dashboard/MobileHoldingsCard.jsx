import React, { useEffect, useState } from "react";

export default function MobileHoldingsCard() {
 // const [coins, setCoins] = useState({});
  const [coins, setCoins] = useState({});
  const [loading, setLoading] = useState(true);

  const holdings = [
    { id: "bitcoin", symbol: "BTC", amount: 1.24 },
    { id: "ethereum", symbol: "ETH", amount: 4.3 },
    { id: "solana", symbol: "SOL", amount: 31 },
  ];

  const fetchLiveData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "https://brokerx-backend-pcgs.onrender.com";
      const response = await fetch(`${apiUrl}/market/prices`);
      if (!response.ok) throw new Error("Failed to fetch market data");

      const data = await response.json();

      // Ensure data is valid before setting
      if (data && typeof data === "object") {
        setCoins(data);
      } else {
        console.error("Unexpected data structure:", data);
        setCoins({});
      }
    } catch (error) {
      console.error("Error fetching live prices:", error);
      setCoins({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  const renderIcon = (id) => {
    switch (id) {
      case "bitcoin":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#bfa233" />
            <text
              x="12"
              y="16"
              textAnchor="middle"
              fontSize="14"
              fill="#111216"
              fontWeight="bold"
            >
              ₿
            </text>
          </svg>
        );
      case "ethereum":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#bfa233" />
            <polygon points="12,5 19,12 12,19 5,12" fill="#111216" />
          </svg>
        );
      case "solana":
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="12" fill="#bfa233" />
            <rect x="6" y="8" width="12" height="2" rx="1" fill="#111216" />
            <rect x="6" y="14" width="12" height="2" rx="1" fill="#d7263d" />
          </svg>
        );
      default:
        return <span className="text-[#bfa233] text-lg font-bold">?</span>;
    }
  };

  return (
    <div className="p-4">
      <div className="text-base font-semibold text-white mb-4">
        Your Holdings
      </div>
      <div className="flex flex-col gap-3">
        {holdings.map((coin) => {
          const info = coins[coin.id];
          const price = info?.usd ?? 0;
          const change = info?.usd_24h_change ?? 0;
          const value =  price;

          return (
            <div
              key={coin.id}
              className="flex items-center bg-[#111216] rounded-xl px-4 py-4 hover:scale-[1.02] transition-transform duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa233]/20 mr-4">
                {renderIcon(coin.id)}
              </div>

              <div className="flex-1">
                <div className="text-white font-bold text-base capitalize">
                  {coin.id}
                </div>
                <div className="text-xs text-gray-400">
                  {coin.amount} {coin.symbol}
                </div>
              </div>

              <div className="flex flex-col items-end">
                {loading ? (
                  <div className="text-gray-400 text-sm">Loading...</div>
                ) : (
                  <>
                    <div className="text-white font-bold text-lg">
                      ${value ? value.toLocaleString() : "0.00"}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        change >= 0 ? "text-[#bfa233]" : "text-[#d7263d]"
                      }`}
                    >
                      {change ? change.toFixed(2) : "0.00"}%
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
