import React, { useEffect, useState, useRef } from "react";

function useCountUp(end, duration = 2000, startAnimation) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!startAnimation) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setValue(end);
        clearInterval(timer);
      } else {
        setValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration, startAnimation]);
  return value;
}

export default function TrustedStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const traders = useCountUp(281, 1500, inView);
  const partners = useCountUp(650, 1500, inView);
  const commissions = useCountUp(2.8, 1500, inView); // millions
  const speed = useCountUp(3, 1500, inView); // ms
  const withdrawals = useCountUp(500, 1500, inView);

  return (
    <section ref={ref} className="py-20 text-center font-obitron bg-[#000]/50 md:mt-0 mt-[100vh]">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
        TRUSTED GLOBALLY.{" "}
        <span className="text-[#ffce1ebe]">TRADED DAILY.</span>
      </h2>
      <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
        When it comes to trading, trust isn’t claimed — it’s earned. EliteFx
        supports hundreds of thousands of traders and partners around the world
        with real infrastructure, real payouts, and execution built for
        performance. The numbers speak for themselves.
      </p>
      <button className="bg-[#ffce1ebe] hover:bg-[#ffd966] text-black px-8 py-3 rounded-full font-semibold shadow-lg transition mb-12">
        START TRADING &rarr;
      </button>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-16 mt-10">
        <div>
          <span className="text-4xl md:text-5xl font-bold text-white">
            {traders} <span className="text-[#ffce1ebe]">k</span>
          </span>
          <div className="text-base text-white mt-2">Traders World-wide</div>
        </div>
        <div>
          <span className="text-4xl md:text-5xl font-bold text-white">
            {partners} <span className="text-[#ffce1ebe]">+</span>
          </span>
          <div className="text-base text-white mt-2">Referring Partners</div>
        </div>
        <div>
          <span className="text-4xl md:text-5xl font-bold text-white">
            ${commissions.toFixed(1)}<span className="text-[#ffce1ebe]">M</span>
          </span>
          <div className="text-base text-white mt-2">IB Commissions Paid</div>
        </div>
        <div>
          <span className="text-4xl md:text-5xl font-bold text-white">
            &lt;{speed} <span className="text-[#ffce1ebe]">ms</span>
          </span>
          <div className="text-base text-white mt-2">Execution Speed</div>
        </div>
        <div>
          <span className="text-4xl md:text-5xl font-bold text-white">
            +{withdrawals} <span className="text-[#ffce1ebe]">k</span>
          </span>
          <div className="text-base text-white mt-2">Withdrawals Processed</div>
        </div>
      </div>
    </section>
  );
}
