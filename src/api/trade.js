import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function placeTrade({ asset, type, amount, takeProfit, stopLoss, token }) {
  return axios.post(
    `${API_BASE}/trades/open`,
    { asset, type, amount, takeProfit, stopLoss },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function closeTrade({ id, token }) {
  return axios.post(
    `${API_BASE}/trades/close/${id}`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
}

export async function fetchOpenTrades(token) {
  const res = await axios.get(`${API_BASE}/trades/open`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function fetchTradeHistory(token) {
  const res = await axios.get(`${API_BASE}/trades/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
