import { useEffect, useState } from "react";
    const AdminDashboard = () => {
    const [deposits, setDeposits] = useState([]);
    useEffect(() => {
        const fetchDeposits = async () => {
            const response = await fetch(`http://localhost:5000/api/admin/deposits`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();
            setDeposits(data);
        };

        fetchDeposits();
    }, []);

    const handleApprove = async (id) => {
        await fetch(`http://localhost:5000/api/admin/deposits/${id}/approve`, { method: "PUT" });
        setDeposits(deposits.filter((deposit) => deposit.id !== id));

        // Fetch and update user info after approval
        // You may want to trigger a global user update here if you use context
        // Example: fetch user info for the affected user
        // const response = await fetch(`http://localhost:5000/api/users/${userId}`);
        // const updatedUser = await response.json();
        // setUser(updatedUser); // If you use a global user state
    };

    const handleReject = async (id) => {
        await fetch(`http://localhost:5000/api/admin/deposits/${id}/reject`, { method: "POST" });
        setDeposits(deposits.filter((deposit) => deposit.id !== id));
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
