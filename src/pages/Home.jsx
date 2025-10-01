import React, {useEffect} from "react";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import Features from "../components/Features";
import Plans from "../components/Plans";
import Footer from "../components/Footer";
// Parallax removed
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
import DashboardScreenshot from '../components/DashboardScreenshot';
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
      {/* Gradient SVG background removed for clean look */}

      {/* Main Content */}
      <div className="relative z-10" style={{position: 'relative'}}>
        <Navbar data-aos="fade-down" />
        <Hero data-aos="" />
        <DashboardScreenshot data-aos="flip-up"/>
        <Features data-aos="fade-right" />
        <WhyChooseUs />
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
