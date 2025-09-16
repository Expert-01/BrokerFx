import React from "react";
import phoneImg from "../assets/phone.png"; // Place your phone screenshot as phone.png in assets

export default function QuickStart() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-20 bg-black font-obitron">
      <div className="rounded-[32px] md:rounded-[40px] bg-gradient-to-r from-[#ffce1ebe] via-[#ffce1ebe] to-[#1e90ff] p-10 md:p-16 shadow-2xl w-full md:w-[600px] max-w-xl text-left relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
          <span className="block">START TRADING IN</span>
          <span className="block">UNDER 5 MINUTES</span>
        </h2>
        <p className="text-xl md:text-2xl font-bold text-white mb-2">Join thousands of traders<br />exploring new worlds of trading.</p>
        <button className="bg-[#1e90ff] hover:bg-[#0077cc] text-white px-6 py-3 rounded-full font-semibold shadow-lg transition mb-8">
          START TRADING &rarr;
        </button>
        <div className="flex gap-8 mt-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Register</h3>
            <p className="text-white/80 text-sm">Create your account<br />in only 30 seconds.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Fund</h3>
            <p className="text-white/80 text-sm">Deposit to your<br />trading account.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-1">Trade</h3>
            <p className="text-white/80 text-sm">Start trading Raw spreads<br />with 1:1000 leverage.</p>
          </div>
        </div>
      </div>
      <div className="relative w-full md:w-[340px] flex justify-center items-center mt-10 md:mt-0 md:-ml-12 z-20">
        <img src={phoneImg} alt="Trading App Screenshot" className="w-[300px] md:w-[340px] rounded-[40px] shadow-2xl" />
      </div>
    </section>
  );
}
