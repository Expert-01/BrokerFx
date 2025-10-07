import React, { useEffect, useState } from "react";

export default function MobileHoldingsCard() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const holdings = [
    { id: "bitcoin", symbol: "BTC", amount: 1.24 },
    { id: "ethereum", symbol: "ETH", amount: 4.3 },
    { id: "solana", symbol: "SOL", amount: 31 },
  ];

  const fetchLiveData = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true"
      );
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching live prices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="text-base font-semibold text-white mb-4">Your Holdings</div>
      <div className="flex flex-col gap-3">
        {holdings.map((coin) => {
          const info = coins[coin.id];
          const price = info?.usd ?? 0;
          const change = info?.usd_24h_change ?? 0;
          const value = coin.amount * price;

          return (
            <div
              key={coin.id}
              className="flex items-center bg-[#111216] rounded-xl px-4 py-4"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa233]/20 mr-4">
                {/* Coin icon fallback */}
                <span className="text-[#bfa233] text-lg font-bold">
                  {coin.symbol[0]}
                </span>
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
                      ${value.toLocaleString()}
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        change >= 0 ? "text-[#bfa233]" : "text-[#d7263d]"
                      }`}
                    >
                      {change.toFixed(2)}%
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
