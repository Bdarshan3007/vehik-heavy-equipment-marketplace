import { useState, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Users,
  FileCheck,
  Play,
  Pause,
  Sparkles
} from "lucide-react";
import { useMarketplace } from "../context/MarketplaceContext";
const FEATURED_SLIDES = [
  {
    id: "eq-01",
    name: "Liebherr LTM 1050 Mobile Crane",
    categoryName: "Mobile Hydraulic Crane \xB7 All-Terrain",
    badge: "TOP RATED \xB7 IMMEDIATE DISPATCH",
    image: "/images/crane_liebherr_50t.jpg",
    location: "Sanand Industrial Hub, Ahmedabad",
    capacity: "50 Tons Class",
    reachOrPower: "38.0m Telescopic Boom",
    operator: "Licensed Crane Driver & Riggers Included",
    rate: "\u20B928,500",
    rateUnit: "per 8-hour shift",
    status: "Ready on Yard",
    deliveryTime: "< 2 Hours to Site",
    rating: 4.95,
    reviews: 48
  },
  {
    id: "eq-02",
    name: "Caterpillar 320D3 Heavy Excavator",
    categoryName: "Hydraulic Crawler Excavator",
    badge: "POPULAR \xB7 EARTHMOVING & QUARRY",
    image: "/images/excavator_cat_22t.jpg",
    location: "Mundra Port Logistics Siding",
    capacity: "22 Tons Class",
    reachOrPower: "1.2 m\xB3 Bucket \xB7 Rock Breaker Ready",
    operator: "Experienced CAT Certified Operator",
    rate: "\u20B92,650",
    rateUnit: "per hour (or \u20B921,200/day)",
    status: "Ready on Yard",
    deliveryTime: "< 3 Hours to Site",
    rating: 4.9,
    reviews: 62
  },
  {
    id: "eq-03",
    name: "Volvo FH16 120T Heavy Haulage Transporter",
    categoryName: "Multi-Axle Hydraulic Lowbed Trailer",
    badge: "OVERSIZED CARGO \xB7 INTER-STATE PERMITS",
    image: "/images/trailer_volvo_120t.jpg",
    location: "JNPT Port Corridor, Navi Mumbai",
    capacity: "120 Tons Payload",
    reachOrPower: "8-Axle Hydraulic Steer Platform",
    operator: "Dual Licensed Heavy Commercial Drivers",
    rate: "\u20B9240",
    rateUnit: "per loaded km",
    status: "Ready on Yard",
    deliveryTime: "Same Day Dispatch",
    rating: 4.88,
    reviews: 35
  },
  {
    id: "eq-04",
    name: "JCB 3DX Super 4WD Turbo Backhoe",
    categoryName: "Multi-Purpose Backhoe Loader",
    badge: "VERSATILE \xB7 RAPID MOBILIZATION",
    image: "/images/backhoe_jcb_3dx.jpg",
    location: "Sanand & Ahmedabad Urban Hub",
    capacity: "8.5 Tons Operating Weight",
    reachOrPower: "4.77m Dig Depth \xB7 1.0 m\xB3 Shovel",
    operator: "Skilled Driver & General Rigging Crew",
    rate: "\u20B91,250",
    rateUnit: "per hour (\u20B910,000/shift)",
    status: "Ready on Yard",
    deliveryTime: "< 90 Mins to Site",
    rating: 4.92,
    reviews: 84
  },
  {
    id: "eq-05",
    name: "Sany SAC2500 Heavy All-Terrain Crane",
    categoryName: "Super Heavy Lift Crane \xB7 Wind & Refinery",
    badge: "SUPER HEAVY LIFT \xB7 CERTIFIED EN 13000",
    image: "/images/crane_sany_250t.jpg",
    location: "Dahej Petrochemical Corridor",
    capacity: "250 Tons Capacity",
    reachOrPower: "72m Main Boom + 42m Fixed Jib",
    operator: "Master Rigger & Two Certified Operators",
    rate: "\u20B998,000",
    rateUnit: "per shift",
    status: "Ready on Yard",
    deliveryTime: "< 4 Hours to Site",
    rating: 4.97,
    reviews: 29
  }
];
export const HeroSection = () => {
  const { listings, setActiveBookingListing, setActiveAuditListing, setIsQuickRfqOpen } = useMarketplace();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FEATURED_SLIDES.length);
    }, 6e3);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % FEATURED_SLIDES.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
  };

  const handleTouchStart = (e) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) {
      nextSlide();
    } else if (distance < -50) {
      prevSlide();
    }
  };

  const activeSlide = FEATURED_SLIDES[currentSlide];
  const activeListing = listings.find((l) => l.id === activeSlide.id);
  return <section className="relative pt-4 sm:pt-6 pb-8 sm:pb-12 px-3 sm:px-6 max-w-[1440px] mx-auto">
      {
    /* Friendly Top Welcome & Metrics Header */
  }
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: "8s" }} />
            <span>India's Most Trusted Machinery & Heavy Fleet Rental</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.12] mb-4">
            Rent Heavy Machinery & Commercial Vehicles with <span className="text-amber-600 italic font-normal">Zero Hassle</span>.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
            Need a reliable crane, JCB, excavator, or transport trailer? VEHIK connects you instantly with verified equipment owners. Transparent pricing, certified drivers, and doorstep site delivery in under 2 hours.
          </p>
        </div>

        {
    /* Live Trust Metrics Strip */
  }
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white p-2 sm:p-3 rounded-2xl border border-slate-200/80 shadow-sm divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          <div className="p-3 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">14,820+</div>
            <div className="text-[11px] sm:text-xs font-medium text-emerald-600 flex items-center justify-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Ready to Work
            </div>
          </div>

          <div className="p-3 text-center">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">&lt; 2 Hrs</div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Site Dispatch</div>
          </div>

          <div className="p-3 text-center border-t sm:border-t-0">
            <div className="text-xl sm:text-2xl font-bold font-mono text-amber-600">100% Safe</div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Protected Escrow</div>
          </div>

          <div className="p-3 text-center border-t sm:border-t-0">
            <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 flex items-center justify-center gap-1">
              <span>4.9</span>
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            </div>
            <div className="text-[11px] sm:text-xs font-medium text-slate-500 mt-0.5">Verified Reviews</div>
          </div>
        </div>
      </div>

      {
    /* ========================================================================= */
  }
      {
    /* HERO SLIDER SECTION (Interactive, Responsive, Rich Features)               */
  }
      {
    /* ========================================================================= */
  }
      <div
    className="relative rounded-3xl overflow-hidden bg-slate-950 text-white shadow-2xl border border-slate-800 transition-all duration-300"
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onTouchStart={handleTouchStart}
    onTouchMove={handleTouchMove}
    onTouchEnd={handleTouchEnd}
  >
        {
    /* Top Header Bar inside Slider */
  }
        <div className="px-5 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="font-semibold tracking-wide text-slate-100 uppercase">
              FEATURED VERIFIED FLEET
            </span>
            <span className="text-slate-400 hidden sm:inline">| Guaranteed tested before dispatch</span>
          </div>

          {
    /* Quick jump slide pills */
  }
          <div className="hidden lg:flex items-center gap-1.5">
            {FEATURED_SLIDES.map((slide, index) => <button
    key={slide.id}
    onClick={() => setCurrentSlide(index)}
    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${currentSlide === index ? "bg-amber-500 text-slate-950 font-bold shadow-md" : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"}`}
  >
                {index === 0 && "\u{1F3D7}\uFE0F Liebherr 50T"}
                {index === 1 && "\u{1F69C} CAT 320D"}
                {index === 2 && "\u{1F69B} Volvo 120T"}
                {index === 3 && "\u{1F7E1} JCB 3DX"}
                {index === 4 && "\u{1F3D7}\uFE0F Sany 250T"}
              </button>)}
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xs font-mono font-medium text-amber-400">
              0{currentSlide + 1} / 0{FEATURED_SLIDES.length}
            </span>
            <button
    onClick={() => setIsPaused(!isPaused)}
    title={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
  >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {
    /* Main Slide Presentation Window */
  }
        <div className="relative min-h-[440px] sm:min-h-[500px] flex items-center overflow-hidden">
          {
    /* Background Realistic Machine Artwork with Cinematic Gradients */
  }
          {FEATURED_SLIDES.map((slide, idx) => <div
    key={slide.id}
    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none ${idx === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"}`}
  >
              <img
                src={slide.image}
                alt={slide.name}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-full h-full object-cover object-center transform scale-100 transition-transform duration-7000 ease-out"
                style={{
                  transform: idx === currentSlide ? "scale(1.04)" : "scale(1.0)"
                }}
              />
              {
    /* Multi-layered cinematic shadows for crisp readable text */
  }
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50" />
            </div>)}

          {/* Slide Content Overlay */}
          <div className="relative z-10 p-4 sm:p-10 lg:p-12 max-w-3xl">
            {/* Tag / Category Badge */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] sm:text-xs font-semibold tracking-wide uppercase">
                {activeSlide.badge}
              </span>
              <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {activeSlide.status}
              </span>
              <span className="text-slate-400 text-[11px] sm:text-xs flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate">{activeSlide.location}</span>
              </span>
            </div>

            {/* Machine Title */}
            <h2 className="text-xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 leading-tight tracking-tight">
              {activeSlide.name}
            </h2>

            <p className="text-xs sm:text-base text-slate-300 mb-4 sm:mb-6 font-normal line-clamp-2 sm:line-clamp-none">
              {activeSlide.categoryName} · Complete with safety clearance & pre-shift load testing.
            </p>

            {/* Key Specs Card Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5 mb-4 sm:mb-6 max-w-2xl">
              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Capacity</span>
                <span className="text-xs sm:text-base font-bold text-white font-mono">{activeSlide.capacity}</span>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Reach / Power</span>
                <span className="text-xs sm:text-base font-bold text-amber-400 font-mono truncate block">{activeSlide.reachOrPower}</span>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Site Dispatch</span>
                <span className="text-xs sm:text-base font-bold text-emerald-400 font-mono">{activeSlide.deliveryTime}</span>
              </div>

              <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl p-2.5 sm:p-3">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Rating</span>
                <span className="text-xs sm:text-base font-bold text-white font-mono flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {activeSlide.rating} <span className="text-[10px] text-slate-400 font-normal">({activeSlide.reviews})</span>
                </span>
              </div>
            </div>

            {/* Operator info subtext */}
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-slate-300 mb-4 sm:mb-6 bg-slate-900/60 backdrop-blur-sm px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg border border-slate-800 w-fit">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span className="truncate">{activeSlide.operator}</span>
            </div>

            {/* Pricing Strip & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex flex-col">
                <span className="text-[10px] sm:text-[11px] text-slate-400 uppercase font-medium">Direct Rental Rate</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-4xl font-mono font-bold text-amber-400">
                    {activeSlide.rate}
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    /{activeSlide.rateUnit}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5">
                <button
                  onClick={() => {
                    if (activeListing) {
                      setActiveBookingListing(activeListing);
                    }
                  }}
                  className="px-5 py-3 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 cursor-pointer"
                >
                  <span>Book This Machine</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (activeListing) {
                      setActiveAuditListing(activeListing);
                    }
                  }}
                  className="px-4 py-2.5 sm:py-3 bg-slate-900/90 hover:bg-slate-800 active:scale-95 border border-slate-700 text-slate-200 hover:text-white font-medium text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" />
                  <span>View Safety Cert</span>
                </button>

                <button
                  onClick={() => setIsQuickRfqOpen(true)}
                  className="px-3 py-2 text-slate-300 hover:text-white hover:underline font-medium text-xs tracking-wider transition-colors cursor-pointer text-center sm:text-left"
                >
                  Custom Project RFQ
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Arrows (Prev / Next) */}
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-white hover:bg-amber-500 hover:text-slate-950 hover:border-amber-400 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl hover:scale-105"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
        </div>

        {
    /* Bottom Slide Indicators Bar & Progress Strip */
  }
        <div className="px-6 py-4 bg-slate-950/95 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {FEATURED_SLIDES.map((slide, index) => <button
    key={slide.id}
    onClick={() => setCurrentSlide(index)}
    aria-label={`Go to slide ${index + 1}`}
    className="group p-1 cursor-pointer"
  >
                <div
    className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? "w-10 bg-amber-500" : "w-2.5 bg-slate-700 group-hover:bg-slate-500"}`}
  />
              </button>)}
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              Pre-mobilization Checklist Verified
            </span>
            <span className="hidden md:inline text-slate-600">·</span>
            <span className="hidden md:inline text-slate-300">
              Next Available Slot: <strong className="text-white">Tomorrow 07:00 AM</strong>
            </span>
          </div>
        </div>
      </div>

      {
    /* ========================================================================= */
  }
      {
    /* 3-STEP USER-FRIENDLY WORKFLOW GUIDE (Clean, Modern, Intuitive)             */
  }
      {
    /* ========================================================================= */
  }
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="group bg-white hover:bg-amber-500/[0.02] border border-slate-200/90 hover:border-amber-400/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 font-bold text-base flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            1
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Select Your Machine
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Filter by capacity, boom length, or location. Pick from 14,820+ verified cranes, excavators, JCBs, and trailers.
            </p>
          </div>
        </div>

        <div className="group bg-white hover:bg-amber-500/[0.02] border border-slate-200/90 hover:border-amber-400/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-700 font-bold text-base flex items-center justify-center shrink-0 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300">
            2
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Transparent Rates & Savings
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No hidden broker commissions. Enjoy upfront pricing and automatic volume discounts of up to 18% for multi-day rentals.
            </p>
          </div>
        </div>

        <div className="group bg-white hover:bg-emerald-500/[0.02] border border-slate-200/90 hover:border-emerald-400/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-700 font-bold text-base flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
            3
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              On-Site Delivery with Driver
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Machine arrives on your job site with a certified operator, valid fitness certificates, and live GPS tracking.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
