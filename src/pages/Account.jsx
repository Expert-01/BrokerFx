

import AccountOverview from "../components/dashboard/AccountOverview";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AccountsTable from "../components/dashboard/AccountsTable";
import CopyTrading from "../components/dashboard/CopyTrading";
import Documents from "../components/dashboard/Documents";
import DownloadSection from "../components/dashboard/DownloadSection";
import Notifications from "../components/dashboard/Notifications";
import OpenPositions from "../components/dashboard/OpenPositions";
import ProfitLossCumulative from "../components/dashboard/ProfitLossCumulative";
import Promotions from "../components/dashboard/Promotions";
import Sidebar from "../components/dashboard/Sidebar";
import MobileTopBar from "../components/dashboard/MobileTopBar";
const mockPositions = [
	{ symbol: "BTCUSD", side: "buy", amount: 0.5, takeProfit: 50000, stopLoss: 45000 },
	{ symbol: "ETHUSD", side: "sell", amount: 2, takeProfit: 3000, stopLoss: 2500 },
];


const Account = () => {
	const [userId, setUserId] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				setUserId(decoded.id || decoded.userId);
			} catch {
				setUserId(null);
			}
		}
	}, []);
	return (
		<div className="min-h-screen flex flex-col p-4 md:flex md:flex-row bg-black w-full" style={{overflowX:" hidden"}}>
			<Sidebar />
    
            
			<main className="flex-1 flex flex-col items-center px-2 md:px-8 py-6 md:ml-56 w-full">
				<div className="w-full flex flex-col gap-6">
					<AccountOverview userId={userId} />
				{/*	<AccountsTable />
					<div className="flex flex-col md:flex-row gap-6">
						<div className="flex-1">
							<OpenPositions positions={mockPositions} />
						</div>
						{/*<div className="flex-1">
							<ProfitLossCumulative />
						</div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<CopyTrading />
						<Documents />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<DownloadSection />
						<Notifications />
					</div>*/}
					<Promotions />
				</div>
			</main>
		</div>
	);
};

export default Account;

