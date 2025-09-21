import React from "react";
//import Trading from "../components/dashboard/Trading";
import TradePanel from "./TradePanel";

const TradingPage = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
    <TradePanel userId={user.id} />
  </div>
);

export default TradingPage;
