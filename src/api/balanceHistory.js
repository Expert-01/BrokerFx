import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchBalanceHistory(userId, range = "1M") {
  const res = await axios.get(`${API_BASE}/balance-history/${userId}?range=${range}`);
  return res.data;
}
