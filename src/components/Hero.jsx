import React from "react";
import btc from "../assets/coin.png";
import eth from "../assets/ethereum.png";
import chart from "../assets/chart.png";
import { Button } from "@/components/UI/button";
import { Link } from "react-router-dom";
import BlurText from "./BlurText";

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <>
      {/* Desktop Only */}
      <section
  className="hidden md:flex flex-col md:flex-row items-center justify-center px-4 md:px-0 py-8 text-center md:text-left translate-x-[20%] min-h-[800px] font-orbitron"
        style={{

        }}
      >
        {/* Left Side */}
  <div className="w-full md:w-full hidden md:flex flex-col items-center md:mr-[90px] md:items-start md:text-center font-orbitron">
          <BlurText
            text="Invest Smartly in Digital Assets"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-3xl md:text-[47.6px] font-semibold mb-9 text-center w-full md:ml-[60px] ml-[0%] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] font-orbitron"
          />
          
          <p className="text-gray-400 mb-6 md:ml-[10%] text-center w-[80%] font-azonix">
            Secure your future with safe transactions, multiple payment options, 
            and guaranteed ROI growth.
          </p>
          <div className="flex flex-col md:flex-row gap-4 md:space-x-6 w-full md:ml-[30%] items-center md:items-start font-orbitron">
            <Link to="/register"> 
              <Button className="bg-[#d4af37] text-black rounded-full px-9 py-4 fancy-btn relative overflow-hidden font-orbitron">
                <span className="relative z-10 font-orbitron">Get Started</span>
                <span className="shimmer absolute inset-0 font-orbitron"></span>
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-[#d4af37] text-[#d4af37] rounded-full px-9 py-4 border fancy-btn font-orbitron"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Fancy Button CSS */}
        <style>{`
          .fancy-btn {
            transition: box-shadow 0.3s, transform 0.3s;
          }
          .fancy-btn:hover {
            box-shadow: 0 8px 24px 0 rgba(212,175,55,0.4), 0 1.5px 0 #fff inset;
            transform: translateY(-2px) scale(1.04);
          }
          .fancy-btn .shimmer {
            pointer-events: none;
            background: linear-gradient(
              120deg,
              rgba(255,255,255,0) 40%,
              rgba(255,255,255,0.5) 50%,
              rgba(255,255,255,0) 60%
            );
            opacity: 0.7;
            transform: translateX(-100%);
            transition: transform 0.6s cubic-bezier(.4,2,.3,.7);
          }
          .fancy-btn:hover .shimmer {
            transform: translateX(100%);
          }
        `}</style>

        {/* Right Side */}
  <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 font-orbitron"></div>
      </section>

      {/* Mobile View - Improved Layout */}
  <section className="md:hidden flex flex-col items-center justify-start px-4 pt-6 pb-10 w-full relative overflow-hidden translate-y-[30%] min-h-[500px] font-orbitron" >
        {/* Circular Gradient Background */}
  <div className="absolute top-[80px] left-1/2 translate-x-1/2 w-full h-[300px] rounded-full z-0 font-orbitron"></div>

        {/* Headline */}
  <div className="w-full flex flex-col items-center justify-center px-6 translate-x-[10%] mb-4 w-full font-orbitron ">
          <BlurText
            text="Invest Smartly in"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-3xl mb-1 w-full max-w-md px-7 text-center drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] relative z-10 font-orbitron"
          />
          <BlurText
            text="Digital Assets"
            delay={350}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-3xl mb-3 w-full max-w-md text-center drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] relative z-10 font-orbitron"
          />
        </div>
 
        {/* Subtitle */}
  <p className="text-gray-400 mb-6 text-center text-sm leading-relaxed max-w-md relative z-10 font-orbitron">
          Secure your future with safe transactions, multiple payment options, and guaranteed ROI growth.
        </p>

        {/* Buttons Row */}
  <div className="flex items-center justify-center mb-6 w-full gap-3 relative z-10 font-orbitron">
          <Link to="/register" className="w-auto font-orbitron">
            <Button className="bg-[#d4af37] text-black rounded-full px-6 py-3 fancy-btn relative overflow-hidden text-sm font-semibold shadow-lg font-orbitron">
              <span className="relative z-10 font-orbitron">Get Started</span>
              <span className="shimmer absolute inset-0 font-orbitron"></span>
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-[#d4af37] text-[#d4af37] rounded-full px-6 py-3 text-sm font-semibold border"
          >
            Learn More
          </Button>
        </div>

        {/* Digital Assets Icons Row
                <div className="flex justify-center items-center w-full mt-4 gap-6 relative z-10">
          <img src={btc} alt="btc" className="w-10 h-10" />
          <img src={eth} alt="eth" className="w-10 h-10" />
          <img src={chart} alt="chart" className="w-10 h-10" />
        </div> */}

      </section>
    </>
  );
}