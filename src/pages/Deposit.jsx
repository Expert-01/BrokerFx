import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { jwtDecode } from "jwt-decode";

const paymentMethods = [
  { key: "crypto", label: "Crypto", icon: "🪙" },
  { key: "card", label: "Credit/Debit Card", icon: "💳" },
  { key: "fatoorah", label: "myFatoorah", icon: "F" },
];

const assets = [
  { key: "btc", label: "Bitcoin" },
  { key: "eth", label: "Ethereum" },
  { key: "usdt", label: "USDT" },
];

function Deposit() {
  const [method, setMethod] = useState("crypto");
  const [asset, setAsset] = useState("btc");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Decode token for userId
  let userId = null;
  let token = null;
  try {
    token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId;
    }
  } catch (err) {
    userId = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    if (!userId || !token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    let plan = "basic";
    if (method === "crypto") plan = asset;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan, amount: Number(amount), method }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Deposit failed");
      }
      setSuccess("Deposit request submitted!");
      setAmount("");
    } catch (err) {
      setError(err.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#111216] text-white">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Payment methods */}
        <div className="flex md:flex-col gap-4 p-4 md:p-8 md:w-64">
          {paymentMethods.map((m) => (
            <button
              key={m.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 flex-1 md:flex-none justify-center md:justify-start border-2 border-transparent ${
                method === m.key
                  ? "bg-[#bfa233] text-black border-[#bfa233] shadow"
                  : "bg-[#181a20] text-[#bfa233] hover:bg-[#23272f]"
              }`}
              onClick={() => setMethod(m.key)}
              disabled={loading}
            >
              <span className="text-xl md:text-2xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Deposit Form */}
        <main className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#181a20] rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#bfa233]">Deposit</h2>

            {success && (
              <div className="mb-4 text-green-400 text-center font-semibold">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-400 text-center font-semibold">
                {error}
              </div>
            )}

            {method === "crypto" && (
              <>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Select an asset
                </label>
                <select
                  className="w-full mb-4 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  disabled={loading}
                >
                  {assets.map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder={`e.g. 0.05 ${
                    assets.find((a) => a.key === asset)?.label || ""
                  }`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="0.0001"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#bfa233]/70 transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </>
            )}

            {method === "card" && (
              <>
                <h3 className="text-xl font-bold mb-2 text-[#bfa233]">
                  Credit/Debit Card
                </h3>
                <p className="mb-4 text-gray-400 text-sm">
                  Your deposit will be credited to your trading account within
                  1-2 hours.
                </p>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder="e.g. 50 USD"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="1"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#14e3c7] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </>
            )}

            {method === "fatoorah" && (
              <>
                <h3 className="text-xl font-bold mb-2 text-[#bfa233]">
                  myFatoorah
                </h3>
                <p className="mb-4 text-gray-400 text-sm">
                  Your deposit will be credited to your trading account within
                  1-2 hours.
                </p>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder="e.g. 50 USD"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="1"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#14e3c7] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Deposit;            </button>
          ))}
        </div>

        {/* Deposit Form */}
        <main className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#181a20] rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#bfa233]">Deposit</h2>

            {success && (
              <div className="mb-4 text-green-400 text-center font-semibold">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-400 text-center font-semibold">
                {error}
              </div>
            )}

            {/* CRYPTO */}
            {method === "crypto" && (
              <>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Select an asset
                </label>
                <select
                  className="w-full mb-4 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  disabled={loading}
                >
import React, { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { jwtDecode } from "jwt-decode";

const paymentMethods = [
  { key: "crypto", label: "Crypto", icon: "🪙" },
  { key: "card", label: "Credit/Debit Card", icon: "💳" },
  { key: "fatoorah", label: "myFatoorah", icon: "F" },
];

const assets = [
  { key: "btc", label: "Bitcoin" },
  { key: "eth", label: "Ethereum" },
  { key: "usdt", label: "USDT" },
];

function Deposit() {
  const [method, setMethod] = useState("crypto");
  const [asset, setAsset] = useState("btc");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Decode token for userId
  let userId = null;
  let token = null;
  try {
    token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId;
    }
  } catch (err) {
    userId = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount greater than 0.");
      return;
    }
    if (!userId || !token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    setLoading(true);
    let plan = "basic";
    if (method === "crypto") plan = asset;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/deposit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ plan, amount: Number(amount), method }),
        }
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Deposit failed");
      }
      setSuccess("Deposit request submitted!");
      setAmount("");
    } catch (err) {
      setError(err.message || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-row bg-[#111216] text-white">
      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Payment methods */}
        <div className="flex md:flex-col gap-4 p-4 md:p-8 md:w-64">
          {paymentMethods.map((m) => (
            <button
              key={m.key}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base md:text-lg transition-all duration-200 flex-1 md:flex-none justify-center md:justify-start border-2 border-transparent ${
                method === m.key
                  ? "bg-[#bfa233] text-black border-[#bfa233] shadow"
                  : "bg-[#181a20] text-[#bfa233] hover:bg-[#23272f]"
              }`}
              onClick={() => setMethod(m.key)}
              disabled={loading}
            >
              <span className="text-xl md:text-2xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {/* Deposit Form */}
        <main className="flex-1 flex flex-col items-center justify-start md:justify-center p-4 md:p-8">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#181a20] rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#bfa233]">Deposit</h2>

            {success && (
              <div className="mb-4 text-green-400 text-center font-semibold">
                {success}
              </div>
            )}
            {error && (
              <div className="mb-4 text-red-400 text-center font-semibold">
                {error}
              </div>
            )}

            {method === "crypto" && (
              <>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Select an asset
                </label>
                <select
                  className="w-full mb-4 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  value={asset}
                  onChange={(e) => setAsset(e.target.value)}
                  disabled={loading}
                >
                  {assets.map((a) => (
                    <option key={a.key} value={a.key}>
                      {a.label}
                    </option>
                  ))}
                </select>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder={`e.g. 0.05 ${
                    assets.find((a) => a.key === asset)?.label || ""
                  }`}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="0.0001"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#bfa233]/70 transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </>
            )}

            {method === "card" && (
              <>
                <h3 className="text-xl font-bold mb-2 text-[#bfa233]">
                  Credit/Debit Card
                </h3>
                <p className="mb-4 text-gray-400 text-sm">
                  Your deposit will be credited to your trading account within
                  1-2 hours.
                </p>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder="e.g. 50 USD"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="1"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#14e3c7] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </>
            )}

            {method === "fatoorah" && (
              <>
                <h3 className="text-xl font-bold mb-2 text-[#bfa233]">
                  myFatoorah
                </h3>
                <p className="mb-4 text-gray-400 text-sm">
                  Your deposit will be credited to your trading account within
                  1-2 hours.
                </p>
                <label className="block mb-2 text-sm font-semibold text-gray-300">
                  Amount
                </label>
                <input
                  className="w-full mb-6 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
                  placeholder="e.g. 50 USD"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={loading}
                  type="number"
                  min="1"
                  step="any"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#14e3c7] transition disabled:opacity-60"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Submit"}
                </button>
              </>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}

export default Deposit;
