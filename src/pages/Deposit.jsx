import React, { useState } from "react";

export default function TopUp() {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ plan, amount, method }),
      });

      const data = await res.json();
      console.log("Deposit response:", data);

      if (res.ok) {
        alert("Deposit request submitted successfully!");
        setOpen(false);
        setPlan("");
        setAmount("");
        setMethod("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Server error");
    }
  };

  return (
    <div className="">
      {/* Deposit Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-black border border-[#222] text-[#778] px-4 py-2 rounded-lg font-semibold"
      >
        Deposit
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#444] w-[80%] max-w-md text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">New Deposit</h2>

            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              {/* Investment Plan */}
              <div>
                <label className="block text-sm font-medium">Investment Plan</label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 mt-1 text-black"
                >
                  <option value="">Select Plan</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  min="1"
                  className="w-full border rounded-lg p-2 mt-1"
                  placeholder="Enter amount"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium">Payment Method</label>
                <select
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  required
                  className="w-full border rounded-lg p-2 mt-1 text-black"
                >
                  <option value="">Choose Method</option>
                  <option value="usdt">USDT (Digital Assets)</option>
                  <option value="card">Card Payment</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

