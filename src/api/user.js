import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchUserBalance(userId) {
  const res = await axios.get(`${API_BASE}/users/${userId}/balance`);
  return res.data;
}
