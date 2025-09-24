import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function makeDeposit({ userId, plan, amount, method, token }) {
  const res = await axios.post(
    `${API_BASE}/deposit`,
    { plan, amount, method },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
}
