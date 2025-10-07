import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [methods, setMethods] = useState([]);
  const [newMethod, setNewMethod] = useState({ method: "", details: "" });
  const [editingMethod, setEditingMethod] = useState(null);

  // Fetch deposits
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/deposits`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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

  // Fetch payment methods
  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch(`${API_URL}/payment-methods`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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

  // Approve deposit
  const handleApprove = async (id) => {
    try {
      await fetch(`${API_URL}/admin/deposits/${id}/approve`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setDeposits((prev) => prev.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Error rejecting deposit:", error);
    }
  };

  // Add new payment method
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

  return (
    <div className="min-h-screen w-full bg-[#1a120a] text-white px-6 py-10 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-12">
        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Dashboard
        </h1>

        {/* Deposits Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Pending Deposits</h2>
          <div className="space-y-4">
            {deposits.length === 0 && (
              <p className="text-gray-400 text-sm">No pending deposits.</p>
            )}
            {deposits.map((deposit) => (
              <div
                key={deposit.id}
                className="bg-[#2b1d13] rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center shadow-md"
              >
                <div>
                  <p className="text-sm text-gray-400">
                    User ID: {deposit.user_id}
                  </p>
                  <p className="text-lg font-medium">
                    Amount: ${deposit.amount}
                  </p>
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
            ))}
          </div>
        </section>

        {/* Payment Methods Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>

          {/* Add new method */}
          <div className="flex flex-col gap-3 mb-6 bg-[#2b1d13] p-4 rounded-xl shadow-lg">
            <input
              type="text"
              placeholder="Payment method (e.g. USDT)"
              value={newMethod.method}
              onChange={(e) =>
                setNewMethod({ ...newMethod, method: e.target.value })
              }
              className="bg-gray-800 p-2 rounded-lg text-sm outline-none w-full"
            />
            <input
              type="text"
              placeholder="Details (e.g. wallet address)"
              value={newMethod.details}
              onChange={(e) =>
                setNewMethod({ ...newMethod, details: e.target.value })
              }
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
            {methods.length === 0 && (
              <p className="text-gray-400 text-sm">No payment methods added.</p>
            )}
            {methods.map((method) => (
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
                        setEditingMethod({
                          ...editingMethod,
                          method: e.target.value,
                        })
                      }
                      className="bg-gray-800 p-2 rounded-lg text-sm w-full"
                    />
                    <input
                      type="text"
                      value={editingMethod.details}
                      onChange={(e) =>
                        setEditingMethod({
                          ...editingMethod,
                          details: e.target.value,
                        })
                      }
                      className="bg-gray-800 p-2 rounded-lg text-sm w-full"
                    />
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={handleUpdateMethod}
                        className="w-full sm:w-auto px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm"
                      >
                        Save
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
                      <p className="text-sm text-gray-400">
                        {method.details}
                      </p>
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
