import React from "react";

export default function Footer() {
  return (
  <footer className="w-full bg-[#070500] text-gray-400 py-8 mt-12 border-t border-gray-800 font-orbitron">
  <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-orbitron">
  <div className="text-lg font-bold text-yellow-400 font-orbitron">EliteFx</div>
  <div className="text-sm font-orbitron">&copy; {new Date().getFullYear()} EliteFx. All rights reserved.</div>
  <div className="flex gap-4 font-orbitron">
          <a href="#" className="hover:text-yellow-400 font-orbitron">Privacy Policy</a>
          <a href="#" className="hover:text-yellow-400 font-orbitron">Terms</a>
          <a href="#" className="hover:text-yellow-400 font-orbitron">Contact</a>
        </div>
      </div>
    </footer>
  );
}
