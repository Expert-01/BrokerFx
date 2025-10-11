import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";

const Withdrawal = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "", details: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setMethods(["USDT Wallet", "Bank Transfer", "Crypto Wallet"]);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

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
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#030303] text-[#f5e8c7]">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center px-4 md:px-10 py-10 md:ml-56 w-full">
        <div className="w-full max-w-3xl p-10 bg-gradient-to-br from-[#0d0d0d]/90 to-[#1a1a1a]/90 backdrop-blur-md rounded-2xl border border-[#d4af37]/30 shadow-[0_0_25px_rgba(212,175,55,0.15)] space-y-8">
          
          <h1 className="text-3xl font-bold text-center text-[#d4af37]">
            Withdraw Funds
          </h1>

          {message && <div className="text-center text-[#88d498] font-medium">{message}</div>}
          {error && <div className="text-center text-[#e57373] font-medium">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Field */}
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

            {/* Method Field */}
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
                <option value="" disabled>
                  Select a method
                </option>
                {methods.map((m, idx) => (
                  <option key={idx} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Withdrawal Details */}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-semibold py-3 rounded-lg hover:from-[#e0c05a] hover:to-[#c9a227] transition-all duration-300 disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Withdrawal"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Withdrawal;
