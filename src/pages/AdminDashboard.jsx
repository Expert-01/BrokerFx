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
    <div>
      <h1>Admin Dashboard</h1>
      <h2>User Deposits</h2>
      <ul>
        {deposits.map((deposit) => (
          <li key={deposit.id}>
            User: {deposit.user_id}, Amount: {deposit.amount}
            <button onClick={() => handleApprove(deposit.id)}>Approve</button>
            <button onClick={() => handleReject(deposit.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
