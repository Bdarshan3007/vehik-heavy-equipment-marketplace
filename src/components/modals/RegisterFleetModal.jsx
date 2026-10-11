import { useState } from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import { X, PlusCircle, CheckCircle2 } from "lucide-react";
export const RegisterFleetModal = () => {
  const { isRegisterFleetOpen, setIsRegisterFleetOpen, addListing, providers, currentUser } = useMarketplace();
  const [title, setTitle] = useState("");
  const [assetClass, setAssetClass] = useState("");
  const [category, setCategory] = useState("cranes");
  const [capacityTons, setCapacityTons] = useState(50);
  const defaultProviderId = currentUser?.providerId || (currentUser?.role === "provider" ? currentUser.id : providers[0]?.id || "prov-01");
  const [providerId, setProviderId] = useState(defaultProviderId);
  const [depotCity, setDepotCity] = useState("Sanand GIDC Plot 88, Ahmedabad");
  const [corridor, setCorridor] = useState("Sanand - Ahmedabad");
  const [distanceFromSiding, setDistanceFromSiding] = useState("8 KM from Sanand Industrial Gate");
  const [tariffBasis, setTariffBasis] = useState("shift");
  const [baseRate, setBaseRate] = useState(28500);
  const [boomLength, setBoomLength] = useState(38);
  const [riggerIncluded, setRiggerIncluded] = useState(true);
  const [turnkeyFuelAvailable, setTurnkeyFuelAvailable] = useState(true);
  const [description, setDescription] = useState("");
  if (!isRegisterFleetOpen) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    const provider = providers.find((p) => p.id === providerId) || {
      id: providerId,
      name: currentUser?.companyName || currentUser?.name || "Gujarat Heavy Lifting & Cranes"
    };
    addListing({
      title: title || `${capacityTons}-Ton Industrial Unit`,
      assetClass: assetClass || `${capacityTons}-Ton Heavy Asset`,
      category,
      categoryName: category === "cranes" ? "Hydraulic & All-Terrain Cranes" : category === "trailers" ? "Multi-Axle & Lowbed Trailers" : "Hydraulic Excavators",
      capacityTons,
      providerId: provider.id,
      providerName: provider.name,
      partnerVerified: true,
      rating: 5,
      reviewCount: 0,
      depotCity,
      corridor,
      distanceFromSiding,
      availability: "READY_IMMEDIATE",
      tariffBasis,
      baseRate,
      unitLabel: tariffBasis === "shift" ? "shift" : tariffBasis === "hourly" ? "hr + HSD" : "loaded km",
      allInDayRate: Math.round(baseRate * (tariffBasis === "hourly" ? 10 : 1.2)),
      boomLengthMeters: category === "cranes" ? boomLength : void 0,
      loadChartValid: true,
      riggerIncluded,
      gstVerified: true,
      zeroDowntimeGuarantee: true,
      gpsTelematicsEnabled: true,
      turnkeyFuelAvailable,
      insuranceValidDate: "2027-12-31",
      lastAuditDate: (/* @__PURE__ */ new Date()).toISOString().substring(0, 10),
      description: description || "High-specification commercial unit with certified operator and instant mobilization guarantee.",
      images: []
    });
    setIsRegisterFleetOpen(false);
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-2.5">
            <PlusCircle className="w-5 h-5 text-[#C66A20] shrink-0" />
            <h2 className="text-sm sm:text-base font-serif font-bold">
              List Your Machinery for Rent
            </h2>
          </div>
          <button
            onClick={() => setIsRegisterFleetOpen(false)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 no-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Machine Make & Model
              </label>
              <input
    type="text"
    required
    placeholder="e.g. Sany STC500 50T Mobile Crane"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Machine Type / Subtitle
              </label>
              <input
    type="text"
    required
    placeholder="e.g. 50-Ton Mobile Hydraulic Crane"
    value={assetClass}
    onChange={(e) => setAssetClass(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Asset Class Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
              >
                <option value="cranes">Hydraulic & All-Terrain Cranes</option>
                <option value="trailers">Multi-Axle & Lowbed Trailers</option>
                <option value="excavators">Hydraulic Excavators</option>
                <option value="backhoes">JCB & Backhoe Loaders</option>
                <option value="tippers">Heavy Mining Tippers</option>
                <option value="prime_movers">Class 8 Prime Movers</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Rated Capacity (Tons)
              </label>
              <input
                type="number"
                min="1"
                max="800"
                value={capacityTons}
                onChange={(e) => setCapacityTons(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs font-mono text-[#131B26] focus:outline-none focus:border-[#111F35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Registered Fleet Provider
              </label>
              <select
                value={providerId}
                onChange={(e) => setProviderId(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
              >
                {providers.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.hubLocation})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Corridor Hub
              </label>
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
              >
                <option value="Sanand - Ahmedabad">Sanand - Ahmedabad</option>
                <option value="Mundra Port Siding">Mundra Port Siding</option>
                <option value="JNPT Navi Mumbai">JNPT Navi Mumbai</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Tariff Structure
              </label>
              <select
    value={tariffBasis}
    onChange={(e) => setTariffBasis(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  >
                <option value="shift">Per 8-Hour Shift (Cranes/Loaders)</option>
                <option value="hourly">Hourly Meter + HSD (Excavators)</option>
                <option value="loaded_km">Per Loaded KM (Heavy Trailers)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Base Tariff Rate (₹)
              </label>
              <input
    type="number"
    min="50"
    value={baseRate}
    onChange={(e) => setBaseRate(Number(e.target.value))}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs font-mono font-bold text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Depot Location / Yard Lot
              </label>
              <input
    type="text"
    value={depotCity}
    onChange={(e) => setDepotCity(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Distance Reference to Siding
              </label>
              <input
    type="text"
    value={distanceFromSiding}
    onChange={(e) => setDistanceFromSiding(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
    type="checkbox"
    checked={riggerIncluded}
    onChange={(e) => setRiggerIncluded(e.target.checked)}
    className="w-4 h-4 accent-[#111F35] rounded"
  />
              <span className="text-[#131B26] font-medium">Certified Operator / Riggers Included</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={turnkeyFuelAvailable}
                onChange={(e) => setTurnkeyFuelAvailable(e.target.checked)}
                className="w-4 h-4 accent-[#111F35] rounded"
              />
              <span className="text-[#131B26] font-medium">Fuel Turnkey Available</span>
            </label>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
              Technical Description & Operational Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Equipped with load moment indicator, outrigger mats, spark arrestor for refinery gate-in..."
              className="w-full p-2.5 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26] focus:outline-none focus:border-[#111F35] resize-none"
            />
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 border-t border-[#E2E6EB]">
            <button
              type="button"
              onClick={() => setIsRegisterFleetOpen(false)}
              className="px-4 py-2.5 sm:py-2 border border-[#D5DCE4] text-xs font-mono uppercase rounded-lg text-[#535F70] hover:text-[#111F35] cursor-pointer text-center font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer text-center"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>List Machine Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>;
};
