import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
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
import TradingViewSection from "../components/TradingViewSection";
import InfiniteMenu from "./InfiniteMenu";
import FlowingMenu from './FlowingMenu'



import img32 from '../assets/testimonials/32.jpg';
import img44 from '../assets/testimonials/44.jpg';
import img65 from '../assets/testimonials/65.jpg';
import img68 from '../assets/testimonials/68.jpg';
import img23 from '../assets/testimonials/23.jpg';
import img12 from '../assets/testimonials/12.jpg';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);


const items = [
  {
    image: img32,
    link: '#',
    title: 'John Carter',
    description: 'BrokerX made investing so easy and transparent. I feel confident about my financial future!'
  },
  {
    image: img44,
    link: '#',
    title: 'Emily Stone',
    description: 'The platform is intuitive and the support team is always there to help. Highly recommended!'
  },
  {
    image: img65,
    link: '#',
    title: 'Michael Lee',
    description: 'I love the real-time stats and the security features. My portfolio has never looked better.'
  },
  {
    image: img68,
    link: '#',
    title: 'Sophia Turner',
    description: 'Joining BrokerX was the best decision for my investments. The returns are fantastic!'
  },
  {
    image: img23,
    link: '#',
    title: 'David Kim',
    description: 'I appreciate the transparency and the easy-to-use dashboard. Great experience overall.'
  },
  {
    image: img12,
    link: '#',
    title: 'Linda Perez',
    description: 'The educational resources helped me get started. Now I feel like a pro trader!'
  }
];


  const demoItems = [
  { link: '#', text: 'Trusted', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Secure', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Profitable', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Accountable', image: 'https://picsum.photos/600/400?random=4' }
];
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

         
<div style={{ height: '600px', position: 'relative' }}>
  <FlowingMenu items={demoItems} />
</div>
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
      <div style={{ height: '900px', position: 'relative' }} className="mb-20">
        <InfiniteMenu items={items}/>
      </div>




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
