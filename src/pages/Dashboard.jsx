import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
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

export default function Dashboard() {
  // Example: Fetch real data for charts and watchlist
  const [tradesData, setTradesData] = useState([]);
  const [profitLossData, setProfitLossData] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

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
    <div className="flex min-h-screen bg-black">
      <aside className="fixed left-0 top-0 h-full z-10">
        <Sidebar />
      </aside>
      <main className="flex-1 md:p-[5%] overflow-y-auto ">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex flex-row gap-8 w-full">
            <div className="w-[200px] hidden md:block"></div> {/* Spacer for sidebar width */}
            <div className="flex-1">
              <AccountOverview />
            </div>
            <div className="flex-1 max-w-md p-2">
              <TradesByStrategies data={tradesData} />
              <ProfitLossCumulative data={profitLossData} />
              <Watchlist data={watchlist} />
            </div>
          </div>
        </div>
        <div className="mx-64 my-8">
          <AccountsTable />
          <DownloadSection />
          <Promotions />
          <CopyTrading />
          <Documents />
          <Notifications />
          <Support />
        </div>
      </main>
    </div>
  );
}


