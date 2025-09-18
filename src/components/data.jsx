import React,{ useState, useEffect } from "react";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Button from "@/components/UI/Button.jsx";
import Investment from "../pages/Investment";

export default function HomePage({ user }) {
  const [marketData, setMarketData] = useState([]);

  // Fetch live prices
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,binancecoin&vs_currencies=usd"
        );
        const data = await res.json();
        setMarketData([
          { name: "BTC", price: data.bitcoin.usd },
          { name: "ETH", price: data.ethereum.usd },
          { name: "USDT", price: data.tether.usd },
          { name: "BNB", price: data.binancecoin.usd },
        ]);
      } catch (err) {
        console.error("Error fetching market data:", err);
      }
    }

    fetchMarketData();

    // Auto-refresh every 1 min
    const interval = setInterval(fetchMarketData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Portfolio Pie (dummy for now, later link to user investments)
  const portfolioData = [
    { name: "BTC", value: 50 },
    { name: "ETH", value: 30 },
    { name: "USDT", value: 20 },
  ];
  const COLORS = ["#FBBF24", "#60A5FA", "#34D399"];

  // ROI logic: increase balance every minute according to ROI
  useEffect(() => {
    let roiInterval;
    if (user && user.investments && user.investments.length > 0) {
      roiInterval = setInterval(() => {
        let totalROI = 0;
        user.investments.forEach(inv => {
          let rate = 0;
          if (inv.plan === 'starter') rate = 0.02;
          if (inv.plan === 'pro') rate = 0.05;
          if (inv.plan === 'premium') rate = 0.10;
          totalROI += Number(inv.amount) * rate / (24 * 60); // per minute
        });
        if (totalROI > 0) {
          // Simulate balance update (frontend only)
          user.balance = (Number(user.balance) + totalROI).toFixed(2);
        }
      }, 60000);
    }
    return () => clearInterval(roiInterval);
  }, [user]);

  return (
  <div className="space-y-8 min-h-screen px-2 py-8 bg-black">
       {/* Market Updates */}
  <div className="md:bg-[#232526] p-4 rounded-xl font-orbitron">
  <h2 className="text-xl font-semibold mb-4 font-orbitron">Market Updates (Live)</h2>
  <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-4 md:gap-4 font-azonix">
          {marketData.length > 0 ? (
            marketData.map((coin) => (
              <div key={coin.name} className="min-w-[180px] bg-[#111] p-4 rounded-lg text-center snap-center font-orbitron">
                <p className="text-gray-400 font-orbitron">{coin.name}</p>
                <p className="text-yellow-400 font-bold text-2xl font-orbitron">${coin.price.toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 font-orbitron">Loading prices...</p>
          )}
        </div>
      </div>

      {/* Profile Summary */}

      {/* News / Announcement */}


      {/* Referral Program */}
  <div className="bg-black p-6 rounded-xl border border-[#222] font-orbitron">
  <h2 className="text-xl font-semibold mb-4 font-orbitron">Referral Program</h2>
  <p className="mb-2 text-gray-300 font-orbitron">Invite friends and earn <span className="text-yellow-400 font-bold font-orbitron">5% of their first deposit</span> instantly!</p>
  <div className="flex gap-2 items-center font-orbitron">
          <input
            type="text"
            value={`https://NexaExchange.com/register?ref=${user?.referralCode || 'yourcode'}`}
            readOnly
            className="bg-gray-100 text-yellow-400 px-2 py-1 rounded w-full font-orbitron"
          />
          <Button className="bg-yellow-400 text-black px-4 py-2 rounded font-semibold font-orbitron">Copy</Button>
        </div>
      </div>

              {/* Transactions */}
  <div className="bg-black p-6 rounded-xl mt-8 font-orbitron">
          <h2 className="text-xl font-semibold mb-4 font-orbitron">Recent Transactions</h2>

          <ul className="space-y-3 font-orbitron">
            <li className="flex justify-between font-orbitron">
              <span>Deposit - BTC</span>
              <span className="text-green-400 font-orbitron">+ $1,000</span>
            </li>
            <li className="flex justify-between font-orbitron">
              <span>Withdrawal - BTC</span>
              <span className="text-red-400">- $500</span>
            </li>
                        <li className="flex justify-between">
              <span>Deposit - BTC</span>
              <span className="text-green-400">+ $1,000</span>
            </li>
            <li className="flex justify-between">
              <span>Withdrawal - BTC</span>
              <span className="text-red-400">- $500</span>
            </li>            <li className="flex justify-between">
              <span>Deposit - BTC</span>
              <span className="text-green-400">+ $1,000</span>
            </li>
            <li className="flex justify-between">
              <span>Withdrawal - BTC</span>
              <span className="text-red-400">- $500</span>
            </li>            <li className="flex justify-between">
              <span>Deposit - BTC</span>
              <span className="text-green-400">+ $1,000</span>
            </li>
            <li className="flex justify-between">
              <span>Withdrawal - BTC</span>
              <span className="text-red-400">- $500</span>
            </li>            <li className="flex justify-between">
              <span>Deposit - BTC</span>
              <span className="text-green-400">+ $1,000</span>
            </li>
            <li className="flex justify-between">
              <span>Withdrawal - BTC</span>
              <span className="text-red-400">- $500</span>
            </li>
          </ul>
        <div className="mt-8">
          {/* Investment Section */}
            <h2 className="text-xl font-semibold mb-4">Investments</h2>

          <div className="bg-black p-6 rounded-xl border border-[#222] mt-8">
            <Investment />
          </div>
        </div>

        </div>

      {/* Top Actions */}

      {/* Charts Section */}

    </div>
  );
}