import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Deposit from "./Deposit";
export default function Wallet() {
        const [user, setUser] = useState(null);
      
        useEffect(() => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
              const decoded = jwtDecode(token);
              // Fetch latest user info from backend
              fetch(`http://localhost:5000/api/users/${decoded.id}`)
                .then(res => res.json())
                .then(data => setUser(data))
                .catch(() => setUser(decoded));
            } catch (err) {
              console.error("Invalid token:", err.message);
            }
          }
        }, []);
  return (
  <div className="p-6 min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Wallet</h1>

      {/* Balance Card */}
  <div className="bg-black p-6 rounded-xl border border-[#222] mb-6">
        <h2 className="text-gray-400">Current Balance</h2>
        <p className="text-3xl font-bold text-yellow-400 mt-2">${Number(user?.balance).toFixed(2)}</p>
      </div>

      {/* Deposit / Withdraw Buttons */}
      <div className="flex gap-4 mb-6">
        <button className="flex-1 bg-yellow-400 text-black py-2 rounded-lg font-semibold">
          <Deposit />
        </button>
        <button className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold">
          Withdraw
        </button>
      </div>

      {/* Transactions */}
  <div className="bg-black p-6 rounded-xl border border-[#222]">
        <h2 className="text-gray-400 mb-4">Recent Wallet Transactions</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Deposit - BTC</span>
            <span className="text-green-400">+ $1,000</span>
          </li>
          <li className="flex justify-between">
            <span>Withdrawal - ETH</span>
            <span className="text-red-400">- $500</span>
          </li>
        </ul>
      </div>
    </div>
  );
}