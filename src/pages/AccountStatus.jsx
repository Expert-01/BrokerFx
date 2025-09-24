import React from "react";
import Sidebar from "../components/dashboard/Sidebar";

const AccountStatus = () => (
  <div className="min-h-screen flex bg-black">
    <Sidebar />
    <main className="flex-1 flex flex-col items-center px-2 md:px-8 py-6 md:ml-56 w-full">
      <div className="w-full max-w-4xl p-8 text-center">
        <h1 className="text-3xl font-bold text-yellow-600 mb-4">Account Status</h1>
        <p>Account status page coming soon.</p>
      </div>
    </main>
  </div>
);

export default AccountStatus;
