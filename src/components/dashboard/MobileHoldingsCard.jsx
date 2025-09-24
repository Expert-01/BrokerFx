export default function MobileHoldingsCard() {
  return (
    <div className="p-4">
      <div className="text-base font-semibold text-white mb-4">Your Holdings</div>
      <div className="flex flex-col gap-3">
        {/* Bitcoin */}
          <div className="flex items-center bg-[#111216] rounded-xl px-4 py-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa233]/20 mr-4">
              {/* Bitcoin SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#bfa233"/><text x="12" y="16" textAnchor="middle" fontSize="14" fill="#111216" fontWeight="bold">₿</text></svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base">Bitcoin</div>
              <div className="text-xs text-gray-400">1.24 BTC</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-white font-bold text-lg">$45,678</div>
              <div className="text-[#bfa233] text-sm font-semibold">+5.92%</div>
            </div>
          </div>
        {/* Ethereum */}
          <div className="flex items-center bg-[#111216] rounded-xl px-4 py-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa233]/20 mr-4">
              {/* Ethereum SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#bfa233"/><polygon points="12,5 19,12 12,19 5,12" fill="#111216"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base">Ethereum</div>
              <div className="text-xs text-gray-400">4.3% ETH</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-white font-bold text-lg">$32,456</div>
              <div className="text-[#bfa233] text-sm font-semibold">+1.67%</div>
            </div>
          </div>
        {/* SOL */}
          <div className="flex items-center bg-[#111216] rounded-xl px-4 py-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#bfa233]/20 mr-4">
              {/* SOL SVG */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#bfa233"/><rect x="6" y="8" width="12" height="2" rx="1" fill="#111216"/><rect x="6" y="14" width="12" height="2" rx="1" fill="#d7263d"/></svg>
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-base">SOL</div>
              <div className="text-xs text-gray-400">$31 ADA</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-white font-bold text-lg">$12,341</div>
              <div className="text-[#d7263d] text-sm font-semibold">+3.67%</div>
            </div>
          </div>
      </div>
    </div>
  );
}
