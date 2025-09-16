import { useState, useEffect } from "react";

const PLAN_LIMITS = {
  starter: { min: 10, max: 500 },
  pro: { min: 501, max: 5000 },
  premium: { min: 5001, max: 50000 }
};

export default function Investment() {
  // BASE_URL from .env
  const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';
  // Wallet and investment balance state
  const [walletBalance, setWalletBalance] = useState(0);
  const [investmentBalance, setInvestmentBalance] = useState(0);
  const [userId, setUserId] = useState(null);
  const [plan, setPlan] = useState("");
  const [amount, setAmount] = useState("");
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Get userId from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserId(payload.id);
      } catch (e) {}
    }
  }, []);

  // Fetch balances from backend every minute
  useEffect(() => {
    if (!userId) return;
    const fetchBalances = async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/balances`);
      const data = await res.json();
      setWalletBalance(data.balance );
      setInvestmentBalance(data.investmentBalance);
    };
    fetchBalances();
    const interval = setInterval(fetchBalances, 60000);
    return () => clearInterval(interval);
  }, [userId, BASE_URL]);
  // ROI logic: increase balance every minute according to ROI

  useEffect(() => {
    if (!userId) return;
    const fetchBalances = async () => {
      const res = await fetch(`${BASE_URL}/api/users/${userId}/balances`);
      const data = await res.json();
      console.log(`Synced balances: Wallet $${data.balance}, Investment $${data.investmentBalance}`);
    };
    const interval = setInterval(fetchBalances, 60000);
    return () => clearInterval(interval);
  }, [userId, BASE_URL]);
  
  useEffect(() => {
    const fetchInvestments = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/api/investment`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setInvestments(data);
    };
    fetchInvestments();
  }, [BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/api/investment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ plan, amount })
    });
    const data = await res.json();
    if (res.ok) {
      setPlan("");
      setAmount("");
      setInvestments([data.investment, ...investments]);
    } else {
      alert(data.message || "Something went wrong");
    }
    setLoading(false);
    setOpen(false);
  };
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-300">Wallet Balance:</span>
          <span className="text-green-400 text-lg">{Number(walletBalance).toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-semibold text-gray-300">Investment Balance:</span>
          <span className="text-yellow-400 text-lg">{Number(investmentBalance).toFixed(2)}</span>
        </div>
      </div>
      <button
        onClick={() => setOpen(true)}
        className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold mb-6"
      >
        New Investment
      </button>

      {/* Popup Modal */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-lg relative w-full max-w-md">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-lg font-semibold mb-4 text-black">Invest in a Plan</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
              <div>
                <label className="block text-sm font-medium">Plan</label>
                <select value={plan} onChange={e => setPlan(e.target.value)} required className="w-full border rounded-lg p-2 mt-1">
                  <option value="">Select Plan</option>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="premium">Premium</option>
                </select>
                {plan && (
                  <p className="text-xs text-gray-400 mt-1">Min: ${PLAN_LIMITS[plan].min}, Max: ${PLAN_LIMITS[plan].max}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Amount</label>
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required min={plan ? PLAN_LIMITS[plan].min : 1} max={plan ? PLAN_LIMITS[plan].max : 100000} className="w-full border rounded-lg p-2 mt-1" placeholder="Enter amount" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-lg bg-yellow-400 text-black hover:bg-yellow-500 font-semibold" disabled={loading}>{loading ? "Investing..." : "Invest"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <hr className="my-8" />
      <h3 className="text-lg font-semibold mb-4">Your Investments</h3>
      <ul className="space-y-3">
        {(Array.isArray(investments) ? investments : []).map(inv => (
          <li key={inv.id} className="bg-[#0F1629] p-4 rounded-xl text-white flex justify-between items-center">
            <span>{inv.plan?.charAt(0).toUpperCase() + inv.plan?.slice(1)}: ${inv.amount}</span>
            <span className="text-xs text-gray-400">Next ROI: {inv.created_at ? new Date(new Date(inv.created_at).getTime() + 24*60*60*1000).toLocaleString() : "-"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
