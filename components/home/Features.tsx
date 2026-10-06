// ============================================
// COCAVYN - Features Section
// Trust indicators: Delivery, Quality, Payment, Gift
// ============================================

export default function Features() {
  const features = [
    {
      icon: <TruckIcon />,
      title: "Fast Delivery",
      subtitle: "All Bangladesh",
    },
    {
      icon: <QualityIcon />,
      title: "100% Pure",
      subtitle: "Premium Quality",
    },
    {
      icon: <CashIcon />,
      title: "Cash on Delivery",
      subtitle: "Pay at your door",
    },
    {
      icon: <GiftIcon />,
      title: "Gift Wrapping",
      subtitle: "Beautiful packaging",
    },
  ];

  return (
    <section className="bg-white py-12 md:py-16 border-y border-cocoa/5">
      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon Circle */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-cream flex items-center justify-center mb-4 group-hover:bg-gold/20 group-hover:scale-110 transition-all duration-300 border-2 border-gold/30">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg md:text-xl font-bold text-cocoa-dark mb-1">
                {feature.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm text-gray">{feature.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Icons
// ============================================

function TruckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function QualityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function CashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <rect width="20" height="12" x="2" y="6" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cocoa-dark"
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8v13" />
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
    </svg>
  );
}