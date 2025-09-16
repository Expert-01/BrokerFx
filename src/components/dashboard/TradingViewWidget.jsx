import React, { useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
// TradingViewWidget wrapper for embedding TradingView chart
const TradingViewWidget = ({ symbol = "BTCUSD" }) => {
  const container = useRef();

  useEffect(() => {
    if (window.TradingView) {
      // Remove previous widget if any
      if (container.current) container.current.innerHTML = "";
      new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "en",
        toolbar_bg: "#23272f",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: container.current.id,
      });
    }
  }, [symbol]);

  useEffect(() => {
    // Load TradingView script if not present
    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = () => {
        if (window.TradingView && container.current) {
          new window.TradingView.widget({
            autosize: true,
            symbol: symbol,
            interval: "15",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#23272f",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: container.current.id,
          });
        }
      };
      document.body.appendChild(script);
    }
  }, [symbol]);

  return (

    <div className="w-full h-[400px] bg-[#181a20] rounded-xl shadow mb-6">
      <div ref={container} id="tradingview_chart" className="w-full h-full min-w-0" />
    </div>
  );
};

export default TradingViewWidget;
