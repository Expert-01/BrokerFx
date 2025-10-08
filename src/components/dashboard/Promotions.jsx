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
    <section className="bg-black text-yellow-100 p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold mb-4 border-b border-brown-700 pb-2">
        Promotions & Offers
      </h2>

      {promotions.length === 0 ? (
        <div className="text-yellow-300">No current promotions.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {promotions.map((promo, idx) => (
            <div
              key={idx}
              className="bg-brown-900 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-yellow-400"
            >
              <h3 className="text-xl font-semibold mb-2 text-yellow-300">
                {promo.title}
              </h3>
              <p className="text-yellow-200 mb-3">{promo.description}</p>
              <p className="text-yellow-400 text-sm mb-3">{promo.validity}</p>
              <button className="bg-yellow-400 text-black px-4 py-2 rounded-md font-semibold hover:bg-yellow-300 transition-colors duration-200">
                Claim Now
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 text-yellow-300 text-sm">
        Stay tuned! More exciting promotions and bonuses are coming soon.
      </div>
    </section>
  );
};

export default Promotions;
