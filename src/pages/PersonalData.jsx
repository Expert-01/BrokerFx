import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

const PersonalData = () => {
  // Sample user data (replace with real data later)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 800 123 4567",
    country: "Nigeria",
    accountType: "Standard Broker Account",
    memberSince: "Jan 2024",
  };

  return (
    <div className="min-h-screen flex bg-black">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-6 md:ml-56 w-full">
        <div className="w-full max-w-4xl p-8 bg-brown-900 rounded-xl shadow-lg space-y-6">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6 text-center">
            Personal Data
          </h1>

          {/* Profile Summary Card */}
          <div className="bg-black p-6 rounded-xl shadow-md border-l-4 border-yellow-400 space-y-4">
            <h2 className="text-2xl font-semibold text-yellow-300">Profile Information</h2>
            <div className="grid md:grid-cols-2 gap-4 text-yellow-200">
              <div>
                <p className="font-semibold">Full Name</p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p>{user.phone}</p>
              </div>
              <div>
                <p className="font-semibold">Country</p>
                <p>{user.country}</p>
              </div>
              <div>
                <p className="font-semibold">Account Type</p>
                <p>{user.accountType}</p>
              </div>
              <div>
                <p className="font-semibold">Member Since</p>
                <p>{user.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors duration-200">
              Edit Profile
            </button>
            <button className="bg-brown-700 text-yellow-200 px-6 py-2 rounded-md font-semibold hover:bg-brown-600 transition-colors duration-200">
              Change Password
            </button>
          </div>

          <div className="text-yellow-300 text-center mt-4 text-sm">
            Keep your information up-to-date to enjoy personalized trading experience.
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalData;
