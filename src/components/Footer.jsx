import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300 py-12 px-4 border-t border-gray-800 font-orbitron">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left: Company Info */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-2">
            <img src="/assets/logo.png" alt="NexaExchange Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-white">NexaExchange</span>
          </div>
          <p className="text-sm leading-relaxed">
            NexaExchange is an international broker regulated by the International Financial Centre of St. Lucia, ensuring transparency and compliance with international standards of the company's services.<br /><br />
            Registration number: 00396 IBC 2024<br />
            Copyright 2025. NexaExchange LTD. All rights reserved.
          </p>
          <div className="mt-4">
            <div className="font-bold text-white mb-1">Registration Number</div>
            <div className="text-lg mb-2">2024 00396</div>
            <div className="font-bold text-white mb-1">Registration Number</div>
            <div className="text-sm">Ground floor, La Place Creole Building,<br />Rodney Village, Rodney Bay,<br />Gros Islet, St. Lucia</div>
          </div>
        </div>
        {/* Center: Trading & Company Links */}
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-orbitron text-white tracking-widest">TRADING</span>
            <ul className="mt-2 space-y-1 text-left">
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Account Types</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Instruments</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Liquidity</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">TradeLocker</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">MetaTrader 5</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-2 mt-8">
            <span className="text-2xl font-orbitron text-white tracking-widest">COMPANY</span>
            <ul className="mt-2 space-y-1 text-left">
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Partners</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">About NexaExchange</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Legal Disclaimers</a></li>
              <li><a href="#" className="text-white font-bold hover:text-[#d4af37]">Contact Us</a></li>
            </ul>
          </div>
        </div>
        {/* Right: Social & Subscribe */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-white text-lg font-orbitron mb-2">Subscribe for the latest updates</div>
          <div className="flex gap-6 mb-4">
            <a href="#" aria-label="Instagram" className="text-[#d4af37] hover:text-[#bfa233] text-2xl"><FaInstagram /></a>
            <a href="#" aria-label="Facebook" className="text-[#d4af37] hover:text-[#bfa233] text-2xl"><FaFacebookF /></a>
            <a href="#" aria-label="TikTok" className="text-[#d4af37] hover:text-[#bfa233] text-2xl"><FaTiktok /></a>
            <a href="#" aria-label="YouTube" className="text-[#d4af37] hover:text-[#bfa233] text-2xl"><FaYoutube /></a>
          </div>
        </div>
      </div>
      {/* Risk Warning, Restricted Countries, Disclaimer */}
      <div className="max-w-7xl mx-auto mt-12 text-xs text-gray-400 space-y-4">
        <div>
          <b>Risk Warning:</b> Trading Forex and CFDs carries a high level of risk to your capital and you should only trade with funds you can afford to lose. Trading Forex and CFDs may not be suitable for all investors, so please ensure that you fully understand the risks involved and seek independent advice if necessary. Please read and ensure you fully understand our Risk Disclosure.
        </div>
        <div>
          <b>Restricted Countries:</b> NexaExchange LTD does not provide services for residents of certain countries, including Israel, New Zealand, Iran, and North Korea (Democratic Peoples's Republic of Korea), or any country where such distribution or use would be contrary of local law or regulation. Furthermore, NexaExchange LTD does not solicit citizens of the United States of America. Please check with your local jurisdiction to determine if you are permitted to open an account with NexaExchange LTD.
        </div>
        <div>
          <b>Disclaimer:</b> The information provided herein reflects personal opinions and ideas and does not constitute a recommendation to purchase financial services or guarantee the performance or outcomes of future transactions. This material is not intended to be interpreted as financial advice. While every effort has been made to ensure the accuracy, validity and completeness of the information, no guarantees are provided and no liability is accepted for any losses incurred as a result of investments made based on this material. Nothing contained on this site should be considered or construed as professional advice from NexaExchange LTD, its affiliates, directors, officer, or employees.
        </div>
      </div>
    </footer>
  );
}
