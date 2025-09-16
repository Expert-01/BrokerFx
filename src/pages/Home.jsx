import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import Hamburger from "../components/UI/Hamburger";
import Hero from "@/components/Hero";
import Features from "../components/Features";
import Plans from "../components/Plans";
import Footer from "../components/Footer";
import { Parallax } from 'react-parallax';
import AOS from "aos";
import "aos/dist/aos.css";
import WhyChooseUs from "../components/WhyChooseUs";
import TrustedStats from "../components/TrustedStats";
import QuickStart from "../components/QuickStart";
import bitcoin from '../assets/bitcoin.png';
import ethereum from '../assets/ethereum.png';
import wallet from '../assets/wallet.png';
import HamburgerCopy from "../components/UI/HamburgerCopy";
import TradingViewSection from "../components/TradingViewSection";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  return (
  <div className="relative text-white min-h-screen overflow-hidden bg-black " >
      <Parallax strength={300} bgClassName="z-0">
        {/* Abstract Globe/Network SVG Background */}
        <div className="fixed inset-0 w-full h-full pointer-events-none  " style={{minHeight: '100vh'}}>
          <div className="globe-spin" style={{width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0}}>
            <svg width="100vw" height="100vh" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width: '100vw', height: '100vh'}}>
            <defs>
              <radialGradient id="globeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientTransform="rotate(45)">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0A0F1F" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="720" cy="450" r="340" fill="url(#globeGradient)" />
            {/* Network lines */}
            <g stroke="#d4af37" strokeOpacity="0.12">
              <ellipse cx="720" cy="450" rx="320" ry="120" />
              <ellipse cx="720" cy="450" rx="220" ry="80" />
              <ellipse cx="720" cy="450" rx="120" ry="40" />
              <line x1="400" y1="450" x2="1040" y2="450" />
              <line x1="720" y1="110" x2="720" y2="790" />
            </g>
            {/* Faint candlestick chart */}
            <g opacity="0.08" className="translate-x-[10%]">
              <rect x="600" y="600" width="8" height="40" fill="#00ff99" />
              <rect x="610" y="620" width="8" height="20" fill="#ff4444" />
              <rect x="620" y="610" width="8" height="30" fill="#00ff99" />
              <rect x="630" y="630" width="8" height="10" fill="#ff4444" />
              <rect x="640" y="600" width="8" height="40" fill="#00ff99" />
              <rect x="650" y="620" width="8" height="20" fill="#ff4444" />
              <rect x="660" y="610" width="8" height="30" fill="#00ff99" />
              <rect x="670" y="630" width="8" height="10" fill="#ff4444" />
    
            </g>
            </svg>
          </div>
          {/* Floating icons */}
           </div>
      </Parallax>

      {/* Main Content */}
      <div className="relative z-10" style={{position: 'relative'}}>
        <Navbar data-aos="fade-down" />
         <Parallax strength={200}>
          <Hero data-aos="fade-up" />


        </Parallax>
        <Parallax strength={100}>
          <Features data-aos="fade-right" />
          <WhyChooseUs />
        </Parallax>
        <Plans data-aos="fade-left" />
        <QuickStart />

        
  {/* TradingView Integration Section */}
  <TradingViewSection />
        <TrustedStats />

        <Footer />
      </div>

      {/* Floating and Globe animation CSS */}
      <style>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .globe-spin {
         transform: scale3d(2, 2, 2);

        }
        @keyframes spin {
          0% { transform: scale3d(1, 1, 1); }
          10% { transform: scale3d(1.1, 1.1, 1.1); }
          20% { transform: scale3d(1.2, 1.2, 1.2); }
          30% { transform: scale3d(1.3, 1.3, 1.3); }
          40% { transform: scale3d(1.4, 1.4, 1.4); }
          50% { transform: scale3d(1.5, 1.5, 1.5); }
          60% { transform: scale3d(1.6, 1.6, 1.6); }
          70% { transform: scale3d(1.7, 1.7, 1.7); }
          80% { transform: scale3d(1.8, 1.8, 1.8); }
          90% { transform: scale3d(1.9, 1.9, 1.9); }
          100% { transform: scale3d(2, 2, 2);}


        }
      `}</style>
    </div>
  );
}
