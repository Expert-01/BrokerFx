import React, { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { jwtDecode } from "jwt-decode";

const PersonalData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authentication token found");
          setLoading(false);
          return;
        }

        const decoded = jwtDecode(token);
        const userId = decoded?.id || decoded?.userId;

        if (!userId) {
          setError("Invalid token");
          setLoading(false);
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#0b0b0b] text-[#e0d7c6]">
      <Sidebar />

      <main className="flex-1 flex flex-col items-center px-4 md:px-10 py-10 md:ml-56 w-full">
        <div className="w-full max-w-4xl p-10 bg-gradient-to-br from-[#141414]/90 to-[#1f1b16]/70 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)] space-y-8">
          <h1 className="text-3xl font-bold text-center text-[#d4af37] tracking-wide">
            Personal Data
          </h1>

          {/* Loading / Error States */}
          {loading && (
            <p className="text-center text-[#f1d38a]">Loading user information...</p>
          )}
          {error && (
            <p className="text-center text-[#e57373]">Error: {error}</p>
          )}

          {/* User Info */}
          {!loading && user && (
            <>
              <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1917] p-8 rounded-xl border border-[#d4af37]/20 shadow-[0_0_15px_rgba(212,175,55,0.08)] space-y-6">
                <h2 className="text-2xl font-semibold text-[#f1d38a] border-b border-[#d4af37]/30 pb-2">
                  Profile Information
                </h2>

                <div className="grid md:grid-cols-2 gap-6 text-[#f5e8c7]/90">
                  <div>
                    <p className="font-semibold text-[#d4af37]">Full Name</p>
                    <p>{user.name || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#d4af37]">Email</p>
                    <p>{user.email || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#d4af37]">Phone</p>
                    <p>{user.phone || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#d4af37]">Country</p>
                    <p>{user.country || "—"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#d4af37]">Account Type</p>
                    <p>{user.account_type || "Standard Account"}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-[#d4af37]">Member Since</p>
                    <p>{new Date(user.created_at).toLocaleDateString() || "—"}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                <button className="bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black px-8 py-3 rounded-lg font-semibold hover:from-[#e0c05a] hover:to-[#c9a227] transition-all duration-200 shadow-md">
                  Edit Profile
                </button>
                <button className="bg-[#1a1a1a] border border-[#d4af37]/40 text-[#d4af37] px-8 py-3 rounded-lg font-semibold hover:bg-[#2a2a2a] transition-all duration-200 shadow-md">
                  Change Password
                </button>
              </div>

              <div className="text-center text-sm text-[#d4af37]/80 mt-6 italic">
                Keep your information up-to-date to enjoy a more personalized trading experience.
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PersonalData;
