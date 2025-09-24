import React, { useState, useEffect } from "react";
import BalanceHistoryChart from "./BalanceHistoryChart";
import { fetchBalanceHistory } from "../../api/balanceHistory";
import { fetchUserBalance } from "../../api/user";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";

export default function MobileBalanceCard({ userId }) {
  const [chartData, setChartData] = useState([]);
  const [range, setRange] = useState("1M");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);

  const refreshChart = () => {
    if (!userId) return;
    setLoading(true);
    fetchBalanceHistory(userId, range)
      .then((data) => {
        let arr = Array.isArray(data) ? data : [];
        arr = arr.filter((d) => d && typeof d.x !== "undefined" && typeof d.y !== "undefined");
        setChartData(arr);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    refreshChart();
    // eslint-disable-next-line
  }, [userId, range]);

  const refreshBalance = () => {
    if (!userId) {
      console.log("[BalanceCard] No userId provided");
      return;
    }
    setBalanceLoading(true);
    fetchUserBalance(userId)
      .then((data) => {
        console.log(`[BalanceCard] userId:`, userId, "API response:", data);
        setBalance(data.balance);
      })
      .catch((err) => {
        console.error(`[BalanceCard] Error fetching balance for userId`, userId, err);
      })
      .finally(() => setBalanceLoading(false));
  };
  useEffect(() => {
    refreshBalance();
    // eslint-disable-next-line
  }, [userId]);

  const ranges = ["1D", "1W", "1M", "3M", "1Y"];

  return (

    <div className="">
      <span className="text-2xl font-semibold md:mb-9 text-gray-400 hidden md:block">Dashboard</span>

  <div className="bg-[#111216] rounded-2xl md:px-9 md:py-12 p-4 md:mt-9 mb-2">

      <div className="text-xl font-semibold text-gray-400 mb-4">Total Balance</div>
      <div className="text-3xl font-bold text-white mb-1 py-4">
        {balanceLoading ? (
          <span className="text-[#bfa233] text-base">Loading...</span>
        ) : balance !== null && !isNaN(Number(balance)) ? (
          `$${Number(balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
        ) : (
          "-"
        )}
      </div>
      <div className="text-green-400 text-xs font-semibold mb-2">+5.23% today</div>
      <div className="w-full h-16 flex items-center justify-center">
        {loading ? (
          <div className="w-full h-12 flex items-center justify-center text-[#bfa233] text-xs">Loading...</div>
        ) : (
          <BalanceHistoryChart data={chartData} type="line" />
        )}
      </div>
      <div className="flex gap-2 mt-2">
        {ranges.map((t) => (
          <button
            key={t}
            className={`px-2 py-1 rounded text-xs font-bold transition-colors duration-150 ${
              range === t
                ? "bg-[#bfa233] text-black"
                : "bg-[#181a20] text-[#bfa233] hover:bg-[#bfa233]/20"
            }`}
            onClick={() => setRange(t)}
          >
            {t}
          </button>
        ))}
      </div>
    </div>

    </div>
  );
}
