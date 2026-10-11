import { useMarketplace } from "../context/MarketplaceContext";
import { Calculator, PlusCircle } from "lucide-react";
export const PartnerNetworkBanner = () => {
  const { setIsRegisterFleetOpen, setIsYardCalcOpen } = useMarketplace();
  return <section className="py-10 px-4 sm:px-6 max-w-[1440px] mx-auto">
      <div className="bg-[#111F35] text-white border border-[#2C4A6F] rounded p-8 sm:p-12 shadow-xl relative overflow-hidden">
        {
    /* Subtle background decoration */
  }
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#172A46]/60 to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C66A20]" />
              <span className="text-[11px] font-mono tracking-widest text-[#ABC8F4] uppercase font-bold">
                For Equipment Owners & Transporters
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Earn more by renting out your <span className="italic font-normal text-[#C66A20]">idle machinery</span>
            </h2>

            <p className="text-sm sm:text-base text-[#CBD5E1] max-w-2xl leading-relaxed mb-8">
              Do you own cranes, trailers, JCBs, or excavators? Don't let them sit idle in your yard. List them on VEHIK to get regular booking requests from verified contractors and secure weekly payments.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-[#1E293B] max-w-xl">
              <div>
                <div className="text-lg sm:text-3xl font-mono font-bold text-white tabular-nums">₹340 Cr+</div>
                <div className="text-[9px] sm:text-[11px] font-mono uppercase text-[#94A3B8]">Paid to Owners</div>
              </div>
              <div className="border-l border-[#1E293B] pl-2.5 sm:pl-6">
                <div className="text-lg sm:text-3xl font-mono font-bold text-[#10B981] tabular-nums">95%+</div>
                <div className="text-[9px] sm:text-[11px] font-mono uppercase text-[#94A3B8]">Rented Days</div>
              </div>
              <div className="border-l border-[#1E293B] pl-2.5 sm:pl-6">
                <div className="text-lg sm:text-3xl font-mono font-bold text-[#FF964A] tabular-nums">7 Days</div>
                <div className="text-[9px] sm:text-[11px] font-mono uppercase text-[#94A3B8]">Payouts</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <button
    onClick={() => setIsRegisterFleetOpen(true)}
    className="w-full py-3.5 px-6 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
  >
              <PlusCircle className="w-4 h-4" />
              <span>List Your Equipment</span>
            </button>

            <button
    onClick={() => setIsYardCalcOpen(true)}
    className="w-full py-3 px-6 bg-[#172A46] hover:bg-[#213554] border border-[#2C4A6F] text-[#D6E3FF] text-xs font-mono font-semibold uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-2 cursor-pointer"
  >
              <Calculator className="w-4 h-4 text-[#ABC8F4]" />
              <span>Calculate Extra Earnings</span>
            </button>

            <p className="text-[10px] font-mono text-[#7987A2] text-center mt-1">
              Quick registration · Verified owners & secure payments
            </p>
          </div>
        </div>
      </div>
    </section>;
};
