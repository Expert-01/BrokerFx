import secure from "../assets/secure.png";
import wallet from "../assets/wallet.png";


export default function Features() {
  const features = [
    {
      title: "Secure Transactions",
      desc: "Top-level security ensures your investments are always safe. ",
      icon: <img src={secure} alt="Bitcoin" className="w-28 md:w-20" />
      
    },
    {
      title: "Multiple Payments",
      desc: "Deposit using cards, Digital Assets wallets, or local currencies.",
      icon: <img src={wallet} alt="Bitcoin" className="w-28 md:w-20" />

    },
    {
      title: "ROI Growth",
      desc: "Watch your wallet balance grow with automated ROI plans."
    }
  ];



  return (
  <section className="px-10 py-64 ">
  <h2 className="md:text-4xl text-xl font-semibold text-center mb-10 font-azonix">Powerful Features</h2>
  <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => ( 
          <div key={i} className="p-6 rounded-2xl bg-[#292003]/30 hover:scale-105 transition">
            <span className="flex justify-center items-center w-full mb-6">{f.icon}</span>

            <h3 className="text-xl font-bold text-[#d4af37] mb-3 font-orbitron">{f.title}</h3>
            <p className="text-gray-400 ">{f.desc}</p>
          </div>
        ))}
      </div>


    </section>
  );
}


