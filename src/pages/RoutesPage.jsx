import { useState, useMemo } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import { CorridorArtery } from "../components/CorridorArtery";
import { MachineImage } from "../components/MachineImage";
import { CORRIDOR_NODES } from "../data/mockData";
import {
  ArrowLeft,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
  Star,
  Bookmark,
  Layers,
  FileCheck,
  Filter,
  Navigation
} from "lucide-react";

export const RoutesPage = () => {
  const {
    listings,
    selectedCorridor,
    setSelectedCorridor,
    projectShifts,
    setProjectShifts,
    favorites,
    toggleFavorite,
    compareIds,
    toggleCompare,
    setActiveAuditListing,
    setActiveBookingListing,
    setActiveView,
    setIsQuickRfqOpen,
    showNotification
  } = useMarketplace();

  const [activeTabCorridor, setActiveTabCorridor] = useState(
    selectedCorridor === "all" ? "all" : selectedCorridor
  );

  const activeListings = useMemo(() => listings.filter((l) => !l.isPaused), [listings]);

  const hubOptions = useMemo(() => [
    { id: "all", label: "All Active Corridors", count: activeListings.length },
    {
      id: "Sanand - Ahmedabad",
      label: "Sanand - Ahmedabad (Auto Belt)",
      count: activeListings.filter((l) => (l.corridor || l.corridorHub) === "Sanand - Ahmedabad").length
    },
    {
      id: "Mundra Port Siding",
      label: "Mundra Port Siding (Maritime/Coal)",
      count: activeListings.filter((l) => (l.corridor || l.corridorHub) === "Mundra Port Siding").length
    },
    {
      id: "JNPT Navi Mumbai",
      label: "JNPT Navi Mumbai (Import/ODC)",
      count: activeListings.filter((l) => (l.corridor || l.corridorHub) === "JNPT Navi Mumbai").length
    }
  ], [activeListings]);

  const handleHubSelect = (hubId) => {
    setActiveTabCorridor(hubId);
    setSelectedCorridor(hubId);
    showNotification(
      hubId === "all"
        ? "Displaying fleet across all Western industrial corridors"
        : `Filtered machinery stationed at ${hubId}`
    );
  };

  const filteredFleet = useMemo(() => {
    return activeListings.filter((item) => {
      if (activeTabCorridor === "all") return true;
      return (item.corridor || item.corridorHub) === activeTabCorridor;
    });
  }, [activeListings, activeTabCorridor]);

  return (
    <div className="min-h-screen bg-[#F7F6F2] py-8 sm:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
        
        {/* Breadcrumb & Navigation Back */}
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
            <span className="text-[#C66A20] font-bold">Transport Routes & Corridors</span>
          </nav>

          <button
            onClick={() => setIsQuickRfqOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111F35] text-white text-xs font-mono font-semibold rounded-lg hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Request Express Transit RFQ</span>
          </button>
        </div>

        {/* Page Hero Header */}
        <div className="bg-gradient-to-br from-[#111F35] via-[#172A46] to-[#0B132B] text-white rounded-2xl p-6 sm:p-10 border border-[#2C4A6F] shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-400 text-xs font-mono font-semibold mb-3">
              <Navigation className="w-3.5 h-3.5" />
              <span>WESTERN INDUSTRIAL TRANSIT ARTERY</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-white mb-4">
              Strategic Transport Corridors & <span className="italic text-[#FF964A]">Standby Yards</span>
            </h1>
            <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed mb-6 font-sans">
              Access pre-inspected heavy mobile cranes, multi-axle modular trailers, and earthmovers staged at prime transport junctions between Mundra Port, Ahmedabad Industrial Corridor, and JNPT Mumbai for guaranteed rapid site mobilization.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#2C4A6F]/80">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-white">5 Hubs</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Staged Yards</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-amber-400">2 - 4 Hrs</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Avg Mobilization</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-emerald-400">140+ Units</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Ready on Standby</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <div className="text-2xl font-bold font-mono text-cyan-400">NHAI / Port</div>
                <div className="text-[11px] text-[#ABC8F4] font-mono mt-0.5">Permits Pre-Cleared</div>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Corridor Component */}
        <div className="mb-12">
          <CorridorArtery />
        </div>

        {/* Standby Fleet Section */}
        <div className="bg-white border border-[#D5DCE4] rounded-2xl p-6 sm:p-8 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E6EB] mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C66A20] mb-1">
                <MapPin className="w-4 h-4 text-[#C66A20]" />
                <span>Stationed Fleet Inventory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111F35]">
                Machinery Ready at Active Corridors
              </h2>
              <p className="text-xs sm:text-sm text-[#535F70] font-mono mt-1">
                Showing {filteredFleet.length} certified machines stationed for instant site mobilization.
              </p>
            </div>

            {/* Shift Rate Calculator */}
            <div className="flex items-center gap-2 bg-[#F7F6F2] p-2 rounded-xl border border-[#D5DCE4] shrink-0">
              <span className="text-xs font-mono text-[#535F70]">Project shifts:</span>
              <div className="flex items-center gap-1">
                {[1, 3, 7, 15].map((s) => (
                  <button
                    key={s}
                    onClick={() => setProjectShifts(s)}
                    className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-colors cursor-pointer ${
                      projectShifts === s
                        ? "bg-[#111F35] text-white shadow-sm"
                        : "bg-white text-[#535F70] hover:bg-[#E5E9EE]"
                    }`}
                  >
                    {s} {s === 1 ? "shift" : "shifts"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Corridor Selection Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
            {hubOptions.map((hub) => (
              <button
                key={hub.id}
                onClick={() => handleHubSelect(hub.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
                  activeTabCorridor === hub.id
                    ? "bg-[#C66A20] text-white shadow-md font-bold"
                    : "bg-[#ECEEE8] text-[#2C4A6F] hover:bg-[#DCE1E7]"
                }`}
              >
                <span>{hub.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTabCorridor === hub.id ? "bg-white/20 text-white" : "bg-white text-[#535F70]"
                }`}>
                  {hub.count}
                </span>
              </button>
            ))}
          </div>

          {/* Machinery Grid */}
          {filteredFleet.length === 0 ? (
            <div className="p-12 text-center bg-[#F7F6F2] rounded-xl border border-dashed border-[#CBD5E1]">
              <MapPin className="w-10 h-10 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="text-base font-bold text-[#111F35] mb-1">No standby machines at this specific node</h3>
              <p className="text-xs text-[#64748B] font-mono mb-4">
                Units can be mobilized from adjacent hubs within 4 hours.
              </p>
              <button
                onClick={() => handleHubSelect("all")}
                className="px-4 py-2 bg-[#111F35] text-white text-xs font-mono rounded-lg hover:bg-[#24334B] transition-colors cursor-pointer"
              >
                Show All Available Corridors
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFleet.map((machine) => {
                const isFav = favorites.includes(machine.id);
                const isCompared = compareIds.includes(machine.id);
                const totalCost = machine.baseRate * projectShifts;

                return (
                  <div
                    key={machine.id}
                    className="bg-[#FFFFFF] border border-[#D5DCE4] hover:border-[#2C4A6F] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Machine Image Preview with Badges */}
                      <div className="relative aspect-[16/10] bg-slate-900 overflow-hidden">
                        <MachineImage
                          id={machine.id}
                          category={machine.category}
                          title={machine.title || machine.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                        {/* Top Utility Badges */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 bg-slate-900/90 backdrop-blur-md text-amber-300 rounded-lg border border-amber-400/30">
                            {machine.capacityTons} Ton {machine.categoryName || machine.category}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => toggleCompare(machine.id)}
                              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                                isCompared
                                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                                  : "bg-slate-900/80 text-white/80 hover:text-white"
                              }`}
                              title={isCompared ? "Remove from comparison" : "Add to comparison"}
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => toggleFavorite(machine.id)}
                              className={`p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer ${
                                isFav
                                  ? "bg-emerald-500 text-white shadow-md"
                                  : "bg-slate-900/80 text-white/80 hover:text-white"
                              }`}
                              title={isFav ? "Saved to fleet" : "Save for later"}
                            >
                              <Bookmark className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Bottom Corridor Location Tag */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white">
                          <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
                            <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{machine.corridor || machine.depotCity || machine.corridorHub}</span>
                          </span>
                          <span className="flex items-center gap-1 bg-emerald-500/90 text-slate-950 font-bold px-2 py-0.5 rounded-md text-[10px]">
                            <Clock className="w-3 h-3" />
                            <span>{machine.dispatchWindow || (machine.availability === "READY_IMMEDIATE" ? "Immediate Dispatch" : "Standby Hub")}</span>
                          </span>
                        </div>
                      </div>

                      {/* Machine Details */}
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-base font-bold text-[#111F35] leading-snug line-clamp-1">
                            {machine.title || machine.name}
                          </h3>
                          <div className="flex items-center gap-1 text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                            <span className="font-bold">{machine.rating}</span>
                          </div>
                        </div>

                        <p className="text-xs text-[#535F70] line-clamp-2 leading-relaxed mb-4">
                          {machine.description || machine.specs || machine.assetClass}
                        </p>

                        {/* Specs Highlights */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#334155] bg-[#F7F6F2] p-2.5 rounded-xl border border-[#E2E6EB] mb-4">
                          <div>
                            <span className="text-[#64748B] block text-[9px] uppercase">Reach / Size</span>
                            <span className="font-semibold">{machine.boomReach || (machine.boomLengthMeters ? `${machine.boomLengthMeters}m Reach` : machine.deckLengthMeters ? `${machine.deckLengthMeters}m Deck` : `${machine.capacityTons}T Cap`)}</span>
                          </div>
                          <div>
                            <span className="text-[#64748B] block text-[9px] uppercase">Certified Crew</span>
                            <span className="font-semibold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Included
                            </span>
                          </div>
                        </div>

                        {/* Audit Verification Link */}
                        <button
                          onClick={() => setActiveAuditListing(machine)}
                          className="w-full flex items-center justify-between text-[11px] font-mono text-[#2C4A6F] hover:text-[#111F35] py-1.5 border-t border-[#E2E6EB] transition-colors cursor-pointer"
                        >
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <FileCheck className="w-3.5 h-3.5" />
                            <span>NDT 48-Point Audit Verified</span>
                          </span>
                          <span className="text-xs font-bold">Inspect →</span>
                        </button>
                      </div>
                    </div>

                    {/* Pricing & Booking CTA Footer */}
                    <div className="p-5 pt-0">
                      <div className="bg-[#111F35] text-white p-3.5 rounded-xl flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-mono text-[#ABC8F4]">
                            Base: ₹{machine.baseRate.toLocaleString("en-IN")}/{machine.unitLabel || machine.rateUnit || "shift"}
                          </div>
                          <div className="text-sm font-mono font-bold text-white">
                            ₹{totalCost.toLocaleString("en-IN")}
                            <span className="text-[10px] font-normal text-[#94A3B8] ml-1">
                              ({projectShifts} {projectShifts === 1 ? "shift" : "shifts"})
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => setActiveBookingListing(machine)}
                          className="px-3.5 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-mono font-bold text-xs rounded-lg transition-transform active:scale-95 shadow-md shadow-amber-500/20 cursor-pointer"
                        >
                          Rent Unit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Corridor Transit RFQ Section */}
        <div className="bg-[#172A46] text-white border border-[#2C4A6F] rounded-2xl p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
              Custom Heavy Transport & Turnkey Rigging
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Need Multi-Corridor Transport or Multi-Axle Pulling?
            </h3>
            <p className="text-xs sm:text-sm text-[#CBD5E1] font-sans leading-relaxed">
              If your equipment requires specialized NHAI route clearance, highway escort pilots, or heavy hydraulic axle modules across Gujarat & Maharashtra borders, our corridor dispatch coordinators handle end-to-end logistics.
            </p>
          </div>

          <button
            onClick={() => setIsQuickRfqOpen(true)}
            className="w-full md:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:from-amber-300 hover:to-amber-400 transition-transform active:scale-95 shadow-lg shadow-amber-500/25 shrink-0 cursor-pointer"
          >
            Request Corridor Logistics RFQ
          </button>
        </div>

      </div>
    </div>
  );
};
