import { useMarketplace } from "../context/MarketplaceContext";
import { AIRequirementParser } from "../components/AIRequirementParser";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Cpu,
  CheckCircle2,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";

export const AIMatcherPage = () => {
  const { setActiveView, setIsQuickRfqOpen } = useMarketplace();

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
            <span className="text-[#C66A20] font-bold">AI Requirement Matcher</span>
          </nav>

          <button
            onClick={() => setActiveView("marketplace")}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ECEEE8] text-[#111F35] text-xs font-mono font-semibold rounded-lg hover:bg-[#DCE1E7] transition-colors cursor-pointer"
          >
            <Truck className="w-3.5 h-3.5 text-[#C66A20]" />
            <span>Browse Full Catalog</span>
          </button>
        </div>

        {/* Hero Header */}
        <div className="bg-gradient-to-br from-[#111F35] via-[#172A46] to-[#0B132B] text-white rounded-2xl p-6 sm:p-10 border border-[#2C4A6F] shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INTELLIGENT EQUIPMENT SPECIFICATION ENGINE</span>
            </div>
            
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              AI-Powered Project <span className="italic text-[#FF964A]">Equipment Matching</span>
            </h1>
            
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6 font-sans">
              No need to know crane load charts, lowbed axle calculations, or boom configurations. Simply paste your job description or project tender snippet in plain words. Our AI parses engineering parameters, matches ready fleet units, and generates verified cost estimates in seconds.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero technical jargon required</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-cyan-300">
                <FileText className="w-3.5 h-3.5" />
                <span>Instant Tender Ledger Extraction</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 text-amber-300">
                <Zap className="w-3.5 h-3.5" />
                <span>Direct Mobilization Ready</span>
              </span>
            </div>
          </div>
        </div>

        {/* Embedded AI Requirement Parser Tool */}
        <div className="mb-12">
          <AIRequirementParser />
        </div>

        {/* How the AI Engine Works (Visual Process Breakdown) */}
        <div className="bg-white border border-[#D5DCE4] rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C66A20]">
              Automated Spec Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111F35] mt-1">
              How Our AI Matches Your Equipment Need
            </h2>
            <p className="text-xs sm:text-sm text-[#535F70] font-mono mt-2">
              Three streamlined steps from raw plain text to guaranteed on-site machine arrival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-[#F7F6F2] border border-[#E2E6EB] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#111F35] text-amber-400 font-mono font-bold flex items-center justify-center text-sm mb-4 shadow-md">
                  01
                </div>
                <h3 className="text-base font-bold text-[#111F35] mb-2">
                  Conversational Input
                </h3>
                <p className="text-xs text-[#535F70] leading-relaxed">
                  Enter your task description, location, duration, and material details. Use natural language, contractor slang, or raw tender notes.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5DCE4] text-[11px] font-mono text-[#2C4A6F] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#C66A20]" />
                <span>Natural Language Processing</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F7F6F2] border border-[#E2E6EB] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-[#C66A20] text-white font-mono font-bold flex items-center justify-center text-sm mb-4 shadow-md">
                  02
                </div>
                <h3 className="text-base font-bold text-[#111F35] mb-2">
                  Engineering Ledger Extraction
                </h3>
                <p className="text-xs text-[#535F70] leading-relaxed">
                  Our system computes required tonnage safety margins, boom envelope, ground bearing pressure, and corridor transit permits.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5DCE4] text-[11px] font-mono text-[#2C4A6F] flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>IS / BS Code Safety Verified</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F7F6F2] border border-[#E2E6EB] rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-sm mb-4 shadow-md">
                  03
                </div>
                <h3 className="text-base font-bold text-[#111F35] mb-2">
                  Instant Standby Fleet Lock
                </h3>
                <p className="text-xs text-[#535F70] leading-relaxed">
                  Matched against live GPS-verified yards in Sanand, Mundra, and JNPT. Lock rates with escrow payment protection and licensed operators.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#D5DCE4] text-[11px] font-mono text-[#2C4A6F] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Same-Day Mobilization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Complex Tender Support Banner */}
        <div className="bg-[#111F35] text-white border border-[#2C4A6F] rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Have an EPC Tender Document (PDF / Excel)?
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Submit Your Multi-Machine Project Tender
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1] font-sans leading-relaxed">
              If your site requires an entire machinery package (multiple 100T cranes, 12-axle lowbeds, and heavy diggers), our engineering desk will parse your BoQ and issue a composite rate within 2 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={() => setIsQuickRfqOpen(true)}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:from-amber-300 hover:to-amber-400 transition-transform active:scale-95 shadow-lg shadow-amber-500/25 cursor-pointer text-center"
            >
              Upload Tender / RFQ
            </button>
            <button
              onClick={() => setActiveView("marketplace")}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
            >
              Explore Catalog
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
