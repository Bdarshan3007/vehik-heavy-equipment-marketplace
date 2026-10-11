import { useMarketplace } from "../context/MarketplaceContext";
import { AssuranceStandard } from "../components/AssuranceStandard";
import { PartnerNetworkBanner } from "../components/PartnerNetworkBanner";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileCheck,
  Zap,
  TrendingUp,
  Clock,
  Coins,
  Truck,
  PlusCircle,
  Calculator
} from "lucide-react";

export const WhyRentPage = () => {
  const {
    setActiveView,
    setIsQuickRfqOpen,
    setIsRegisterFleetOpen,
    setIsYardCalcOpen
  } = useMarketplace();

  const comparisonRows = [
    {
      metric: "Upfront Capital Investment (Capex)",
      buying: "₹1.5 Cr to ₹5.5 Cr tied up in purchase and financing",
      renting: "₹0 Capex. Zero initial equipment debt or loans",
      winner: "renting"
    },
    {
      metric: "Depreciation & Resale Value Loss",
      buying: "15% - 22% annual depreciation in book value",
      renting: "Zero depreciation risk. 100% operational expense (Opex)",
      winner: "renting"
    },
    {
      metric: "Maintenance, Hydraulics & Spare Parts",
      buying: "₹2.5L to ₹4.0L/month per machine + unscheduled breakdown risks",
      renting: "100% provider & VEHIK responsibility with free 4-hr replacement",
      winner: "renting"
    },
    {
      metric: "Skilled Operator & Rigger Crew",
      buying: "Full-time payroll, PF/ESI, training, and absenteeism liabilities",
      renting: "Certified, RTO-licensed operators included on every shift",
      winner: "renting"
    },
    {
      metric: "Tax Advantages & Balance Sheet Health",
      buying: "Asset locked on books, lengthy multi-year depreciation schedules",
      renting: "Direct 100% GST input tax credit & operational expense deduction",
      winner: "renting"
    },
    {
      metric: "Fleet Flexibility Across Projects",
      buying: "Locked to one machine model regardless of project terrain",
      renting: "Deploy 50T crane today, 22T excavator tomorrow, lowbed trailer next week",
      winner: "renting"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav className="flex items-center gap-2 text-xs font-mono text-[#535F70]">
            <button
              onClick={() => setActiveView("marketplace")}
              className="hover:text-[#111F35] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Browse Fleet</span>
            </button>
            <span>/</span>
            <span className="text-[#C66A20] font-bold">Why Rent With VEHIK</span>
          </nav>

          <button
            onClick={() => setIsQuickRfqOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111F35] text-white text-xs font-mono font-semibold rounded-lg hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Instant RFQ</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#111F35] via-[#172A46] to-[#0B132B] text-white rounded-2xl p-6 sm:p-10 border border-[#2C4A6F] shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>THE VEHIK ASSURANCE STANDARD</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Guaranteed Equipment Safety & <span className="italic text-[#FF964A]">Cost Efficiency</span>
            </h1>

            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6 font-sans">
              Stop letting idle heavy machinery drain your company balance sheet. Renting through VEHIK provides verified, certified construction equipment and heavy transport on-demand, backed by 48-point safety audits, licensed operators, and milestone escrow protection.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#2C4A6F]/80">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-emerald-400">48-Point</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Physical Safety Audit</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-amber-400">100%</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Licensed Operators</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-cyan-400">Escrow</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Milestone Payment Security</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-white">4 Hours</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Breakdown Replacement</div>
              </div>
            </div>
          </div>
        </div>

        {/* Capex vs Opex Cost Arbitrage Comparison Table */}
        <div className="bg-white border border-[#D5DCE4] rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C66A20]">
              Financial Analysis
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111F35] mt-1">
              Buying Equipment vs Renting on VEHIK
            </h2>
            <p className="text-xs sm:text-sm text-[#535F70] font-mono mt-2">
              Why leading EPC contractors and industrial builders choose operational rental over ownership capital drag.
            </p>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-[#D5DCE4] text-xs font-mono text-[#535F70]">
                  <th className="pb-4 font-bold uppercase tracking-wider w-1/3">Cost / Operational Parameter</th>
                  <th className="pb-4 font-bold uppercase tracking-wider w-1/3 text-rose-900 bg-rose-50/50 p-2 rounded-t-lg">
                    Owning Machinery (Capex)
                  </th>
                  <th className="pb-4 font-bold uppercase tracking-wider w-1/3 text-emerald-900 bg-emerald-50/50 p-2 rounded-t-lg">
                    Renting via VEHIK (Opex)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EB] text-xs">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#F7F6F2]/60 transition-colors">
                    <td className="py-4 font-semibold text-[#111F35] font-sans">
                      {row.metric}
                    </td>
                    <td className="py-4 text-[#535F70] bg-rose-50/20 px-3">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                        <span>{row.buying}</span>
                      </div>
                    </td>
                    <td className="py-4 font-medium text-[#111F35] bg-emerald-50/20 px-3">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold text-emerald-950">{row.renting}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Embedded Assurance Standard Component */}
        <div className="mb-12">
          <AssuranceStandard />
        </div>

        {/* Embedded Partner Network & Fleet Monetization Banner */}
        <div className="mb-12">
          <PartnerNetworkBanner />
        </div>

        {/* Final Conversion CTAs */}
        <div className="bg-[#111F35] text-white border border-[#2C4A6F] rounded-2xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-3">
            Ready to Streamline Your Project Fleet?
          </h3>
          <p className="text-xs sm:text-sm text-[#CBD5E1] max-w-xl mx-auto mb-8 font-mono">
            Get instant access to verified mobile cranes, multi-axle trailers, JCB backhoes, and excavators across all major industrial corridors.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActiveView("marketplace")}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:from-amber-300 hover:to-amber-400 transition-transform active:scale-95 shadow-lg shadow-amber-500/25 cursor-pointer flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4" />
              <span>Browse All Equipment</span>
            </button>
            <button
              onClick={() => setIsYardCalcOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4 text-amber-400" />
              <span>Calculate Fleet Earnings</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
