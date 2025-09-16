
export default function Settings() {
  return (
  <div className="p-6 min-h-screen bg-black">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6">Settings</h1>

      {/* Preferences */}
  <div className="bg-black p-6 rounded-xl border border-[#222] mb-6">
        <h2 className="text-gray-400 mb-4">Preferences</h2>
        <div className="flex justify-between items-center mb-3">
          <span>Dark Mode</span>
          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </div>
        <div className="flex justify-between items-center">
          <span>Email Notifications</span>
          <input type="checkbox" defaultChecked className="w-5 h-5" />
        </div>
      </div>

      {/* Security */}
  <div className="bg-black p-6 rounded-xl border border-[#222]">
        <h2 className="text-gray-400 mb-4">Security</h2>
        <div className="flex justify-between items-center mb-3">
          <span>Change Password</span>
          <button className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold">
            Update
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span>Two-Factor Authentication</span>
          <button className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-semibold">
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}

