import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { LogOut } from "lucide-react";
import RightPanel from "../components/dashboard/RightPanel";
import Sidebar from "../components/dashboard/Sidebar";
import AccountOverview from "../components/dashboard/AccountOverview";
import AccountsTable from "../components/dashboard/AccountsTable";
import DownloadSection from "../components/dashboard/DownloadSection";
import Promotions from "../components/dashboard/Promotions";
import CopyTrading from "../components/dashboard/CopyTrading";
import Documents from "../components/dashboard/Documents";
import Notifications from "../components/dashboard/Notifications";
import Support from "../components/dashboard/Support";
import ProfitLossCumulative from "../components/dashboard/ProfitLossCumulative";
import Watchlist from "../components/dashboard/Watchlist";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import TradesByStrategies from "../components/dashboard/TradesByStrategies";
import DashboardHome from "./DashboardHome.";
import MobileTopBar from "../components/dashboard/MobileTopBar";
import MobileBalanceCard from "../components/dashboard/MobileBalanceCard";
import MobileActionButtons from "../components/dashboard/MobileActionButtons";
import MobileHoldingsCard from "../components/dashboard/MobileHoldingsCard";
import MobileHotCoins from "../components/dashboard/MobileHotCoins";

export default function Dashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  // Example: Fetch real data for charts and watchlist
  const [tradesData, setTradesData] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get userId from JWT (localStorage)
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserId(decoded.id || decoded.userId);
      } catch (e) {
        setUserId(null);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch trades by strategies
    fetch("/api/trades/strategies")
      .then((res) => res.json())
      .then((data) => setTradesData(data))
      .catch(() => setTradesData([4, 2, 6, 1, 3])); // fallback
    // Fetch profit/loss cumulative
    fetch("/api/profitloss/cumulative")
      .then((res) => res.json())
      .then((data) => setProfitLossData(data))
      .catch(() => setProfitLossData([0, 20, 10, 50, 30, 70, 40, 60, 30, 60])); // fallback
    // Fetch watchlist
    fetch("/api/watchlist")
      .then((res) => res.json())
      .then((data) => setWatchlist(data))
      .catch(() =>
        setWatchlist([
          { symbol: "YESB", last: "16.10", change: "+0.15" },
          { symbol: "VDAN", last: "281.15", change: "-4.80" },
          { symbol: "USD/INR", last: "82.076", change: "+0.152" },
          { symbol: "TISC", last: "108.45", change: "-0.80" },
          { symbol: "SUN", last: "958.95", change: "+5.15" },
          { symbol: "SBI", last: "573.50", change: "+1.45" },
          { symbol: "RELI", last: "2480.15", change: "-16.45" },
          { symbol: "ONGC", last: "167.45", change: "+0.50" },
          { symbol: "NSEI", last: "18296.63", change: "-19.50" },
          { symbol: "NSEBANK", last: "43482.45", change: "+144.20" },
        ])
      );
  }, []);

  return (
    <>
      {/* Desktop Dashboard */}
  <div className="hidden md:grid min-h-screen bg-black grid-cols-[220px_1fr_340px] gap-0" data-aos="fade-up">
        {/* Sidebar */}
        <aside className="p" data-aos="fade-right">
          <Sidebar />
        </aside>
        {/* Main Content */}
  <main className="flex flex-col px-8 py-8 gap-8 bg-[#000000a0] overflow-y-auto" data-aos="zoom-in">
          {/* Top: Balance Card and Chart */}
          <div className="w-full max-w-3xl mx-auto">
            {/* Replace with your desktop balance card/chart component if needed */}
            <MobileBalanceCard userId={userId} />
          </div>
          {/* Holdings Section */}
          <div className="w-full max-w-3xl mx-auto">
            <MobileHoldingsCard />
          </div>
          {/* Hot Coins or Activity Section */}
          <div className="w-full max-w-3xl mx-auto">
            <MobileHotCoins />
          </div>
        </main>
        {/* Right Panel (actions, trading, etc.) */}
  <RightPanel data-aos="fade-left" />
      </div>
      {/* Mobile Dashboard */}
  <div className="md:hidden bg-[#000000a0] min-h-screen w-full p-5 flex flex-col gap-4" data-aos="fade-up">
        <MobileTopBar/>
        <MobileBalanceCard userId={userId} />
        <MobileActionButtons />
        <MobileHoldingsCard />
        <MobileHotCoins />
      </div>
    </>
  );
}


