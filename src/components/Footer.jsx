import { useMarketplace } from "../context/MarketplaceContext";

export const Footer = () => {
  const {
    setSelectedCategory,
    setSelectedCorridor,
    setActiveView,
    setIsRegisterFleetOpen,
    setIsYardCalcOpen
  } = useMarketplace();

  const handleNav = (view, fn) => {
    if (fn) fn();
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return <footer className="w-full bg-[#0B132B] text-[#CBD5E1] border-t border-[#1E293B] pt-14 pb-12 select-none">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1E293B]">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div
              onClick={() => handleNav("marketplace")}
              className="flex items-center gap-2 mb-3 cursor-pointer"
            >
              <div className="w-7 h-7 rounded bg-[#C66A20] text-white font-serif font-bold text-base flex items-center justify-center">
                V
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                VEHIK
              </span>
              <span className="text-[9px] font-mono tracking-widest font-semibold px-1 py-0.5 bg-[#172A46] text-[#ABC8F4] rounded border border-[#2C4A6F]">
                EQUIPMENT RENTAL
              </span>
            </div>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-4">
              India's trusted marketplace to rent heavy construction machinery and commercial transport vehicles with certified drivers and transparent prices.
            </p>
            <div className="text-xs font-mono text-[#CBD5E1] space-y-1">
              <div>Central Support: Ahmedabad & Mumbai</div>
              <div className="text-[#F59E0B]">Toll-Free: 1800-419-VEHIK</div>
            </div>
          </div>

          {/* Links Column 1: Machinery Types */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              Machinery Types
            </div>
            <ul className="text-xs space-y-2 text-[#94A3B8]">
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("cranes"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hydraulic & Mobile Cranes
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("trailers"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Heavy Transport Trailers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("backhoes"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  JCB & Backhoe Loaders
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("excavators"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Hydraulic Excavators & Breakers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("tippers"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Dump Trucks & Mining Tippers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("categories", () => setSelectedCategory("prime_movers"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Heavy Prime Movers & Trucks
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Locations & Hubs */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              Locations & Hubs
            </div>
            <ul className="text-xs space-y-2 text-[#94A3B8]">
              <li>
                <button
                  onClick={() => handleNav("routes", () => setSelectedCorridor("Sanand - Ahmedabad"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Sanand & Ahmedabad Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("routes", () => setSelectedCorridor("Mundra Port Siding"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Mundra Port & Kutch Hub
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("routes", () => setSelectedCorridor("JNPT Navi Mumbai"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Navi Mumbai & JNPT Port
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("routes", () => setSelectedCorridor("all"))}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Western Freight Arteries
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("routes")}
                  className="hover:text-white transition-colors cursor-pointer text-left text-amber-400"
                >
                  View All Staged Yards →
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: For Businesses & Owners */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              For Renters & Owners
            </div>
            <ul className="text-xs space-y-2 text-[#94A3B8]">
              <li>
                <button
                  onClick={() => handleNav("marketplace")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Rent Construction Machines
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsRegisterFleetOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  List Your Fleet to Earn
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsYardCalcOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Calculate Rental Earnings
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("customer_dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Customer Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("provider_dashboard")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fleet Owner Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 4: Safety & Guarantees */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-3">
              Safety & Guarantees
            </div>
            <ul className="text-xs space-y-2 text-[#94A3B8]">
              <li>
                <button
                  onClick={() => handleNav("why_rent")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  48-Point Safety Checks
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("why_rent")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Licensed Certified Drivers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("why_rent")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Safe Milestone Payments
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("routes")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Live GPS Location Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav("why_rent")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Capex vs Opex Savings
                </button>
              </li>
            </ul>
          </div>
        </div>

        {
    /* Legal & Regulatory Subtext */
  }
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] font-mono text-[#64748B]">
          <p className="max-w-3xl leading-relaxed">
            VEHIK makes it easy for builders, contractors, and industrial businesses to rent verified heavy commercial machinery directly from certified fleet owners with transparent pricing.
          </p>
          <div className="whitespace-nowrap text-[#94A3B8]">
            © 2026 VEHIK Machinery Rental Ltd.
          </div>
        </div>
      </div>
    </footer>;
};
