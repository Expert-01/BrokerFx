import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL; // from .env

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(`${API_URL}/api/admin/deposits`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch deposits: ${response.status}`);
        }

        const data = await response.json();

        // Handle both array and object style responses
        setDeposits(Array.isArray(data) ? data : data.deposits || []);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };

    fetchDeposits();
  }, []);

  // Approve deposit
  const handleApprove = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/deposits/${id}/approve`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve deposit");
      }

      setDeposits((prev) => prev.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Error approving deposit:", error);
    }
  };

  // Reject deposit
  const handleReject = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/admin/deposits/${id}/reject`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject deposit");
      }

      setDeposits((prev) => prev.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <h2>User Deposits</h2>
      {deposits.length === 0 ? (
        <p>No pending deposits.</p>
      ) : (
        <ul>
          {deposits.map((deposit) => (
            <li key={deposit.id}>
              User: {deposit.user_id}, Amount: {deposit.amount} ({deposit.method})
              <button onClick={() => handleApprove(deposit.id)}>Approve</button>
              <button onClick={() => handleReject(deposit.id)}>Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
