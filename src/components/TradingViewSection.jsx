import React from "react";
import tradingviewBg from "../assets/tradingview-section.png"; // Place your image in src/assets and update the path if needed
import Button from "@/components/UI/Button.jsx";
const TradingViewSection = () => {
  return (
    <section
      className="relative w-full h-[768px] flex items-center justify-center bg-black"
      style={{
        backgroundImage: `url(${tradingviewBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute left-0 md:top-0 top-[50%] mb-0 md:w-1/2 w-full h-full flex flex-col justify-center pl-9 z-10">
        <h2 className="text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
          ADVANCED <br />
          <span className="text-gray-400">TRADINGVIEW</span> <br />
          INTEGRATION
        </h2>
        <p className="text-lg text-gray-300 mb-4 font-azonix ">
          Harness the full power of TradingView’s advanced charting—seamlessly integrated inside TradeLocker. Analyze with clarity, trade with confidence.
        </p>
        <p className="text-lg text-gray-300 mb-8">
          With access to 100+ fully customizable indicators, intuitive drawing tools, and multi-timeframe support, TradeLocker gives you the precision tools professional traders rely on—right at your fingertips.
        </p>
        <Button className="bg-yellow-600 hover:bg-yellow-700 text-white px-0 py-3 rounded-full font-semibold w-[50%] fancy-btn text-lg shadow-lg transition-all">
          START TRADING →
        </Button>
      </div>
    </section>
  );
};

export default TradingViewSection;
