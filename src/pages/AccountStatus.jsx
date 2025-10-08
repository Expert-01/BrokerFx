import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

const AccountStatus = () => {
  // Sample account data (replace with real API later)
  const account = {
    balance: 1250.75,
    level: "Silver",
    totalTrades: 48,
    activeInvestments: 5,
    profitLoss: 320.5,
  };

  return (
    <div className="min-h-screen flex bg-black-100">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-6 md:ml-56 w-full">
        <div className="w-full max-w-5xl space-y-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-4 text-center">
            Account Status
          </h1>

          {/* Account Summary Card */}
          <div className="bg-gradient-to-br from-brown-800/80 to-brown-700/60 backdrop-blur-md p-6 rounded-xl shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold text-yellow-300">Summary</h2>
            <div className="grid md:grid-cols-2 gap-4 text-yellow-200">
              <div>
                <p className="font-semibold">Current Balance</p>
                <p>${account.balance.toLocaleString()}</p>
              </div>
              <div>
                <p className="font-semibold">Account Level</p>
                <p>{account.level}</p>
              </div>
              <div>
                <p className="font-semibold">Total Trades</p>
                <p>{account.totalTrades}</p>
              </div>
              <div>
                <p className="font-semibold">Active Investments</p>
                <p>{account.activeInvestments}</p>
              </div>
              <div>
                <p className="font-semibold">Profit / Loss</p>
                <p>${account.profitLoss.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Progress / Level Card */}
          <div className="bg-gradient-to-br from-brown-800/70 to-brown-700/50 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-4">Trading Progress</h2>
            <p className="text-yellow-200 mb-2">Level Progress</p>
            <div className="w-full bg-black/30 rounded-full h-4 mb-4 overflow-hidden">
              <div
                className="h-4 rounded-full bg-yellow-400 transition-all duration-500"
                style={{ width: "65%" }}
              ></div>
            </div>
            <p className="text-yellow-300 text-sm">
              You are 65% towards the next account level.
            </p>
          </div>

          {/* Alerts / Notifications Card */}
          <div className="bg-gradient-to-br from-brown-800/60 to-brown-700/40 backdrop-blur-md p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-yellow-300 mb-2">Recent Alerts</h2>
            <ul className="text-yellow-200 space-y-2">
              <li>✅ Deposit of $500 confirmed.</li>
              <li>⚠️ Withdrawal request pending approval.</li>
              <li>📈 New investment opportunity available.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AccountStatus;
