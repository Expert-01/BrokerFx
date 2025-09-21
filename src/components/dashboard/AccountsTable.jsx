import React from "react";

const AccountsTable = () => (
  <section className="bg-black text-white p-6 rounded-xl shadow-lg mb-6">
    <h2 className="text-xl font-bold mb-4">Trading Accounts</h2>
    {/* Table/list of all user accounts (real/demo), actions */}
    <table className="w-full text-left">
      <thead>
        <tr>
          <th>Platform</th>
          <th>Login</th>
          <th>Nickname</th>
          <th>Balance</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>MetaTrader 5</td>
          <td>123456</td>
          <td>account1</td>
          <td>$0.00 USD</td>
          <td>
            <button className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-black px-2 py-1 rounded mr-2">Deposit</button>
            <button className="bg-gray-700 text-white px-2 py-1 rounded">Log In</button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

export default AccountsTable;
