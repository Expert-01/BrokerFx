import React, { useState } from "react";
import { makeWithdrawal } from "../../api/withdraw";

export default function WithdrawModal({ open, onClose, userId, onSuccess }) {
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      console.log("Submitting withdrawal:", { amount, method, userId, token });
      await makeWithdrawal({ userId, amount: Number(amount), method, token });
      setLoading(false);
      onSuccess?.();
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err?.response?.data?.message || "Withdrawal failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <form onSubmit={handleSubmit} className="bg-[#181a20] p-6 rounded-xl w-80 flex flex-col gap-4 shadow-lg">
        <div className="text-lg font-bold text-[#bfa233] mb-2">Withdraw Funds</div>
        <label className="text-xs text-white">Amount
          <input type="number" min="1" step="any" value={amount} onChange={e => setAmount(e.target.value)} className="w-full mt-1 p-2 rounded bg-[#23272f] text-white" required />
        </label>
        <label className="text-xs text-white">Method
          <select value={method} onChange={e => setMethod(e.target.value)} className="w-full mt-1 p-2 rounded bg-[#23272f] text-white">
            <option value="bank">Bank Transfer</option>
            <option value="crypto">Crypto</option>
            <option value="card">Card</option>
          </select>
        </label>
        {error && <div className="text-xs text-red-400">{error}</div>}
        <div className="flex gap-2 mt-2">
          <button type="button" onClick={onClose} className="flex-1 py-2 rounded bg-[#23272f] text-white font-bold">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 py-2 rounded bg-[#bfa233] text-black font-bold disabled:opacity-60">{loading ? "Withdrawing..." : "Withdraw"}</button>
        </div>
      </form>
    </div>
  );
}
