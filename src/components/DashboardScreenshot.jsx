import React from "react";
import dashboardImg from "../assets/dashboard.png";

export default function DashboardScreenshot() {
  return (
    <div className="w-full flex justify-center items-center py-12">
      <div
        className="shadow-2xl overflow-hidden border border-[#222] bg-[#111] max-w-5xl w-full"
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-offset="200"
      >
        <img
          src={dashboardImg}
          alt="Dashboard Screenshot"
          className="w-[90%] md:w-full h-auto object-contain mx-auto"
          style={{ minHeight: 320 }}
        />
      </div>
    </div>
  );
}
