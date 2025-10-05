import React, { useState, useEffect } from "react";
import { fetchUserBalance } from "../../api/user";
import DepositModal from "./DepositModal";

const AccountOverview = ({ userId }) => {
  const [depositOpen, setDepositOpen] = useState(false);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleDepositSuccess = () => getBalance();

  const getBalance = async () => {
    setLoading(true);
    try {
      const data = await fetchUserBalance(userId);
      setBalance(data?.balance ?? 0);
    } catch {
      setBalance(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userId) getBalance();
  }, [userId]);

  return (
    <section className="border border-[#181a20] text-white p-6 sm:p-10 rounded-2xl shadow-2xl mb-10 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[80%] mx-auto bg-black/60 backdrop-blur-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-3">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#d4af37] tracking-wide">
          Account Overview
        </h2>
        <span className="border border-[#d4af37]/40 text-yellow-400 px-4 py-1 rounded-full text-xs font-semibold">
          Active
        </span>
      </div>

      {/* Account Info Grid 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {[
          { label: "Platform", value: "MT5", color: "text-yellow-400" },
          { label: "Account #", value: "123456" },
          { label: "Nickname", value: "account1" },
          {
            label: "Balance",
            value: loading ? "Loading..." : `$${Number(balance).toFixed(2)} USD`,
            color: "text-yellow-400",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-[#0d0d0d]/70 border border-[#2a2a2a] rounded-xl p-6 sm:p-8 w-full shadow-lg hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            <span className="text-sm text-gray-400 mb-1">{item.label}</span>
            <span className={`text-lg font-bold ${item.color || ""}`}>
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Account Info Grid 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
        {[
          { label: "Free Balance", value: "$0.00 USD" },
          { label: "Equity", value: "$0.00 USD" },
          { label: "Open P/L", value: "$0.00 USD" },
          { label: "Net Credit", value: "$0.00 USD" },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center bg-[#181a20] border border-[#2a2a2a] rounded-xl p-6 sm:p-8 w-full shadow-lg hover:border-yellow-500/40 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
          >
            <span className="text-sm text-gray-400 mb-1">{item.label}</span>
            <span className="text-lg font-bold">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-end w-full">
        {[
          { label: "Deposit", action: () => setDepositOpen(true) },
          { label: "Log In" },
          { label: "Add Demo Account" },
        ].map((btn, i) => (
          <button
            key={i}
            onClick={btn.action}
            className="relative overflow-hidden px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 border border-yellow-500/30 shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all duration-300"
          >
            <span className="relative z-10">{btn.label}</span>
            <span className="absolute inset-0 bg-yellow-400/10 rounded-xl blur-md"></span>
          </button>
        ))}
      </div>

      {/* Deposit Modal */}
      {depositOpen && (
        <DepositModal
          open={depositOpen}
          onClose={() => setDepositOpen(false)}
          userId={userId}
          onSuccess={handleDepositSuccess}
        />
      )}
    </section>
  );
};

export default AccountOverview;
