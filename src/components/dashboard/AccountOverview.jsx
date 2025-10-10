import React, { useEffect, useState } from "react";

export default function AccountOverview({ userId }) {
  const [balance, setBalance] = useState("Loading...");
  const [freeBalance, setFreeBalance] = useState("Loading...");
  const [equity, setEquity] = useState("Loading...");
  const [nickname, setNickname] = useState("Loading...");

  // Fetch user balance from backend
  useEffect(() => {
    if (!userId) return;

    const fetchBalance = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/balance`
        );
        const data = await response.json();
        if (response.ok) {
          setBalance(`$${parseFloat(data.balance).toFixed(2)} USD`);
          setFreeBalance(`$${parseFloat(data.free_balance || 0).toFixed(2)} USD`);
          setEquity(`$${parseFloat(data.equity || 0).toFixed(2)} USD`);
          setNickname(data.nickname || "Account");
        } else {
          setBalance("Error loading");
        }
      } catch (err) {
        console.error(err);
        setBalance("Error loading");
      }
    };

    fetchBalance();
  }, [userId]);

  const stats = [
    { label: "Platform", value: "MT5" },
    { label: "Account #", value: userId || "N/A" },
    { label: "Nickname", value: nickname },
    { label: "Balance", value: balance },
    { label: "Free Balance", value: freeBalance },
    { label: "Equity", value: equity },
    { label: "Open P/L", value: "$0.00 USD" },
    { label: "Net Credit", value: "$0.00 USD" },
  ];

  return (
    <section className="bg-black text-white min-h-screen py-10 px-6 sm:px-12">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="w-[95%] max-w-[1100px] mx-auto border border-white/10 rounded-2xl px-12 py-10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.08)]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-yellow-400">Account Overview</h2>
            <span className="px-4 py-1 border border-yellow-500 text-yellow-400 rounded-full text-sm">
              Active
            </span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full justify-center items-stretch">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-[#14100b]/60 border border-yellow-500/30 rounded-2xl p-6 text-center
                  shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]
                  transition-all duration-300 flex flex-col justify-center items-center"
              >
                <span className="text-xs text-gray-400 mb-1">{item.label}</span>
                <span className="text-sm sm:text-base font-semibold text-yellow-400">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="max-w-sm mx-auto bg-[#0a0a0a] p-7 rounded-3xl shadow-lg border border-white/10">
          {/* Top Portfolio Card */}
          <div className="bg-gradient-to-br from-[#3a2d1a]/60 to-[#1e1409]/70 p-7 rounded-3xl mb-6 text-center backdrop-blur-md border border-yellow-900/30 shadow-[0_0_25px_rgba(80,60,20,0.5)]">
            <p className="text-gray-300 text-sm mb-2">Your Balance</p>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">{balance}</h1>
            <p className="text-green-400 text-xs">+2.5% this month</p>
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#111]/70 p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Free Balance</p>
              <p className="text-base font-semibold text-yellow-400">{freeBalance}</p>
            </div>
            <div className="bg-[#111]/70 p-4 rounded-2xl border border-white/10">
              <p className="text-xs text-gray-400 mb-1">Equity</p>
              <p className="text-base font-semibold text-yellow-400">{equity}</p>
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mb-6">
            <h3 className="text-sm text-gray-400 mb-3">Portfolio</h3>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center bg-[#111]/70 p-4 rounded-2xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">AAPL</p>
                  <p className="text-xs text-gray-400">Apple Inc.</p>
                </div>
                <p className="text-green-400 text-sm font-semibold">+2.5%</p>
              </div>
              <div className="flex justify-between items-center bg-[#111]/70 p-4 rounded-2xl border border-white/10">
                <div>
                  <p className="text-sm font-semibold text-white">POWA</p>
                  <p className="text-xs text-gray-400">Chrome Stock</p>
                </div>
                <p className="text-green-400 text-sm font-semibold">+1.2%</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h3 className="text-sm text-gray-400 mb-3">Recent Transaction</h3>
            <div className="flex justify-between items-center bg-[#111]/70 p-4 rounded-2xl border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">Manulife Cash Fund</p>
                <p className="text-xs text-gray-400">Mutual Funds</p>
              </div>
              <p className="text-green-400 text-sm font-semibold">+2.5%</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
              }
