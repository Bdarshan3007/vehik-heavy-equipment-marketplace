import { FileCheck, Users, ShieldCheck, Cpu } from "lucide-react";
import { useMarketplace } from "../context/MarketplaceContext";
export const AssuranceStandard = () => {
  const { listings, setActiveAuditListing } = useMarketplace();
  return <section id="capex-protocol" className="py-12 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="text-[11px] font-mono uppercase tracking-widest text-[#535F70] font-bold mb-1">
          Why Rent With Us?
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111F35] tracking-tight">
          Guaranteed Quality, Safety & <span className="italic font-normal text-[#C66A20]">Peace of Mind</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#535F70] mt-2 font-mono">
          Every machine on VEHIK is physically inspected and backed by experienced, certified drivers before reaching your site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
    /* Card 1 */
  }
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-[#ECEEE8] text-[#111F35] flex items-center justify-center mb-4">
              <FileCheck className="w-5 h-5 text-[#1E6347]" />
            </div>
            <h3 className="text-base font-bold text-[#111F35] mb-2 leading-snug">
              48-Point Safety Checkup
            </h3>
            <p className="text-xs text-[#535F70] leading-relaxed mb-6">
              Complete pre-dispatch check of hydraulics, brakes, wire ropes, and engine systems before dispatch.
            </p>
          </div>
          <button
    onClick={() => {
      const crane = listings.find((l) => l.id === "eq-01") || listings[0];
      setActiveAuditListing(crane);
    }}
    className="text-[11px] font-mono font-semibold text-[#2C4A6F] hover:text-[#111F35] border-t border-[#E2E6EB] pt-3 text-left flex items-center justify-between cursor-pointer"
  >
            <span>View Safety Certificate</span>
            <span>→</span>
          </button>
        </div>

        {
    /* Card 2 */
  }
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-[#ECEEE8] text-[#111F35] flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-[#C66A20]" />
            </div>
            <h3 className="text-base font-bold text-[#111F35] mb-2 leading-snug">
              Licensed & Certified Drivers
            </h3>
            <p className="text-xs text-[#535F70] leading-relaxed mb-6">
              Every machine comes with an experienced, verified operator holding official RTO heavy vehicle commercial licenses.
            </p>
          </div>
          <div className="text-[11px] font-mono font-semibold text-[#1E6347] border-t border-[#E2E6EB] pt-3">
            100% Verified Operators
          </div>
        </div>

        {
    /* Card 3 */
  }
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-[#ECEEE8] text-[#111F35] flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5 text-[#111F35]" />
            </div>
            <h3 className="text-base font-bold text-[#111F35] mb-2 leading-snug">
              100% Safe Payments
            </h3>
            <p className="text-xs text-[#535F70] leading-relaxed mb-6">
              Your payment is held safely and only released when the machinery arrives at your site and completes the shift.
            </p>
          </div>
          <div className="text-[11px] font-mono font-semibold text-[#535F70] border-t border-[#E2E6EB] pt-3">
            Zero Payment Risk
          </div>
        </div>

        {
    /* Card 4 */
  }
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded bg-[#ECEEE8] text-[#111F35] flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <h3 className="text-base font-bold text-[#111F35] mb-2 leading-snug">
              Live GPS & Work Tracking
            </h3>
            <p className="text-xs text-[#535F70] leading-relaxed mb-6">
              Track live machine location, working hours, fuel usage, and route progress directly from your phone.
            </p>
          </div>
          <div className="text-[11px] font-mono font-semibold text-[#2C4A6F] border-t border-[#E2E6EB] pt-3">
            Live Mobile Tracking
          </div>
        </div>
      </div>
    </section>;
};
