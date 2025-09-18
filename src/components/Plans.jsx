import Button from "@/components/UI/Button.jsx";

export default function Plans() {
  const plans = [
    { name: "Starter", price: "$50", benefits: ["Basic ROI Growth", "Secure Wallet", "Email Support"] },
    { name: "Pro", price: "$200", benefits: ["Higher ROI Growth", "Priority Support", "Multiple Payments"] },
    { name: "Elite", price: "$500", benefits: ["Max ROI Growth", "VIP Support", "All Payment Options"] },
  ];

  return (
    <section className="px-10 py-16 backdrop-blur" id="plans">
  <h2 className="text-3xl font-bold text-center mb-10 font-orbitron">Our Plans</h2>
  <div className="grid md:grid-cols-3 gap-8 font-orbitron">
        {plans.map((p, i) => (
          <div key={i} className="p-8 bg-[#292003]/40 rounded-2xl shadow-md text-center hover:scale-105 transition font-orbitron">
            <h3 className="text-2xl font-bold text-[#d4af37] -400 font-orbitron">{p.name}</h3>
            <p className="text-4xl font-extrabold my-4 font-orbitron">{p.price}</p>
            <ul className="text-gray-400 mb-6 font-orbitron">
              {p.benefits.map((b, j) => (
                <li key={j} className="mb-2 font-orbitron">✔ {b}</li>
              ))}
            </ul>
            <Button className="bg-[#d4af37] text-black w-full rounded-xl font-orbitron">
              Choose Plan
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}