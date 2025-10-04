import secure from "../assets/secure.png";
import wallet from "../assets/wallet.png";

export default function Features() {
  const features = [
    {
      title: "AI-Powered Trading",
      desc: "Leverage advanced artificial intelligence that analyzes markets 24/7, executing trades with precision to maximize consistent returns.",
      icon: <img src={secure} alt="AI Trading" className="w-24 md:w-20" />
    },
    {
      title: "Seamless Payments",
      desc: "Fund your account instantly using multiple payment methods — cards, crypto wallets, or local currencies — with smooth and reliable processing.",
      icon: <img src={wallet} alt="Payments" className="w-24 md:w-20" />
    },
    {
      title: "Guaranteed ROI Growth",
      desc: "Enjoy steady, automated ROI growth with our smart investment plans designed to multiply your capital over time while minimizing risks."
    },
    {
      title: "Bank-Level Security",
      desc: "Your funds and data are protected by top-tier encryption and security protocols, ensuring complete peace of mind while trading."
    }
  ];

  return (
    <section className="px-6 md:px-10 py-32 md:py-48">
      <h2 className="md:text-4xl text-2xl font-semibold text-center mb-12 font-azonix">
        Why Choose Us
      </h2>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-[#292003]/30 hover:scale-105 transition shadow-lg"
          >
            <span className="flex justify-center items-center w-full mb-6">
              {f.icon}
            </span>
            <h3 className="text-lg md:text-xl font-bold text-[#d4af37] mb-3 font-orbitron">
              {f.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
