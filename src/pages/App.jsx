import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";

import Register from "@/pages/Register";
import Login from "@/pages/Login";
const Home = lazy (() => import("@/pages/Home"));
import Preloader from "../components/Preloader";
import Dashboard from "./Dashboard";
//import Deposit from "../components/dashboard/Deposit";
import AdminDashboard from "./AdminDashboard";

import Trading from "../components/dashboard/Trading";

import TestEnv from "./TestConnection";
//Simport LivePrice from "./LivePrice";
import TradePanel from "./TradePanel";
import TradingPage from "./TradingPage";
import BalanceHistoryChart from "../components/dashboard/BalanceHistoryChart";
import DemoLineChart from "../components/dashboard/DemoLineChart";
import DepositPage from "./Deposit";
import Account from "./Account";
import Withdrawal from "./Withdrawal";
import PersonalData from "./PersonalData";
import AccountStatus from "./AccountStatus";
import Promotion from "../components/dashboard/Promotion";
import Documents from "./Documents";
import Pamm from "./Pamm";
import CopyTrading from "./CopyTrading";
import PartnerArea from "./PartnerArea";
import Logout from "./Logout";
export default function App() {
  return (
    <div className="bg-stone-900 text-white min-h-screen">
      <Suspense fallback={<Preloader />}>
      <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
  <Route path="/my-account" element={<Account />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/deposit" element={<DepositPage />} />
  <Route path="/withdrawal" element={<Withdrawal />} />
  <Route path="/personal-data" element={<PersonalData />} />
  <Route path="/account-status" element={<AccountStatus />} />
  <Route path="/promo-offers" element={<Promotion />} />
  <Route path="/documents" element={<Documents />} />
  <Route path="/pamm" element={<Pamm />} />
  <Route path="/copy-trading" element={<CopyTrading />} />
  <Route path="/partner-area" element={<PartnerArea />} />
  <Route path="/logout" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<div className="flex items-center justify-center h-screen text-3xl">404 - Page Not Found</div>} />
  <Route path="/trading" element={<Trading />} />
      <Route path="/test-env" element={<TestEnv />} />
      <Route path="/chart" element={<DemoLineChart />} />
      <Route path="/deposit" element={<DepositPage />} />
      </Routes>
      </Router>
      </Suspense>
    </div>
  );
};
