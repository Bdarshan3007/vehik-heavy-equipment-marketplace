import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  MapPin,
  Calendar,
  Truck,
  ChevronDown,
  Search
} from "lucide-react";
export const SearchConsole = () => {
  const {
    capacityFilter,
    setCapacityFilter,
    selectedCategory,
    setSelectedCategory,
    selectedCorridor,
    setSelectedCorridor,
    riggerFilter,
    setRiggerFilter,
    loadChartFilter,
    setLoadChartFilter,
    turnkeyFuelFilter,
    setTurnkeyFuelFilter,
    geofenceFilter,
    setGeofenceFilter,
    searchQuery,
    setSearchQuery,
    showNotification
  } = useMarketplace();
  const [searchTab, setSearchTab] = useState("quick");

  const handleMatchFleet = () => {
    const filterSummary = [];
    if (capacityFilter > 0) filterSummary.push(`${capacityFilter}T+ capacity`);
    if (searchQuery.trim()) filterSummary.push(`"${searchQuery.trim()}"`);
    if (selectedCategory !== "all") filterSummary.push(selectedCategory);
    if (selectedCorridor !== "all") filterSummary.push(selectedCorridor);
    if (riggerFilter) filterSummary.push("rigger included");
    if (turnkeyFuelFilter) filterSummary.push("turnkey fuel");

    showNotification(
      filterSummary.length > 0
        ? `Found matching machines! Filtered for ${filterSummary.join(", ")}.`
        : "Displaying matching machines across the fleet."
    );
    const el = document.getElementById("featured-deployments");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const getCapacityLabel = (ton) => {
    if (ton <= 0) return "All Capacities (No Min Limit)";
    if (ton <= 20) return `${ton} Tons (Light Duty / Earthmoving)`;
    if (ton <= 75) return `${ton} Tons (Standard Construction Lift)`;
    if (ton <= 200) return `${ton} Tons (Heavy Industrial)`;
    return `${ton} Tons (Super Heavy Lift)`;
  };
  const getEstimatedShift = (ton) => {
    if (ton <= 0) return "From ₹16,500";
    if (ton <= 25) return "\u20B916,500";
    if (ton <= 60) return "\u20B928,500";
    if (ton <= 150) return "\u20B954,000";
    if (ton <= 300) return "\u20B998,000";
    return "\u20B91,45,000";
  };
  const getBoomReach = (ton) => {
    if (ton <= 0) return "All Reach Classes";
    if (ton <= 25) return "18 - 25m Boom";
    if (ton <= 60) return "38 - 45m Boom";
    if (ton <= 150) return "52 - 64m Boom";
    return "72 - 108m Boom";
  };
  const getMatchingUnits = (ton) => {
    if (ton <= 0) return "All Units";
    if (ton <= 25) return "246 Units";
    if (ton <= 60) return "128 Units";
    if (ton <= 150) return "45 Units";
    return "18 Units";
  };
  const categories = [
    { id: "all", label: "All Fleet", icon: "\u26A1" },
    { id: "cranes", label: "Hydraulic Cranes", icon: "\u{1F3D7}\uFE0F" },
    { id: "excavators", label: "Excavators & Breakers", icon: "\u{1F69C}" },
    { id: "trailers", label: "Lowbed Trailers", icon: "\u{1F69B}" },
    { id: "backhoes", label: "JCB Backhoes", icon: "\u{1F7E1}" },
    { id: "tippers", label: "Dump Tippers", icon: "\u{1F69A}" },
    { id: "prime_movers", label: "Prime Movers", icon: "\u{1F4E6}" }
  ];
  return <div className="max-w-[1440px] mx-auto px-3 sm:px-6 my-4 sm:my-6">
      <div className="bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg shadow-slate-200/40">
        
        {/* Top Rental Mode Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
          <div className="flex items-center gap-1.5 p-1 sm:p-1.5 bg-slate-100/80 rounded-2xl w-full sm:w-fit overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSearchTab("quick")}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${searchTab === "quick" ? "bg-white text-slate-900 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Standard Rental
            </button>
            <button
              onClick={() => setSearchTab("corridor")}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${searchTab === "corridor" ? "bg-white text-slate-900 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Long-Distance Transport
            </button>
            <button
              onClick={() => setSearchTab("bulk")}
              className={`px-3 sm:px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${searchTab === "bulk" ? "bg-white text-slate-900 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`}
            >
              Bulk Fleet (Multiple)
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] sm:text-xs">180+ Verified Owners Ready to Dispatch</span>
          </div>
        </div>

        {/* Quick Category Filter Pills */}
        <div className="py-3 sm:py-4 border-b border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap mr-1 sm:mr-2">
            Filter:
          </span>
          {categories.map((cat) => <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${selectedCategory === cat.id ? "bg-amber-500 text-slate-950 font-bold shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>)}
        </div>

        {/* Capacity Slider & Live Engineering Estimates */}
        <div className="py-4 sm:py-6 border-b border-slate-100">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Weight / Tonnage Capacity:
              </span>
              <span className="px-3 py-1 bg-amber-500/10 text-amber-800 font-bold text-xs rounded-full border border-amber-500/20">
                {getCapacityLabel(capacityFilter)}
              </span>
            </div>

            {/* Live Instant Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 text-xs">
              <div className="bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 uppercase text-[9px] sm:text-[10px] block font-medium">Available Fleet</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm">{getMatchingUnits(capacityFilter)} <span className="font-normal text-emerald-600 text-[10px] sm:text-[11px]">(Nearby)</span></span>
              </div>
              <div className="bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100">
                <span className="text-slate-400 uppercase text-[9px] sm:text-[10px] block font-medium">Est. Shift Rate</span>
                <span className="font-bold text-amber-700 font-mono text-xs sm:text-sm">{getEstimatedShift(capacityFilter)}</span>
              </div>
              <div className="bg-slate-50 px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-slate-400 uppercase text-[9px] sm:text-[10px] block font-medium">Max Reach</span>
                <span className="font-bold text-slate-900 font-mono text-xs sm:text-sm">{getBoomReach(capacityFilter)}</span>
              </div>
            </div>
          </div>

          {/* Slider bar with styled track */}
          <div className="relative pt-2 pb-2">
            <input
              type="range"
              min="0"
              max="500"
              step="5"
              value={capacityFilter}
              onChange={(e) => setCapacityFilter(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500 focus:outline-none"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] font-medium text-slate-400 mt-2">
              <span>0T (All)</span>
              <span className="hidden sm:inline">50T (Standard Crane)</span>
              <span className="sm:hidden">50T</span>
              <span>150T</span>
              <span className="hidden sm:inline">300T</span>
              <span>500T (Super Heavy)</span>
            </div>
          </div>
        </div>

        {/* Structured Selection Row: Search, Category, Location, Schedule, CTA */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 pt-6 items-end">
          {/* Keyword / Text Search */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Equipment / Model Search
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Liebherr, CAT, 50T..."
                className="w-full h-12 pl-10 pr-8 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer font-bold text-xs"
                  title="Clear search query"
                  aria-label="Clear search query"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Machine Type */}
          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Equipment Category
            </label>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-12 px-3.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Machinery Types (14,820 Units)</option>
                <option value="cranes">Mobile Hydraulic & All-Terrain Cranes</option>
                <option value="trailers">Multi-Axle & Lowbed Heavy Trailers</option>
                <option value="excavators">Hydraulic Excavators & Rock Breakers</option>
                <option value="backhoes">JCB & Backhoe Loaders</option>
                <option value="tippers">Dump Trucks & Heavy Tippers</option>
                <option value="prime_movers">Heavy Transport Trucks (Prime Movers)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              City / Work Location
            </label>
            <div className="relative">
              <select
                value={selectedCorridor}
                onChange={(e) => setSelectedCorridor(e.target.value)}
                className="w-full h-12 px-3.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer"
              >
                <option value="all">All Locations (Gujarat & Maharashtra)</option>
                <option value="Sanand - Ahmedabad">Sanand & Ahmedabad Industrial Hub</option>
                <option value="Mundra Port Siding">Mundra Port & Kutch Logistics</option>
                <option value="JNPT Navi Mumbai">Navi Mumbai & JNPT Port Corridor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Schedule & Duration */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Start Date & Duration
            </label>
            <div className="relative">
              <input
                type="text"
                defaultValue="Tomorrow (07:00 AM) · 4 Shifts"
                className="w-full h-12 px-3.5 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Submit Search Button */}
          <div className="md:col-span-2">
            <button
              onClick={handleMatchFleet}
              className="w-full h-12 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
              title="Find Matching Equipment"
              aria-label="Find Matching Equipment"
            >
              <Truck className="w-4 h-4" />
              <span>Find Matching Equipment</span>
            </button>
          </div>
        </div>

        {
    /* Safety & Service Options Checkboxes */
  }
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2.5 sm:gap-6 pt-4 sm:pt-6 text-xs text-slate-700">
          <label className="flex items-center gap-2.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200/60 sm:border-0 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={riggerFilter}
              onChange={(e) => setRiggerFilter(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer shrink-0"
            />
            <span className="font-medium group-hover:text-slate-900 transition-colors">
              Licensed Driver & Operator Included
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200/60 sm:border-0 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={loadChartFilter}
              onChange={(e) => setLoadChartFilter(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer shrink-0"
            />
            <span className="font-medium group-hover:text-slate-900 transition-colors">
              Safety Tested & Load Chart Certified
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200/60 sm:border-0 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={turnkeyFuelFilter}
              onChange={(e) => setTurnkeyFuelFilter(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer shrink-0"
            />
            <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Turnkey Fuel (Diesel) Available
            </span>
          </label>

          <label className="flex items-center gap-2.5 p-2 sm:p-0 rounded-xl bg-slate-50 sm:bg-transparent border border-slate-200/60 sm:border-0 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={geofenceFilter}
              onChange={(e) => setGeofenceFilter(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer shrink-0"
            />
            <span className="font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Live GPS Telematics
            </span>
          </label>
        </div>
      </div>
    </div>;
};
