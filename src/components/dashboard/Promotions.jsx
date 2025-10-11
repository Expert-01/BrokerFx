import React from "react";

const Promotions = () => {
  const promotions = [
    {
      title: "Welcome Bonus",
      description:
        "Get 20% bonus on your first deposit! Boost your trading capital instantly.",
      validity: "Valid until: 31st December 2025",
    },
    {
      title: "Refer a Friend",
      description:
        "Invite your friends and earn $50 for each successful referral.",
      validity: "No expiry",
    },
    {
      title: "Weekend Trading Boost",
      description:
        "Enjoy reduced trading fees and higher leverage every weekend.",
      validity: "Every Saturday & Sunday",
    },
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#000000] to-[#0a0a0a] text-[#f5e8c7] px-6 py-12 md:px-16 space-y-10">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#d4af37] mb-10">
          🎉 Promotions & Offers
        </h2>

        {promotions.length === 0 ? (
          <div className="text-center text-[#d4af37] text-lg font-medium">
            No current promotions.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#0d0d0d] to-[#1a1a1a] border border-[#d4af37]/20 rounded-2xl p-6 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[#f1d38a]">
                    {promo.title}
                  </h3>
                  <p className="text-[#f5e8c7]/90 mb-4 leading-relaxed">
                    {promo.description}
                  </p>
                  <p className="text-[#d4af37] text-sm font-medium mb-5">
                    {promo.validity}
                  </p>
                </div>
                <button className="w-full bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-semibold py-2.5 rounded-lg hover:from-[#e0c05a] hover:to-[#c9a227] transition-all duration-300">
                  Claim Now
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center text-[#d4af37]/90 text-sm italic">
          ✨ Stay tuned — more exciting promotions and bonuses are coming soon!
        </div>
      </div>
    </section>
  );
};

export default Promotions;
