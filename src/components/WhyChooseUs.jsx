import React from "react";
import Button from '@/components/UI/Button.jsx';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: (
      // Replace with your SVG or <img src="..."/> for dollar icon
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <text x="50%" y="55%" textAnchor="middle" fontSize="60" fill="#ffce1ebe">$</text>
      </svg>
    ),
    label: "Received",
    title: "Lightning-Fast Withdrawals",
    desc: "Your funds. Your wallet. Instantly.",
  },
  {
    icon: (
      // Replace with your SVG or <img src="..."/> for candlestick chart
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <rect x="20" y="30" width="8" height="30" fill="#ffce1ebe" />
        <rect x="36" y="20" width="8" height="40" fill="#fff" />
        <rect x="52" y="35" width="8" height="25" fill="#ffce1ebe" />
      </svg>
    ),
    label: (
      <div className="flex gap-2">
        <span className="bg-black/80 px-3 py-1 rounded-lg text-white">Bid</span>
        <span className="bg-black/80 px-3 py-1 rounded-lg text-white">Ask</span>
      </div>
    ),
    title: "Institutional-Grade Liquidity",
    desc: "The lowest cost per trade possible.",
  },
  {
    icon: (
      // Replace with your SVG or <img src="..."/> for leverage chart
      <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
        <polyline points="10,70 30,40 50,60 70,20" stroke="#fff" strokeWidth="3" fill="none" />
        <text x="50" y="15" fontSize="12" fill="#ffce1ebe">High</text>
      </svg>
    ),
    label: (
      <div className="bg-black/80 px-4 py-1 rounded-lg text-white flex items-center justify-between w-24">
        <span>1:1</span>
        <span className="ml-auto text-[#ffce1ebe]">1:1000</span>
      </div>
    ),
    title: "Leverage, Unlocked",
    desc: "Trade with up to 1:1000 leverage.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-[#000]/40 text-white text-center">
      <h2 className="text-4xl md:text-5xl font-bold mb-2 tracking-wide font-orbitron">
        WHY TRADERS <span className="text-[#ffce1ebe]">CHOOSE US</span>
      </h2>
      <p className="mb-12 text-lg text-gray-300">We built NexaExchange for the next generation of traders.</p>
      <div className="flex flex-col md:flex-row justify-center items-start gap-12 mb-10 px-[20%] md:px-0">
        {features.map((f, i) => (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div className="mb-4">{f.icon}</div>
            <div className="mb-4">{f.label}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
      
      <Link to='/register'>
      <Button className="bg-[#ffce1ebe] glass-radial-btn text-white px-8 py-3 rounded-full font-semibold shadow-lg transition">
        START TRADING &rarr;
      </Button>
      </Link>
    </section>
  );
}