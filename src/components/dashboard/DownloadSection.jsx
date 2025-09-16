import React from "react";

const DownloadSection = () => (
  <section className="bg-black text-white p-6 rounded-xl shadow-lg mb-6">
    <h2 className="text-xl font-bold mb-4">Download Trading Platform</h2>
    <div className="flex gap-4">
      <button className="bg-gray-700 text-white px-4 py-2 rounded">Windows</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded">Mac</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded">iOS</button>
      <button className="bg-gray-700 text-white px-4 py-2 rounded">Android</button>
    </div>
  </section>
);

export default DownloadSection;
