import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/deposits`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch deposits");

        const data = await response.json();
        setDeposits(data);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };

    fetchDeposits();
  }, []);

  const handleApprove = async (id) => {
    try {
      await fetch(`${API_URL}/admin/deposits/${id}/approve`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDeposits((prev) => prev.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Error approving deposit:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await fetch(`${API_URL}/admin/deposits/${id}/reject`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDeposits((prev) => prev.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <h2 className="text-xl font-semibold mb-6">User Deposits</h2>

      <div className="space-y-4">
        {deposits.map((deposit) => (
          <div
            key={deposit.id}
            className="bg-gray-800 rounded-xl p-4 flex justify-between items-center shadow-lg"
          >
            <div>
              <p className="text-sm text-gray-400">User ID: {deposit.user_id}</p>
              <p className="text-lg font-medium">Amount: ${deposit.amount}</p>
              <p className="text-xs text-gray-500">Plan: {deposit.plan}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleApprove(deposit.id)}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
              >
                Approve
              </button>
              <button
                onClick={() => handleReject(deposit.id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
