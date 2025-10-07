import React, { useState, useEffect } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { jwtDecode } from "jwt-decode";
import AOS from "aos";
import "aos/dist/aos.css";

function Deposit() {
  const [method, setMethod] = useState("crypto");
  const [asset, setAsset] = useState("btc");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedDetails, setSelectedDetails] = useState(null);

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Decode token for userId
  let userId = null;
  let token = null;
  try {
    token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.id || decoded.userId;
    }
  } catch {
    userId = null;
  }

  // Fetch payment methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/payment-methods/public`
        );
        if (!res.ok) throw new Error("Failed to load payment methods");
        const data = await res.json();
        setPaymentMethods(data);
      } catch (err) {
        console.error(err);
        setError("Unable to fetch payment methods. Please try again later.");
      }
    };
    fetchMethods();
  }, []);

  // Update selected method details
  useEffect(() => {
    const details = paymentMethods.find(
      (m) => m.method.toLowerCase() === method.toLowerCase()
    );
    setSelectedDetails(details || null);
  }, [method, paymentMethods]);

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
    <div className="w-full h-screen flex flex-row bg-[#111216] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Payment methods list */}
        <div
          className="flex md:flex-col gap-2 p-2 md:p-6 md:w-64 bg-[#111216] overflow-x-auto md:overflow-y-auto"
          data-aos="fade-right"
        >
          {paymentMethods.map((m) => (
            <button
              key={m.method}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg font-semibold text-sm md:text-lg transition-all duration-200 flex-1 md:flex-none justify-center md:justify-start border-2 border-transparent ${
                method === m.method.toLowerCase()
                  ? "bg-[#bfa233] text-black border-[#bfa233] shadow"
                  : "bg-[#181a20] text-[#bfa233] hover:bg-[#23272f]"
              }`}
              onClick={() => setMethod(m.method.toLowerCase())}
              disabled={loading}
            >
              <span>{m.icon || "💰"}</span>
              <span>{m.method}</span>
            </button>
          ))}
        </div>

        {/* Deposit Form */}
        <main className="flex-1 flex justify-center items-start md:items-center p-4 md:p-8 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-[#181a20] rounded-xl shadow-lg p-6 md:p-8"
            data-aos="fade-up"
          >
            <h2
              className="text-xl md:text-2xl font-bold mb-6 text-[#bfa233]"
              data-aos="fade-down"
            >
              Deposit
            </h2>

            {success && (
              <div
                className="mb-4 text-green-400 text-center font-semibold"
                data-aos="fade-in"
              >
                {success}
              </div>
            )}
            {error && (
              <div
                className="mb-4 text-red-400 text-center font-semibold"
                data-aos="fade-in"
              >
                {error}
              </div>
            )}

            {/* Payment method details */}
            {selectedDetails && (
              <div
                className="mb-6 p-3 rounded-lg bg-[#23272f] text-sm text-gray-300"
                data-aos="fade-in"
              >
                {selectedDetails.method.toLowerCase() === "crypto" ? (
                  <>
                    <p>
                      <span className="font-semibold text-[#bfa233]">Asset:</span>{" "}
                      {asset.toUpperCase()}
                    </p>
                    <p>
                      <span className="font-semibold text-[#bfa233]">Wallet:</span>{" "}
                      {selectedDetails.wallet_address || "Not provided"}
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <span className="font-semibold text-[#bfa233]">Details:</span>{" "}
                      {selectedDetails.details || "Not provided"}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Instruction before amount */}
            <p
              className="text-gray-400 text-sm mb-2"
              data-aos="fade-in"
              data-aos-delay="100"
            >
              Input the amount you wish to deposit.
            </p>

            {/* Amount input */}
            <label
              className="block mb-2 text-sm font-semibold text-gray-300"
              data-aos="fade-in"
            >
              Amount
            </label>
            <input
              className="w-full mb-3 p-3 rounded-lg bg-[#23272f] text-white border-none focus:ring-2 focus:ring-[#bfa233]"
              placeholder="Enter deposit amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              type="number"
              min="1"
              step="any"
              required
              data-aos="fade-in"
              data-aos-delay="150"
            />

            {/* Deposit warning text */}
            <p
              className="text-xs text-gray-400 mb-4"
              data-aos="fade-in"
              data-aos-delay="200"
            >
              Make a deposit of the exact amount to the exact details provided above
              to prevent loss of funds.
            </p>

            {/* Deposit confirmation instruction */}
            <p
              className="text-xs text-gray-400 mb-6"
              data-aos="fade-in"
              data-aos-delay="250"
            >
              When you have made your deposit, click{" "}
              <span className="text-[#bfa233] font-semibold">“I Have Paid”</span> and
              your deposit will be reviewed and added to your balance.
            </p>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-[#bfa233] text-black font-bold text-lg hover:bg-[#bfa233]/70 transition disabled:opacity-60"
              disabled={loading}
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {loading ? "Processing..." : "I Have Paid"}
            </button>
          </form>
        </main>
      </div>
    </div>
  );
}

export default Deposit;
