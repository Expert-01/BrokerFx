import React from "react";
import dashboardImg from "../assets/dashboard.png";

export default function DashboardScreenshot() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div
        className="rounded-2xl shadow-2xl overflow-hidden border border-[#222] bg-[#111] max-w-5xl w-full"
        data-aos="fade-up" 
        data-aos-duration="1200"  // speed of animation
        data-aos-offset="200"     // trigger offset
      >
        <img
          src={dashboardImg}
          alt="Dashboard Screenshot"
          className="w-full h-auto object-cover"
          style={{ minHeight: 320 }}
        />
      </div>
    </div>
  );
}
