import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Profile() {

    const [user, setUser] = useState(null);
    const [investmentBalance, setInvestmentBalance] = useState(0);
      
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
              // Fetch investments and calculate total
              fetch(`http://localhost:5000/api/investment`, {
                headers: { Authorization: `Bearer ${token}` }
              })
                .then(res => res.json())
                .then(data => {
                  const total = Array.isArray(data) ? data.reduce((sum, inv) => sum + Number(inv.amount), 0) : 0;
                  setInvestmentBalance(total);
                });
            } catch (err) {
              console.error("Invalid token:", err.message);
            }
          }
        }, []);
  return (
  <div className="p-6 min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Profile</h1>

      {/* Profile Card */}
  <div className="bg-black p-6 rounded-xl border border-[#222] flex items-center gap-4 mb-6">
        <div className="w-16 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-black font-bold text-xl">
          U
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-400">{user?.email}</p>
        </div>
      </div>

      {/* Account Info */}
  <div className="bg-black p-6 rounded-xl border border-[#222]">
        <h2 className="text-gray-400 mb-4">Account Information</h2>
        <ul className="space-y-3">
          <li className="flex justify-between">
            <span>Full Name</span>
            <span>User Name</span>
          </li>
          <li className="flex justify-between">
            <span>Email</span>
            <span>{user?.email}m</span>
          </li>
          <li className="flex justify-between">
            <span>Joined</span>
            <span>{user?.created_at}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

