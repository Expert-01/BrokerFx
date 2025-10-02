import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL; // from .env

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/deposits`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch deposits");
        }

        const data = await response.json();
        setDeposits(data);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };

    fetchDeposits();
  }, []);

  // Approve deposit
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

  // Reject deposit
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
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-5xl mx-auto">
        <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
          User Deposits
        </h2>

        {deposits.length === 0 ? (
          <p className="text-gray-500 text-center py-6">No pending deposits</p>
        ) : (
          <div className="space-y-4">
            {deposits.map((deposit) => (
              <div
                key={deposit.id}
                className="flex flex-col md:flex-row md:items-center justify-between border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-gray-50"
              >
                <div className="mb-3 md:mb-0">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">User ID:</span>{" "}
                    {deposit.user_id}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Plan:</span> {deposit.plan}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Amount:</span> $
                    {deposit.amount}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(deposit.created_at).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApprove(deposit.id)}
                    className="px-4 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(deposit.id)}
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
