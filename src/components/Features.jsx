import { Shield, Wallet, TrendingUp, Lock, Cpu, Layers } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="bg-black text-white py-16 px-6 sm:px-12 lg:px-20">
      {/* Heading */}
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
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#292003]/30 backdrop-blur-md 
                       rounded-2xl p-8 sm:p-10 shadow-lg hover:shadow-2xl hover:scale-105 
                       transition-all w-full flex flex-col items-center justify-center text-center 
                       min-h-[280px] sm:min-h-[300px]"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-2">{f.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xs">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
