export default function MobileHotCoins() {
  return (
  <div className="bg-[#111216] rounded-2xl p-4">
      <div className="text-sm font-bold text-[#bfa233] mb-2">Hot Coins</div>
      <div className="flex gap-2">
        <div className="flex-1 bg-[#23272f] rounded-lg p-3 flex flex-col items-center">
          <span className="text-xs text-gray-400">SOL</span>
          <span className="text-lg font-bold text-white">$123.45</span>
        </div>
        <div className="flex-1 bg-[#23272f] rounded-lg p-3 flex flex-col items-center">
          <span className="text-xs text-gray-400">ADA</span>
          <span className="text-lg font-bold text-white">$34.00</span>
        </div>
      </div>
    </div>
  );
}
