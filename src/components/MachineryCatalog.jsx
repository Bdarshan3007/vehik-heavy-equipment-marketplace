import { useMemo } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  ShieldCheck,
  MapPin,
  Star,
  Bookmark,
  Layers,
  FileCheck,
  ArrowRight,
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { MachineImage } from "./MachineImage";
export const MachineryCatalog = () => {
  const {
    listings,
    providers,
    setSelectedProvider,
    selectedCategory,
    setSelectedCategory,
    selectedCorridor,
    setSelectedCorridor,
    capacityFilter,
    setCapacityFilter,
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
    resetFilters,
    projectShifts,
    setProjectShifts,
    favorites,
    toggleFavorite,
    compareIds,
    toggleCompare,
    setActiveAuditListing,
    setActiveBookingListing
  } = useMarketplace();

  const handleResetFilters = () => {
    if (resetFilters) {
      resetFilters();
    } else {
      setSelectedCategory("all");
      setSelectedCorridor("all");
      setCapacityFilter(0);
      setSearchQuery("");
      setRiggerFilter(false);
      setTurnkeyFuelFilter(false);
      setLoadChartFilter(false);
      setGeofenceFilter(false);
    }
  };

  const categories = [
    { id: "all", label: "All Fleet", icon: "⚡" },
    { id: "cranes", label: "Hydraulic Cranes", icon: "🏗️" },
    { id: "trailers", label: "Lowbed Trailers", icon: "🚛" },
    { id: "excavators", label: "Excavators", icon: "🚜" },
    { id: "backhoes", label: "JCB Backhoes", icon: "🟡" },
    { id: "tippers", label: "Mining Tippers", icon: "🚚" },
    { id: "prime_movers", label: "Prime Movers", icon: "📦" }
  ];

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (item.isPaused) return false;

      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      if (selectedCorridor !== "all" && (item.corridor || item.corridorHub) !== selectedCorridor) {
        return false;
      }

      if (capacityFilter && capacityFilter > 0) {
        const cap = Number(item.capacityTons);
        if (isNaN(cap) || cap < capacityFilter) {
          return false;
        }
      }

      if (riggerFilter && !item.riggerIncluded) {
        return false;
      }

      if (turnkeyFuelFilter && !item.turnkeyFuelAvailable) {
        return false;
      }

      if (loadChartFilter && !item.loadChartValid) {
        return false;
      }

      if (geofenceFilter && !item.gpsTelematicsEnabled) {
        return false;
      }

      if (searchQuery && searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = item.title?.toLowerCase().includes(q);
        const assetClassMatch = item.assetClass?.toLowerCase().includes(q);
        const categoryNameMatch = item.categoryName?.toLowerCase().includes(q);
        const descMatch = item.description?.toLowerCase().includes(q);
        const regMatch = item.registrationCode?.toLowerCase().includes(q);
        const providerMatch = item.providerName?.toLowerCase().includes(q);
        const corridorMatch = (item.corridor || item.corridorHub)?.toLowerCase().includes(q);
        if (
          !titleMatch &&
          !assetClassMatch &&
          !categoryNameMatch &&
          !descMatch &&
          !regMatch &&
          !providerMatch &&
          !corridorMatch
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    listings,
    selectedCategory,
    selectedCorridor,
    capacityFilter,
    riggerFilter,
    turnkeyFuelFilter,
    loadChartFilter,
    geofenceFilter,
    searchQuery
  ]);
  const getDiscountPercent = (shifts) => {
    if (shifts >= 20) return 18;
    if (shifts >= 10) return 12;
    if (shifts >= 5) return 6;
    return 0;
  };
  const discountPercent = getDiscountPercent(projectShifts);
  const calculateTotal = (listing) => {
    let base = listing.baseRate;
    if (listing.tariffBasis === "hourly") {
      base = listing.allInDayRate || listing.baseRate * 8;
    } else if (listing.tariffBasis === "loaded_km") {
      base = listing.allInDayRate || 25e3;
    }
    const rawTotal = base * projectShifts;
    const discounted = rawTotal * (1 - discountPercent / 100);
    return Math.round(discounted);
  };
  return <section id="featured-deployments" className="py-10 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20">
      {
    /* Section Header */
  }
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AVAILABLE FLEET FOR INSTANT RENTAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Verified Machinery Ready to <span className="italic font-normal text-amber-600">Rent</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
            Every machine is safety-inspected and ready for immediate deployment. Adjust rental days below to calculate total cost and volume discounts.
          </p>
        </div>

        {
    /* Location Hub Filter Tabs */
  }
        <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl text-xs font-medium">
          {[
    { id: "all", label: "All Locations" },
    { id: "Sanand - Ahmedabad", label: "Sanand & Ahmedabad" },
    { id: "Mundra Port Siding", label: "Mundra & Kutch Port" },
    { id: "JNPT Navi Mumbai", label: "Navi Mumbai & JNPT" }
  ].map((tab) => <button
    key={tab.id}
    onClick={() => setSelectedCorridor(tab.id)}
    className={`px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${selectedCorridor === tab.id ? "bg-white text-slate-900 shadow-sm font-bold" : "text-slate-600 hover:text-slate-900"}`}
  >
              {tab.label}
            </button>)}
        </div>
      </div>

      {/* Primary Category Quick Switcher Strip */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => {
          const count = cat.id === "all" 
            ? listings.filter((l) => !l.isPaused).length 
            : listings.filter((l) => !l.isPaused && l.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 border ${
                isSelected 
                  ? "bg-slate-900 text-white border-slate-900 shadow-sm" 
                  : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-slate-50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-100 text-slate-500"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Filter Chips (if any filter is applied) */}
      {(selectedCategory !== "all" ||
        selectedCorridor !== "all" ||
        (capacityFilter && capacityFilter > 0) ||
        Boolean(searchQuery && searchQuery.trim()) ||
        riggerFilter ||
        turnkeyFuelFilter ||
        loadChartFilter ||
        geofenceFilter) && (
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">Active Filters:</span>
          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Category: {categories.find((c) => c.id === selectedCategory)?.label || selectedCategory}</span>
              <button onClick={() => setSelectedCategory("all")} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear category filter">✕</button>
            </span>
          )}
          {selectedCorridor !== "all" && (
            <span className="inline-flex items-center gap-1.5 bg-blue-500/10 text-blue-900 border border-blue-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Location: {selectedCorridor}</span>
              <button onClick={() => setSelectedCorridor("all")} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear location filter">✕</button>
            </span>
          )}
          {capacityFilter > 0 && (
            <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-900 border border-amber-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Min Capacity: {capacityFilter}T+</span>
              <button onClick={() => setCapacityFilter(0)} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear capacity filter">✕</button>
            </span>
          )}
          {searchQuery && searchQuery.trim() !== "" && (
            <span className="inline-flex items-center gap-1.5 bg-purple-500/10 text-purple-900 border border-purple-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Search: "{searchQuery.trim()}"</span>
              <button onClick={() => setSearchQuery("")} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear text search">✕</button>
            </span>
          )}
          {riggerFilter && (
            <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-900 border border-emerald-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Driver/Rigger Included</span>
              <button onClick={() => setRiggerFilter(false)} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear rigger requirement">✕</button>
            </span>
          )}
          {turnkeyFuelFilter && (
            <span className="inline-flex items-center gap-1.5 bg-orange-500/10 text-orange-900 border border-orange-500/20 px-3 py-1 rounded-full font-semibold">
              <span>Turnkey Fuel Available</span>
              <button onClick={() => setTurnkeyFuelFilter(false)} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear turnkey fuel requirement">✕</button>
            </span>
          )}
          {loadChartFilter && (
            <span className="inline-flex items-center gap-1.5 bg-slate-200 text-slate-800 border border-slate-300 px-3 py-1 rounded-full font-semibold">
              <span>Load Chart Certified</span>
              <button onClick={() => setLoadChartFilter(false)} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear load chart filter">✕</button>
            </span>
          )}
          {geofenceFilter && (
            <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-900 border border-cyan-500/20 px-3 py-1 rounded-full font-semibold">
              <span>GPS Telematics</span>
              <button onClick={() => setGeofenceFilter(false)} className="hover:text-red-600 cursor-pointer font-bold ml-1" title="Clear GPS filter">✕</button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-[11px] font-mono text-slate-500 hover:text-amber-600 underline cursor-pointer ml-1"
          >
            Clear all filters ({filteredListings.length} matching)
          </button>
        </div>
      )}

      {/* Interactive Project Duration & Discount Calculator Strip */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0 border border-amber-500/20">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Multi-Day Rental Calculator & Savings
            </div>
            <div className="text-xs text-slate-500">
              Drag slider to calculate project shifts. Book 5+ days to get up to 18% volume discount!
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-1 max-w-md w-full">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-xs font-mono font-bold text-slate-900 whitespace-nowrap bg-slate-100 px-3 py-1 rounded-lg">
              {projectShifts} {projectShifts === 1 ? "Shift / Day" : "Shifts / Days"}
            </span>
            <div className="text-xs font-semibold whitespace-nowrap sm:hidden">
              {discountPercent > 0 ? (
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-lg border border-emerald-200 flex items-center gap-1 text-[11px]">
                  <Sparkles className="w-3 h-3" />
                  -{discountPercent}%
                </span>
              ) : (
                <span className="text-slate-400 text-[11px]">Standard</span>
              )}
            </div>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            value={projectShifts}
            onChange={(e) => setProjectShifts(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="text-xs font-semibold whitespace-nowrap hidden sm:block">
            {discountPercent > 0 ? (
              <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                -{discountPercent}% Applied
              </span>
            ) : (
              <span className="text-slate-400">Standard Rate</span>
            )}
          </div>
        </div>
      </div>

      {/* Machine Cards List */}
      <div className="space-y-6">
        {filteredListings.length === 0 ? <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
            <p className="text-lg font-serif text-slate-900 mb-2 font-bold">No active machines match your exact filter criteria</p>
            <p className="text-xs text-slate-500 mb-4">Reset filters or browse other categories and western corridor hubs</p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase rounded-xl transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div> : filteredListings.map((listing) => {
    const isFav = favorites.includes(listing.id);
    const isCompared = compareIds.includes(listing.id);
    const totalCost = calculateTotal(listing);
    return <div
      key={listing.id}
      className="group bg-white border border-slate-200/90 hover:border-amber-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-row"
    >
                {
      /* Visual Representation & Location Badge (Left Column) */
    }
                <div className="lg:w-[380px] xl:w-[420px] shrink-0 bg-slate-950 text-white relative min-h-[240px] flex flex-col justify-between overflow-hidden">
                  {
      /* High-Resolution Machine Visual Photo with Zoom Effect */
    }
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                      <MachineImage id={listing.id} category={listing.category} title={listing.title} showOverlay={false} />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/50 pointer-events-none" />
                  </div>

                  {
      /* Top tags on image */
    }
                  <div className="relative z-10 p-4 flex items-center justify-between">
                    <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-amber-300">
                      {listing.capacityTons}-Ton Class
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
      onClick={() => toggleCompare(listing.id)}
      className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer ${isCompared ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800"}`}
      title="Compare machine specs"
    >
                        <Layers className="w-4 h-4" />
                      </button>
                      <button
      onClick={() => toggleFavorite(listing.id)}
      className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 cursor-pointer ${isFav ? "bg-emerald-600 text-white font-bold" : "bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800"}`}
      title="Save to favorites"
    >
                        <Bookmark className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {
      /* Siding location subtext */
    }
                  <div className="relative z-10 p-4 flex items-center justify-between text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">{listing.distanceFromSiding}</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400 text-[11px] font-medium bg-slate-900/60 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      GPS Active
                    </span>
                  </div>
                </div>

                {
      /* Central Spec Sheet (Middle Column) */
    }
                <div className="flex-1 p-4 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div>
                    {
      /* Header info */
    }
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-amber-800 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 uppercase tracking-wide">
                        {listing.assetClass.split(" ")[0]} {listing.assetClass.split(" ")[1] || "Industrial"}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Verified {listing.registrationCode}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight mb-2 group-hover:text-amber-800 transition-colors">
                      {listing.title}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-5">
                      <button
      onClick={() => {
        const prov = providers.find((p) => p.id === listing.providerId);
        if (prov) setSelectedProvider(prov);
      }}
      className="hover:text-amber-700 hover:underline cursor-pointer font-semibold transition-colors text-left"
    >
                        {listing.providerName}
                      </button>
                      <span>·</span>
                      <span className="flex items-center gap-1 font-bold text-slate-900">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        {listing.rating}
                      </span>
                      <span className="text-slate-400">({listing.reviewCount} reviews)</span>
                    </div>

                    {
      /* Machine Specification Strip */
    }
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-4 bg-slate-50 rounded-2xl border border-slate-100 mb-5 text-center">
                      {listing.category === "cranes" && <>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.boomLengthMeters?.toFixed(1)} M</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Main Boom</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.driveConfiguration || "6x6x6"}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Drive Steer</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-emerald-600 block">VALID</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Load Chart</span>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-amber-600 block">READY</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Immediate</span>
                          </div>
                        </>}

                      {listing.category === "excavators" && <>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.bucketCapacityM3?.toFixed(1)} m³</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Severe Bucket</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">148 HP</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">CAT C4.4</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.digDepthMeters?.toFixed(2)} M</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Dig Depth</span>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-amber-600 block">READY</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Live Dispatch</span>
                          </div>
                        </>}

                      {listing.category !== "cranes" && listing.category !== "excavators" && <>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.capacityTons} T</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Capacity</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-slate-900 block font-mono">{listing.engineHorsepower?.split(" ")[0] || "Euro-6"}</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Power Unit</span>
                          </div>
                          <div className="border-r border-slate-200/80 pr-2">
                            <span className="text-sm font-bold text-emerald-600 block">ACTIVE</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Telematics</span>
                          </div>
                          <div>
                            <span className="text-sm font-bold text-amber-600 block">READY</span>
                            <span className="text-[10px] text-slate-500 uppercase font-medium">Immediate</span>
                          </div>
                        </>}
                    </div>
                  </div>

                  {
      /* Certified Badges Strip */
    }
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600">
                    {listing.gstVerified && <span className="bg-slate-100 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        GST Verified
                      </span>}
                    {listing.riggerIncluded && <span className="bg-slate-100 px-3 py-1 rounded-full font-medium">
                        👨‍🔧 Operator Included
                      </span>}
                    {listing.zeroDowntimeGuarantee && <span className="bg-slate-100 px-3 py-1 rounded-full font-medium">
                        🛡️ Zero Downtime Guarantee
                      </span>}
                    {listing.turnkeyFuelAvailable && <span className="bg-slate-100 px-3 py-1 rounded-full font-medium">
                        ⛽ Fuel on Request
                      </span>}
                  </div>
                </div>

                {
      /* Pricing & Booking Actions (Right Column) */
    }
                <div className="lg:w-[300px] p-4 sm:p-7 bg-slate-50/70 flex flex-col justify-between shrink-0">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-1">
                      Direct Rate
                    </div>

                    <div className="flex items-baseline gap-1.5 mb-1.5">
                      <span className="text-3xl font-mono font-bold text-slate-900">
                        ₹{listing.baseRate.toLocaleString()}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">/ {listing.unitLabel}</span>
                    </div>

                    <div className="text-xs font-semibold text-amber-800 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 mb-3 inline-block">
                      Est. Total: ₹{totalCost.toLocaleString()} ({projectShifts} {projectShifts === 1 ? "Shift" : "Shifts"})
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed mb-5">
                      {listing.category === "cranes" ? "Includes certified crane operator, fuel options, and safety rigger." : "Includes experienced driver and standard operating maintenance."}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <button
      onClick={() => setActiveBookingListing(listing)}
      className="w-full py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 cursor-pointer"
    >
                      <span>Book Instantly</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
      onClick={() => setActiveAuditListing(listing)}
      className="w-full py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
    >
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Safety Audit Report</span>
                    </button>
                  </div>
                </div>
              </div>;
  })}
      </div>
    </section>;
};
