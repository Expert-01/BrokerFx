import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function makeWithdrawal({ userId, amount, method, token }) {
  const res = await axios.post(
    `${API_BASE}/withdraw`,
    { amount, method },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
