import { useMemo } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  ArrowLeft,
  ArrowRight,
  Wrench,
  Truck,
  Construction,
  Pickaxe,
  Container,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Star,
  Bookmark,
  Layers,
  FileCheck
} from "lucide-react";
import { MachineImage } from "../components/MachineImage";

export const CategoriesPage = () => {
  const {
    listings,
    selectedCategory,
    setSelectedCategory,
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
    showNotification
  } = useMarketplace();

  const categories = [
    {
      id: "all",
      name: "All Machinery Categories",
      units: "14,820 Units",
      description: "Complete fleet catalog across cranes, trailers, excavators, backhoes, tippers and prime movers.",
      startingRate: "₹1,150",
      rateUnit: "/ hr onwards",
      icon: Sparkles,
      image: "/images/crane_liebherr_50t.jpg"
    },
    {
      id: "cranes",
      name: "Hydraulic & Mobile Cranes",
      units: "1,420 Machines",
      description: "20T to 500T all-terrain telescopic cranes with certified operators for plant erection and industrial lifting.",
      startingRate: "₹14,500",
      rateUnit: "/ shift",
      icon: Wrench,
      image: "/images/crane_liebherr_50t.jpg"
    },
    {
      id: "trailers",
      name: "Heavy Lowbed & Multi-Axle Trailers",
      units: "2,890 Machines",
      description: "Hydraulic drop-deck and modular platform trailers to transport oversized machinery, transformers, and EPC plant modules.",
      startingRate: "₹185",
      rateUnit: "/ km",
      icon: Truck,
      image: "/images/trailer_volvo_120t.jpg"
    },
    {
      id: "excavators",
      name: "Hydraulic Excavators & Breakers",
      units: "2,150 Machines",
      description: "20T to 45T heavy-duty tracked diggers with optional hydraulic rock breaker attachments for tough ground.",
      startingRate: "₹2,650",
      rateUnit: "/ hr + HSD",
      icon: Pickaxe,
      image: "/images/excavator_cat_22t.jpg"
    },
    {
      id: "backhoes",
      name: "JCB & Backhoe Loaders",
      units: "3,410 Machines",
      description: "JCB 3DX & 4DX 4WD loaders for excavation, utility trenching, foundation leveling, and site clearing.",
      startingRate: "₹1,250",
      rateUnit: "/ hr",
      icon: Construction,
      image: "/images/backhoe_jcb_3dx.jpg"
    },
    {
      id: "tippers",
      name: "Dump Trucks & Mining Tippers",
      units: "1,840 Machines",
      description: "28T to 35T rock body tippers and dumpers for high-speed site earth haulage, stone, and aggregate transport.",
      startingRate: "₹1,950",
      rateUnit: "/ hr + HSD",
      icon: Truck,
      image: "/images/excavator_komatsu_21t.jpg"
    },
    {
      id: "prime_movers",
      name: "Heavy Prime Movers & Trucks",
      units: "3,110 Machines",
      description: "55T to 60T commercial tractor units for port container freight, long-haul corridors, and industrial logistics.",
      startingRate: "₹180",
      rateUnit: "/ km",
      icon: Container,
      image: "/images/trailer_tata_60t.jpg"
    }
  ];

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    showNotification(`Selected Category: ${catId.toUpperCase()}`);
    const el = document.getElementById("category-fleet-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (item.isPaused) return false;
      if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
      if (selectedCorridor !== "all" && (item.corridor || item.corridorHub) !== selectedCorridor) return false;
      return true;
    });
  }, [listings, selectedCategory, selectedCorridor]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory) || categories[0];

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
      base = listing.allInDayRate || 25000;
    }
    const rawTotal = base * projectShifts;
    const discounted = rawTotal * (1 - discountPercent / 100);
    return Math.round(discounted);
  };

  return (
    <div className="py-6 sm:py-10 px-4 sm:px-6 max-w-[1440px] mx-auto select-none">
      {/* Top Breadcrumb & Page Header */}
      <div className="pb-6 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveView("marketplace")}
          className="text-xs font-mono text-slate-500 hover:text-slate-900 flex items-center gap-1.5 mb-3 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Fleet Marketplace</span>
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-2 border border-amber-500/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>EQUIPMENT CLASSIFICATION HUB</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              Machinery Categories & <span className="italic font-normal text-amber-600">Asset Taxonomy</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Explore India's verified equipment classes. Click on any category below to immediately view active machines, specifications, hourly/shift rates, and safety certifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Categories</div>
              <div className="text-lg font-bold font-mono text-slate-900">6 Core Classes</div>
            </div>
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Active Machines</div>
              <div className="text-lg font-bold font-mono text-emerald-600">14,820+ Units</div>
            </div>
            <div className="bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm text-center">
              <div className="text-[10px] font-mono text-slate-400 uppercase">Safety Rating</div>
              <div className="text-lg font-bold font-mono text-amber-600">48-Point Audit</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Pills Quick Switcher */}
      <div className="mb-8">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === "all"
              ? listings.filter((l) => !l.isPaused).length
              : listings.filter((l) => !l.isPaused && l.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer shrink-0 border ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 shadow-md scale-102"
                    : "bg-white text-slate-700 border-slate-200 hover:border-amber-400 hover:bg-slate-50"
                }`}
              >
                <span>{cat.name.split(" ")[0]}</span>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                    isSelected ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6 Category Interactive Showcase Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
        {categories.slice(1).map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          const count = listings.filter((l) => !l.isPaused && l.category === cat.id).length;
          return (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className={`bg-white border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                isSelected
                  ? "border-amber-500 ring-3 ring-amber-500/20"
                  : "border-slate-200/90 hover:border-amber-400"
              }`}
            >
              {/* Image Header with Badge */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />

                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-amber-400 border border-slate-700/60 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold font-mono bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-700/50">
                    {count} Available Units
                  </span>
                  <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Verified
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                      Starting From
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-bold text-slate-900 font-mono">
                        {cat.startingRate}
                      </span>
                      <span className="text-xs text-slate-500">{cat.rateUnit}</span>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-xl transition-all ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold"
                        : "bg-slate-100 text-slate-700 group-hover:bg-amber-50 group-hover:text-amber-700"
                    }`}
                  >
                    <span>{isSelected ? "Browsing" : "View Fleet"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Integrated Live Fleet Grid for Selected Category */}
      <div id="category-fleet-list" className="scroll-mt-20 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-amber-600 font-bold">
              ● Live Inventory Available
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              {activeCategoryObj.name} ({filteredListings.length} Units Ready)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select any machine below to review physical test audits, calculate multi-shift rent, or submit an instant booking.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Show All Categories
              </button>
            )}
          </div>
        </div>

        {/* Machine Cards */}
        <div className="space-y-6">
          {filteredListings.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
              <p className="text-lg font-serif text-slate-900 mb-2 font-bold">
                No active machines in this category match your exact location filters
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Clear filters to view all verified units across Gujarat and Maharashtra
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedCorridor("all");
                }}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold uppercase rounded-xl transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            filteredListings.map((listing) => {
              const isFav = favorites.includes(listing.id);
              const isCompared = compareIds.includes(listing.id);
              const totalCost = calculateTotal(listing);

              return (
                <div
                  key={listing.id}
                  className="group bg-white border border-slate-200/90 hover:border-amber-400 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col lg:flex-row"
                >
                  {/* Photo Column */}
                  <div className="lg:w-[380px] xl:w-[420px] shrink-0 bg-slate-950 text-white relative min-h-[240px] flex flex-col justify-between overflow-hidden">
                    <div className="absolute inset-0 z-0 overflow-hidden">
                      <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700 ease-out">
                        <MachineImage id={listing.id} category={listing.category} title={listing.title} showOverlay={false} />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/40 pointer-events-none" />

                    <div className="relative z-10 p-4 sm:p-5 flex items-start justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 shadow-md">
                          {listing.registrationCode}
                        </span>
                        {listing.partnerVerified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-lg bg-emerald-500/20 backdrop-blur-md text-emerald-300 border border-emerald-500/30">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>ARAI Verified</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleCompare(listing.id)}
                          className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                            isCompared
                              ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md"
                              : "bg-slate-900/70 border-white/10 text-white hover:bg-slate-800"
                          }`}
                          title="Compare Machine"
                        >
                          <Layers className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleFavorite(listing.id)}
                          className={`p-2 rounded-xl backdrop-blur-md border transition-all cursor-pointer ${
                            isFav
                              ? "bg-red-500/20 border-red-500/40 text-red-400"
                              : "bg-slate-900/70 border-white/10 text-white hover:bg-slate-800"
                          }`}
                          title="Save to Favorites"
                        >
                          <Bookmark className={`w-4 h-4 ${isFav ? "fill-current" : ""}`} />
                        </button>
                      </div>
                    </div>

                    <div className="relative z-10 p-4 sm:p-5">
                      <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-400" />
                        <span>{listing.depotCity}</span>
                      </div>
                      <div className="text-[11px] font-mono text-slate-300">
                        Nearest Freight Siding: {listing.distanceFromSiding}
                      </div>
                    </div>
                  </div>

                  {/* Machine Details Column */}
                  <div className="flex-1 p-5 sm:p-7 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-1">
                            {listing.categoryName} · {listing.capacityTons}T Load Capacity
                          </div>
                          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                            {listing.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-1 text-slate-700 bg-slate-100 px-2.5 py-1 rounded-xl text-xs font-semibold shrink-0 self-start">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span>{listing.rating}</span>
                          <span className="text-slate-400">({listing.reviewCount})</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 border-y border-slate-100 text-xs font-mono text-slate-700 mb-4">
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] uppercase block">Boom / Reach</span>
                          <span className="font-bold text-slate-900">
                            {listing.boomLengthMeters ? `${listing.boomLengthMeters}m Main Boom` : listing.digDepthMeters ? `${listing.digDepthMeters}m Depth` : `${listing.payloadCapacityTons || 60}T Payload`}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] uppercase block">Powertrain</span>
                          <span className="font-bold text-slate-900 truncate block">
                            {listing.engineHorsepower || "Heavy Spec"}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] uppercase block">Crew Support</span>
                          <span className="font-bold text-slate-900">
                            {listing.riggerIncluded ? "Driver + Riggers" : "Operator Included"}
                          </span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                          <span className="text-slate-400 text-[10px] uppercase block">Safety Check</span>
                          <span className="font-bold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Passed NDT</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Pricing & Call to Actions */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                          Rental Tariff
                        </div>
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-bold font-mono text-slate-900">
                            ₹{listing.baseRate.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">/{listing.unitLabel}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveAuditListing(listing)}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileCheck className="w-4 h-4 text-emerald-600" />
                          <span className="hidden sm:inline">Audit Sheet</span>
                        </button>

                        <button
                          onClick={() => setActiveBookingListing(listing)}
                          className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/25 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer flex-1 sm:flex-initial"
                        >
                          <span>Rent Machine</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
