import React, { useState, useEffect } from "react";
import { Copy } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";

const Withdrawal = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loadingWithdrawals, setLoadingWithdrawals] = useState(true);
  const [showNotice, setShowNotice] = useState(false);
  const [copied, setCopied] = useState(false);

  // ✅ Fetch withdrawal methods and user withdrawals on load
  useEffect(() => {
    setMethods(["USDT Wallet", "Bank Transfer", "Crypto Wallet"]);
    fetchWithdrawals();
  }, []);

  // ✅ Function to fetch user's withdrawals
  const fetchWithdrawals = async () => {
    try {
      setLoadingWithdrawals(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/withdrawals`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : [];

      if (!response.ok) throw new Error(data.message || "Failed to fetch withdrawals");
      setWithdrawals(data.withdrawals || []);
    } catch (err) {
      console.error("Error fetching withdrawals:", err);
      setError(err.message);
    } finally {
      setLoadingWithdrawals(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("support@nexa-exchange.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit withdrawal request
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(form.amount),
          method: form.method,
          details: form.details,
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) throw new Error(data.message || "Error submitting request");

      setMessage(data.message || "Withdrawal submitted successfully");
      setForm({ amount: "", method: "", details: "" });

      // ✅ Refetch withdrawals after successful submission
      fetchWithdrawals();

      // ✅ Show notice popup after 1 second
      setTimeout(() => setShowNotice(true), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030303] text-[#f5e8c7] relative">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center px-4 md:px-10 py-10 md:ml-56 w-full">
        <div className="w-full max-w-3xl p-10 bg-gradient-to-br from-[#0d0d0d]/90 to-[#1a1a1a]/90 backdrop-blur-md rounded-2xl border border-[#d4af37]/30 shadow-[0_0_25px_rgba(212,175,55,0.15)] space-y-8">
          <h1 className="text-3xl font-bold text-center text-[#d4af37]">
            Withdraw Funds
          </h1>

          {message && <div className="text-center text-[#88d498] font-medium">{message}</div>}
          {error && <div className="text-center text-[#e57373] font-medium">{error}</div>}

          {/* 🟡 Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-sm font-medium text-[#f5e8c7]/80 mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="p-3 rounded-lg bg-[#0c0c0c] text-[#f5e8c7] placeholder-[#a8a8a8]/60 border border-[#d4af37]/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="method" className="text-sm font-medium text-[#f5e8c7]/80 mb-2">
                Withdrawal Method
              </label>
              <select
                name="method"
                id="method"
                value={form.method}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#0c0c0c] text-[#f5e8c7] border border-[#d4af37]/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
                required
              >
                <option value="" disabled>Select a method</option>
                {methods.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="details" className="text-sm font-medium text-[#f5e8c7]/80 mb-2">
                Withdrawal Details
              </label>
              <textarea
                name="details"
                id="details"
                value={form.details}
                onChange={handleChange}
                placeholder="Enter your wallet address, account number, or other details"
                className="p-3 rounded-lg bg-[#0c0c0c] text-[#f5e8c7] placeholder-[#a8a8a8]/60 border border-[#d4af37]/20 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/40"
                rows="3"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-semibold py-3 rounded-lg hover:from-[#e0c05a] hover:to-[#c9a227] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Withdrawal"}
            </button>
          </form>

          {/* 🟢 Recent Withdrawals */}
          <div className="pt-6 border-t border-[#d4af37]/20">
            <h2 className="text-xl font-semibold mb-4 text-[#d4af37]">Recent Withdrawals</h2>

            {loadingWithdrawals ? (
              <p className="text-center text-[#a8a8a8]">Loading withdrawals...</p>
            ) : withdrawals.length > 0 ? (
              <div className="space-y-3">
                {withdrawals.map((w) => (
                  <div
                    key={w.id}
                    className="flex justify-between items-center p-3 rounded-lg bg-[#0c0c0c] border border-[#d4af37]/20"
                  >
                    <div>
                      <p className="font-semibold text-[#f5e8c7]">-${parseFloat(w.amount).toFixed(2)}</p>
                      <p className="text-sm text-[#a8a8a8]">
                        {w.method} • {new Date(w.created_at).toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`font-medium ${
                        w.status === "Approved"
                          ? "text-green-400"
                          : w.status === "Rejected"
                          ? "text-red-400"
                          : "text-yellow-400 animate-pulse"
                      }`}
                    >
                      {w.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-[#a8a8a8]">No withdrawals yet</p>
            )}
          </div>
        </div>
      </main>

      {/* 🟡 Notice Modal */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-[#0d0d0d] border border-[#d4af37]/30 rounded-2xl p-8 max-w-md text-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <h2 className="text-xl font-semibold text-[#d4af37] mb-4">
              Important Notice
            </h2>
            <p className="text-[#f5e8c7]/90 mb-4 leading-relaxed">
              Due to the large funds detected in your balance, please contact{" "}
              <span
                onClick={handleCopy}
                className="text-[#d4af37] font-medium underline cursor-pointer"
              >
                support@nexa-exchange.com
              </span>{" "}
              within the next 24 hours to confirm your withdrawal request.
            </p>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 mx-auto bg-[#d4af37]/20 hover:bg-[#d4af37]/30 text-[#f5e8c7] px-4 py-2 rounded-lg transition-all"
            >
              <Copy size={18} />
              {copied ? "Copied!" : "Copy Email"}
            </button>

            <button
              onClick={() => setShowNotice(false)}
              className="mt-4 text-sm text-[#a8a8a8] hover:text-[#d4af37] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdrawal;
