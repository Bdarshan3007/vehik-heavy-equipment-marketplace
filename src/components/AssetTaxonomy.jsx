import { useMarketplace } from "../context/MarketplaceContext";
import {
  ArrowRight,
  Wrench,
  Truck,
  Construction,
  Pickaxe,
  Container
} from "lucide-react";
export const AssetTaxonomy = () => {
  const { selectedCategory, setSelectedCategory, showNotification } = useMarketplace();
  const categories = [
    {
      id: "cranes",
      name: "Hydraulic & Mobile Cranes",
      units: "1,420 Machines",
      description: "20T to 500T all-terrain cranes with certified operators for construction and industrial lifting.",
      startingRate: "\u20B914,500",
      rateUnit: "/ shift",
      icon: Wrench,
      image: "/images/crane_liebherr_50t.jpg"
    },
    {
      id: "trailers",
      name: "Heavy Lowbed & Multi-Axle Trailers",
      units: "2,890 Machines",
      description: "Hydraulic lowbed trailers to safely transport oversized machinery, transformers, and plant equipment.",
      startingRate: "\u20B9220",
      rateUnit: "/ km",
      icon: Truck,
      image: "/images/trailer_volvo_120t.jpg"
    },
    {
      id: "backhoes",
      name: "JCB & Backhoe Loaders",
      units: "3,410 Machines",
      description: "JCB 3DX & 4DX loaders for excavation, trenching, foundation leveling, and site clearing.",
      startingRate: "\u20B91,150",
      rateUnit: "/ hr",
      icon: Construction,
      image: "/images/backhoe_jcb_3dx.jpg"
    },
    {
      id: "excavators",
      name: "Hydraulic Excavators & Breakers",
      units: "2,150 Machines",
      description: "20T to 45T heavy-duty diggers with optional hydraulic rock breaker attachments.",
      startingRate: "\u20B92,800",
      rateUnit: "/ hr",
      icon: Pickaxe,
      image: "/images/excavator_cat_22t.jpg"
    },
    {
      id: "tippers",
      name: "Dump Trucks & Mining Tippers",
      units: "1,840 Machines",
      description: "High-payload tippers and dump trucks for rapid site earth haulage, stone, and aggregates.",
      startingRate: "\u20B91,950",
      rateUnit: "/ hr",
      icon: Truck,
      image: "/images/excavator_komatsu_21t.jpg"
    },
    {
      id: "prime_movers",
      name: "Heavy Prime Movers & Trucks",
      units: "3,110 Machines",
      description: "High-power commercial tractors for port container movement and long-haul transport corridors.",
      startingRate: "\u20B9180",
      rateUnit: "/ km",
      icon: Container,
      image: "/images/trailer_tata_60t.jpg"
    }
  ];
  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    showNotification(`Filtered catalog by ${catId.toUpperCase()}`);
    const el = document.getElementById("featured-deployments");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  return <section id="asset-taxonomy" className="py-12 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20">
      {
    /* Section Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>EXPLORE FLEET TAXONOMY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Browse Machinery by <span className="italic font-normal text-amber-600">Category</span>
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-xl">
            Choose from 14,800+ verified machines across western industrial zones, all tested and ready to dispatch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
    onClick={() => setSelectedCategory("all")}
    className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 flex items-center gap-1.5 transition-colors cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm"
  >
            <span>View All Machinery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {
    /* Grid of 6 categories */
  }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => {
    const Icon = cat.icon;
    const isSelected = selectedCategory === cat.id;
    return <div
      key={cat.id}
      onClick={() => handleSelectCategory(cat.id)}
      className={`bg-white border rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl hover:-translate-y-1.5 ${isSelected ? "border-amber-500 ring-2 ring-amber-500/20" : "border-slate-200/90 hover:border-amber-400"}`}
    >
              {
      /* Real Machinery Image Header with Hover Scale */
    }
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
      src={cat.image}
      alt={cat.name}
      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      loading="lazy"
    />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                
                <div className="absolute top-3.5 left-3.5 w-9 h-9 rounded-xl bg-slate-900/80 backdrop-blur-md flex items-center justify-center text-amber-400 border border-slate-700/60 shadow-md">
                  <Icon className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold font-mono bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-700/50">
                    {cat.units}
                  </span>
                  <span className="bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Ready to Dispatch
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900 mb-1.5 leading-snug group-hover:text-amber-700 transition-colors">
                    {cat.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                {
      /* Rate and Arrow footer */
    }
                <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-slate-400 block font-medium">Starting from</span>
                    <span className="text-sm font-mono font-bold text-slate-900">
                      {cat.startingRate} <span className="font-normal text-slate-500 text-xs">{cat.rateUnit}</span>
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-amber-500 group-hover:text-slate-950 flex items-center justify-center text-slate-700 transition-all duration-200">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>;
  })}
      </div>
    </section>;
};
