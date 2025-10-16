import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({ method: "", details: "" });
  const [editingMethod, setEditingMethod] = useState(null);

  // Manual balance adjustment states
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [action, setAction] = useState("increase");
  const [message, setMessage] = useState("");

  // Registered Users
  const [users, setUsers] = useState([]);

  // Bot linking/unlinking states
  const [linkUserId, setLinkUserId] = useState("");
  const [linkMessage, setLinkMessage] = useState("");
  const [linkLoading, setLinkLoading] = useState(false);

  const [unlinkUserId, setUnlinkUserId] = useState("");
  const [unlinkMessage, setUnlinkMessage] = useState("");
  const [unlinkLoading, setUnlinkLoading] = useState(false);

  // Fetch pending deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/deposits`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch deposits");
        const data = await res.json();
        setDeposits(data);
      } catch (error) {
        console.error("Error fetching deposits:", error);
      }
    };
    fetchDeposits();
  }, []);

  // Fetch payment methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch(`${API_URL}/payment-methods`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error("Failed to fetch payment methods");
        const data = await res.json();
        setMethods(data);
      } catch (error) {
        console.error("Error fetching methods:", error);
      }
    };
    fetchMethods();
  }, []);

  // Fetch all registered users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/users`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Approve deposit
  const handleApprove = async (id) => {
    try {
      await fetch(`${API_URL}/admin/deposits/${id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDeposits((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error approving deposit:", error);
    }
  };

  // Reject deposit
  const handleReject = async (id) => {
    try {
      await fetch(`${API_URL}/admin/deposits/${id}/reject`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDeposits((prev) => prev.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
  };

  // Add payment method
  const handleAddMethod = async () => {
    if (!newMethod.method || !newMethod.details) return;
    try {
      const res = await fetch(`${API_URL}/payment-methods`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newMethod),
      });
      const data = await res.json();
      setMethods((prev) => [...prev, data]);
      setNewMethod({ method: "", details: "" });
    } catch (error) {
      console.error("Error adding method:", error);
    }
  };

  // Update existing method
  const handleUpdateMethod = async () => {
    try {
      const res = await fetch(`${API_URL}/payment-methods/${editingMethod.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          method: editingMethod.method,
          details: editingMethod.details,
        }),
      });
      const data = await res.json();
      setMethods((prev) => prev.map((m) => (m.id === data.id ? data : m)));
      setEditingMethod(null);
    } catch (error) {
      console.error("Error updating method:", error);
    }
  };

  // Delete method
  const handleDeleteMethod = async (id) => {
    try {
      await fetch(`${API_URL}/payment-methods/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMethods((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting method:", error);
    }
  };

  // Manual balance adjustment
  const handleBalanceUpdate = async (e) => {
    e.preventDefault();
    if (!userId || !amount) {
      setMessage("Please provide User ID and amount");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Admin not authenticated");

      const decoded = jwtDecode(token);
      const adminId = decoded.id;

      const res = await fetch(`${API_URL}/admin/users/increase-balance`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          amount: Number(amount),
          action,
          adminId,
        }),
      });

      const text = await res.text();
      if (!text) throw new Error("Empty response from server");
      const data = JSON.parse(text);

      if (!res.ok) throw new Error(data.error || "Failed to update balance");

      setMessage(data.message || "Balance updated successfully");
      setUserId("");
      setAmount("");
      setAction("increase");
    } catch (error) {
      console.error("Error updating balance:", error);
      setMessage(error.message || "Something went wrong");
    }
  };

  // Link bot handler
  const handleLinkBot = async (e) => {
    e.preventDefault();
    if (!linkUserId) {
      setLinkMessage("Please enter a User ID");
      return;
    }
    try {
      setLinkLoading(true);
      setLinkMessage("");
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/trading-bot/link`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: linkUserId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to link bot");

      setLinkMessage(data.message || "Bot linked successfully!");
      setLinkUserId("");
    } catch (error) {
      console.error("Error linking bot:", error);
      setLinkMessage(error.message || "Something went wrong");
    } finally {
      setLinkLoading(false);
    }
  };

  // Unlink bot handler
  const handleUnlinkBot = async (e) => {
    e.preventDefault();
    if (!unlinkUserId) {
      setUnlinkMessage("Please enter a User ID");
      return;
    }
    try {
      setUnlinkLoading(true);
      setUnlinkMessage("");
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/trading-bot/unlink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: unlinkUserId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to unlink bot");

      setUnlinkMessage(data.message || "Bot unlinked successfully!");
      setUnlinkUserId("");
    } catch (error) {
      console.error("Error unlinking bot:", error);
      setUnlinkMessage(error.message || "Something went wrong");
    } finally {
      setUnlinkLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1a120a] text-white px-6 py-10 flex flex-col items-center">
      <div className="max-w-5xl w-full space-y-12">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

        {/* Registered Users Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
          <div className="bg-[#2b1d13] rounded-xl p-4 shadow-lg max-h-[400px] overflow-y-auto">
            {users.length === 0 ? (
              <p className="text-gray-400 text-sm">No registered users yet.</p>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="py-2">ID</th>
                    <th className="px-2">User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Balance ($)</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-b border-gray-800 hover:bg-[#3b2b1a] transition">
                      <td className="py-2">{u.id}</td>
                      <td className="px-2">{u.user_id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.confirm_password}</td>
                      <td>{Number(u.balance).toFixed(2)}</td>
                      <td>{new Date(u.created_at).toLocaleDateString("en-GB")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Pending Deposits Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Pending Deposits</h2>
          <div className="space-y-4">
            {deposits.length === 0 ? (
              <p className="text-gray-400 text-sm">No pending deposits.</p>
            ) : (
              deposits.map((deposit) => (
                <div
                  key={deposit.id}
                  className="bg-[#2b1d13] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md"
                >
                  <div>
                    <p className="text-sm text-gray-400">User ID: {deposit.user_id}</p>
                    <p className="text-lg font-medium">Amount: ${deposit.amount}</p>
                    <p className="text-xs text-gray-500">Plan: {deposit.plan}</p>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
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
              ))
            )}
          </div>
        </section>

        {/* Payment Methods Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
          <div className="flex flex-col gap-3 mb-6 bg-[#2b1d13] p-4 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Payment method (e.g. USDT)"
              value={newMethod.method}
              onChange={(e) => setNewMethod({ ...newMethod, method: e.target.value })}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
            />
            <input
              type="text"
              placeholder="Details (e.g. wallet address)"
              value={newMethod.details}
              onChange={(e) => setNewMethod({ ...newMethod, details: e.target.value })}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
            />
            <button
              onClick={handleAddMethod}
              className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-semibold"
            >
              Add Method
            </button>
          </div>

          {/* List methods */}
          <div className="space-y-4">
            {methods.length === 0 ? (
              <p className="text-gray-400 text-sm">No payment methods added.</p>
            ) : (
              methods.map((method) => (
                <div
                  key={method.id}
                  className="bg-[#2b1d13] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md"
                >
                  {editingMethod && editingMethod.id === method.id ? (
                    <div className="flex flex-col gap-3 w-full">
                      <input
                        type="text"
                        value={editingMethod.method}
                        onChange={(e) =>
                          setEditingMethod({ ...editingMethod, method: e.target.value })
                        }
                        className="bg-gray-800 p-2 rounded-lg text-sm w-full"
                      />
                      <input
                        type="text"
                        value={editingMethod.details}
                        onChange={(e) =>
                          setEditingMethod({ ...editingMethod, details: e.target.value })
                        }
                        className="bg-gray-800 p-2 rounded-lg text-sm w-full"
                      />
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleUpdateMethod}
                          className="w-full sm:w-auto px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
                        >Save
                        </button>
                        <button
                          onClick={() => setEditingMethod(null)}
                          className="w-full sm:w-auto px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div>
                        <p className="font-semibold">{method.method}</p>
                        <p className="text-sm text-gray-400">{method.details}</p>
                      </div>
                      <div className="flex gap-2 mt-3 sm:mt-0">
                        <button
                          onClick={() => setEditingMethod(method)}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteMethod(method.id)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </section>

        {/* Manual Balance Adjustment Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Manual Balance Adjustment</h2>
          <form
            onSubmit={handleBalanceUpdate}
            className="bg-[#2b1d13] p-6 rounded-xl flex flex-col gap-4 shadow-lg"
          >
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
              required
              step="0.01"
            />
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
            >
              <option value="increase">Increase</option>
              <option value="decrease">Decrease</option>
            </select>
            <button
              type="submit"
              className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-sm font-semibold"
            >
              Update Balance
            </button>
            {message && <p className="text-sm text-center text-gray-300 mt-2">{message}</p>}
          </form>
        </section>

        {/* Link Trading Bot Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Link Trading Bot to User</h2>
          <form
            onSubmit={handleLinkBot}
            className="bg-[#2b1d13] p-6 rounded-xl flex flex-col gap-4 shadow-lg"
          >
            <input
              type="text"
              placeholder="User ID"
              value={linkUserId}
              onChange={(e) => setLinkUserId(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
              required
            />
            <button
              type="submit"
              disabled={linkLoading}
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-semibold"
            >
              {linkLoading ? "Linking..." : "Link Bot"}
            </button>
            {linkMessage && <p className="text-sm text-center text-gray-300 mt-2">{linkMessage}</p>}
          </form>
        </section>

        {/* Unlink Trading Bot Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Unlink Trading Bot from User</h2>
          <form
            onSubmit={handleUnlinkBot}
            className="bg-[#2b1d13] p-6 rounded-xl flex flex-col gap-4 shadow-lg"
          >
            <input
              type="text"
              placeholder="User ID"
              value={unlinkUserId}
              onChange={(e) => setUnlinkUserId(e.target.value)}
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
              required
            />
            <button
              type="submit"
              disabled={unlinkLoading}
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold"
            >
              {unlinkLoading ? "Unlinking..." : "Unlink Bot"}
            </button>
            {unlinkMessage && <p className="text-sm text-center text-gray-300 mt-2">{unlinkMessage}</p>}
          </form>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
