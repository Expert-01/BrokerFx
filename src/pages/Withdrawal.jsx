import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";

const Withdrawal = () => {
  const [methods, setMethods] = useState([]);
  const [form, setForm] = useState({ amount: "", method: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch available methods (replace with your API if you have one)
  useEffect(() => {
    // Example static methods; replace with fetch("/api/methods") if dynamic
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
    const token = localStorage.getItem("token"); // assuming you store JWT here

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/withdraw`, {
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

    const text = await response.text(); // safer read
    const data = text ? JSON.parse(text) : {}; // only parse if not empty

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
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-6 md:ml-56 w-full">
        <div className="w-full max-w-3xl p-8 bg-gradient-to-br from-brown-800/70 to-brown-700/50 backdrop-blur-md rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-yellow-400 text-center">
            Withdraw Funds
          </h1>

          {message && <div className="text-green-400 text-center">{message}</div>}
          {error && <div className="text-red-400 text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="amount" className="text-yellow-200 font-semibold mb-1">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="p-3 rounded-md bg-brown-900 text-yellow-100 placeholder-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="method" className="text-yellow-200 font-semibold mb-1">
                Withdrawal Method
              </label>
              <select
                name="method"
                id="method"
                value={form.method}
                onChange={handleChange}
                className="p-3 rounded-md bg-brown-900 text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-md hover:bg-yellow-300 transition-colors duration-200"
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
