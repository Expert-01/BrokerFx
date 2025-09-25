import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import btc from "../assets/coin.png";
import eth from "../assets/ethereum.png";
import chart from "../assets/chart.png";
import Button from "@/components/UI/Button.jsx";
import { Link } from "react-router-dom";

export default function Hero() {
  React.useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
    <>
      {/* Desktop & Mobile Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[600px] md:min-h-[800px] px-0 py-0 w-full overflow-hidden text-center " style={{width: '100vw'}} data-aos="fade-up">
        {/* Spinning Gold Ring Gradient Background */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
          <svg width="100%" height="100%" viewBox="0 0 1600 800" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', zIndex: 0}} className="animate-spin-slow">
            <ellipse cx="800" cy="400" rx="350" ry="120" fill="url(#goldRainbow)" opacity="0.7" />
            <defs>
              <radialGradient id="goldRainbow" cx="0.5" cy="0.5" r="0.5" gradientTransform="matrix(350 0 0 120 625 280)" gradientUnits="userSpaceOnUse">
                <stop stopColor="#d4af37" />
                <stop offset="0.3" stopColor="#bfa233" />
                <stop offset="0.6" stopColor="#ffd700" />
                <stop offset="0.8" stopColor="#ffecb3" />
                <stop offset="1" stopColor="#d4af37" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        {/* Sunset-like background */}
        {/* Gradient background removed for clean look */}

        {/* Headline & Subtitle */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-3xl mx-auto" data-aos="zoom-in">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_0_10px_rgba(212,175,55,0.7)] font-azonix" data-aos="bounce">Accelerate Your Investments With AI</h1>
          <p className="text-lg md:text-0.5xl text-gray-300 mb-8 font-azonix" data-aos="fade-up">AI-driven asset management & insights. Empower your portfolio, make smarter trades, and maximize ROI effortlessly.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8" data-aos="flip-up">
            <Link to="/register">
              <Button className="bg-[#d4af37] text-black rounded-full px-8 py-4 font-bold shadow-lg hover:scale-105 transition-transform glass-radial-btn">Get started for free</Button>
            </Link>
            <Button variant="outline" className="border-[#d4af37] text-[#d4af37] rounded-full px-8 py-4 border font-bold hover:bg-[#d4af37]/10 transition-colors">Learn More</Button>
          </div>
        </div>

        {/* Trusted by logos row (optional) */}
        <div className="relative z-10 flex flex-row flex-wrap justify-center items-center gap-6 mt-2 opacity-80" data-aos="fade-left">
          <span className="text-xs text-gray-400 mr-2">Trusted by 200+ investors</span>
          <img src="/assets/logo.png" alt="Logo" className="h-6 opacity-60" />
          {/* Add more logos as needed */}
        </div>
      {/* Spinning animation CSS */}
      <style>{`
        .animate-spin-slow {
          animation: spin 12s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      </section>
    </>
  );
}