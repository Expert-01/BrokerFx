import React, { useState } from "react";
import DepositModal from "./DepositModal";

const AccountOverview = ({ userId }) => {
  const [depositOpen, setDepositOpen] = useState(false);

  const handleDepositSuccess = () => {
    // refresh account details after deposit if needed
    console.log("Deposit successful!");
  };

  return (
    <section className="p-6 bg-[#0d0f15] rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-[#d4af37] mb-4 font-orbitron">
        Account Overview
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Account Number */}
        <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
          <span className="text-xs text-gray-400 mb-1">Account #</span>
          <span className="text-lg font-bold">123456</span>
        </div>

        {/* Balance */}
        <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
          <span className="text-xs text-gray-400 mb-1">Balance</span>
          <span className="text-lg font-bold">$10,000</span>
        </div>

        {/* Status */}
        <div className="flex flex-col items-center bg-black border border-[#181a20] rounded-xl p-4 shadow-lg">
          <span className="text-xs text-gray-400 mb-1">Status</span>
          <span className="text-lg font-bold text-green-400">Active</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => setDepositOpen(true)}
          className="glass-radial-btn px-6 py-2 rounded-xl font-bold relative overflow-hidden"
        >
          <span className="relative z-10">Deposit</span>
          <span className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></span>
        </button>

        <button className="glass-radial-btn px-6 py-2 rounded-xl font-bold relative overflow-hidden">
          <span className="relative z-10">Withdraw</span>
          <span className="absolute inset-0 bg-white opacity-10 rounded-xl pointer-events-none"></span>
        </button>
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
