import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";

const Withdrawal = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "" });
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
        }),
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) throw new Error(data.message || "Error submitting request");

      setMessage(data.message || "Withdrawal submitted successfully");
      setForm({ amount: "", method: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0b0a09] text-[#e0d7c6]">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center px-4 md:px-10 py-10 md:ml-56 w-full">
        <div className="w-full max-w-3xl p-10 bg-gradient-to-br from-[#2a1f1a]/70 to-[#1c1410]/60 backdrop-blur-lg rounded-2xl border border-[#4a3b31]/40 shadow-[0_0_20px_rgba(0,0,0,0.5)] space-y-8">
          
          <h1 className="text-3xl font-bold text-center text-[#d8c3a5]">
            Withdraw Funds
          </h1>

          {message && <div className="text-center text-[#88d498]">{message}</div>}
          {error && <div className="text-center text-[#e57373]">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Amount Field */}
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-sm font-medium text-[#c9b89a] mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="p-3 rounded-lg bg-[#1a1410] text-[#e0d7c6] placeholder-[#a8957b]/60 border border-[#4a3b31]/40 focus:outline-none focus:ring-2 focus:ring-[#a8957b]/40"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Method Field */}
            <div className="flex flex-col">
              <label htmlFor="method" className="text-sm font-medium text-[#c9b89a] mb-2">
                Withdrawal Method
              </label>
              <select
                name="method"
                id="method"
                value={form.method}
                onChange={handleChange}
                className="p-3 rounded-lg bg-[#1a1410] text-[#e0d7c6] border border-[#4a3b31]/40 focus:outline-none focus:ring-2 focus:ring-[#a8957b]/40"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#a8957b] text-[#1a1410] font-semibold py-3 rounded-lg hover:bg-[#bca888] transition-all duration-200 disabled:opacity-60"
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
