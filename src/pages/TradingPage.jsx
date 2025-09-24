import React from "react";
//import Trading from "../components/dashboard/Trading";
import TradePanel from "./TradePanel";
import { Sidebar } from "lucide-react";

const TradingPage = () => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">

    <TradePanel />
  </div>
);

export default TradingPage;
