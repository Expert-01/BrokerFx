import React, { useEffect, useState } from "react";

export default function MobileHotCoins() {
  const [hotCoins, setHotCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHotCoins = async () => {
    try {
      // Get top 10 coins by market cap
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
      const data = await response.json();

      // Filter for coins with positive 24h change (profitable/trending)
      const trending = data.filter((coin) => coin.price_change_percentage_24h > 0);

      // Sort them by biggest gainers
      trending.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);

      // Take top 4 trending
      setHotCoins(trending.slice(0, 4));
    } catch (error) {
      console.error("Error fetching hot coins:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotCoins();
    const interval = setInterval(fetchHotCoins, 15000); // refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111216] rounded-2xl p-4">
      <div className="text-sm font-bold text-[#bfa233] mb-3">🔥 Hot Coins</div>

      {loading ? (
        <div className="text-gray-400 text-sm">Loading...</div>
      ) : hotCoins.length === 0 ? (
        <div className="text-gray-400 text-sm">No trending coins right now.</div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {hotCoins.map((coin) => (
            <div
              key={coin.id}
              className="bg-[#23272f] rounded-lg p-3 flex flex-col items-center justify-center hover:scale-[1.03] transition-transform duration-300"
            >
              <img
                src={coin.image}
                alt={coin.name}
                className="w-8 h-8 mb-2 rounded-full"
              />
              <span className="text-xs text-gray-400 uppercase">
                {coin.symbol}
              </span>
              <span className="text-lg font-bold text-white">
                ${coin.current_price.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-[#bfa233]">
                +{coin.price_change_percentage_24h.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
