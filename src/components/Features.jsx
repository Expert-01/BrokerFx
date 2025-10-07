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
    <section className="bg-black text-white py-16 px-6 sm:px-10 lg:px-20">
      {/* Section Heading */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#ffce1ebe] mb-4 font-orbitron">
          Powerful Features
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Harness the power of AI-driven trading to secure consistent growth and maximize your returns.
        </p>
      </div>

      {/* Features Grid */}
      <div className="flex flex-col items-center gap-10">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-[#292003]/30 backdrop-blur-md 
                       rounded-2xl p-10 sm:p-12 shadow-lg hover:shadow-[0_0_25px_rgba(255,215,0,0.25)]
                       hover:border-yellow-400/50 hover:scale-[1.03]
                       transition-all duration-300 w-full sm:w-[90%] md:w-[80%] lg:w-[70%]
                       flex flex-col items-center justify-center text-center min-h-[280px]"
          >
            <div className="absolute inset-0 rounded-2xl border border-yellow-400/10 blur-md"></div>
            <div className="flex justify-center mb-4 relative z-10">{f.icon}</div>
            <h3 className="text-xl font-bold text-[#ffce1ebe] mb-2 relative z-10">{f.title}</h3>
            <p className="text-gray-300 text-base leading-relaxed max-w-md relative z-10">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
