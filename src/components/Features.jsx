import { Shield, Wallet, TrendingUp, Lock, Cpu, Layers } from "lucide-react";

export default function Features() {
  const features = [
    {
      title: "AI-Powered Automation",
      desc: "Our intelligent algorithms work 24/7 to analyze markets, execute trades, and minimize risks — ensuring stable ROI growth without human error.",
      icon: <Cpu className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "Consistent ROI",
      desc: "Enjoy predictable returns as our system optimizes entries and exits, giving you steady profit flow on your investments.",
      icon: <TrendingUp className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "Risk Management",
      desc: "Advanced strategies safeguard your capital, ensuring sustainable growth while protecting you from market volatility.",
      icon: <Shield className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "Secure & Transparent",
      desc: "Your funds are protected with top-level security, while real-time dashboards keep you updated on every transaction.",
      icon: <Lock className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "Hands-Free Trading",
      desc: "Focus on what matters to you while our system handles the trading — fully automated, always optimized.",
      icon: <Wallet className="w-12 h-12 text-yellow-400" />,
    },
    {
      title: "Scalable Investments",
      desc: "Start small or scale up — our AI adapts to your capital size, ensuring maximum efficiency at every level.",
      icon: <Layers className="w-12 h-12 text-yellow-400" />,
    },
  ];

  return (
    <section className="bg-[#031531] text-white py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-4 font-orbitron">
          Powerful Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Harness the power of AI-driven trading to secure consistent growth and maximize your returns.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-[#0a1d3a] border border-[#1f2d4d] rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition w-full text-center"
          >
            <div className="flex justify-center mb-6">{f.icon}</div>
            <h3 className="text-xl font-bold text-yellow-400 mb-3">{f.title}</h3>
            <p className="text-gray-300">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
      }
