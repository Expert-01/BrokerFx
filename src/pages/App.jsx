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

export default function App() {
  return (
    <div className="bg-[#0A0F1F] text-white min-h-screen">
      <Suspense fallback={<Preloader />}>
      <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logout" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="*" element={<div className="flex items-center justify-center h-screen text-3xl">404 - Page Not Found</div>} />
  <Route path="/trading" element={<Trading />} />

      </Routes>
      </Router>
      </Suspense>
    </div>
  );
};
