export default function MobileActionButtons() {
  const actions = [
    {label:'Buy',icon:'$'},
    {label:'Sell',icon:'⇄'},
    {label:'Send',icon:'⇧'},
    {label:'Receive',icon:'⇩'},
    {label:'Swap',icon:'⟳'}
  ];
  return (
    <div className="flex justify-between gap-2 mb-2">
      {actions.map((a) => (
        <button key={a.label} className="flex flex-col items-center flex-1 py-2 border border-[#181a20] rounded-lg text-[#bfa233] font-semibold text-xs">
          <span className="text-lg mb-1">{a.icon}</span>
          {a.label}
        </button>
      ))}
    </div>
  );
}
