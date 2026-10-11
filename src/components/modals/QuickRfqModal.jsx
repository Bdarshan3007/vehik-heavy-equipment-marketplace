import { useState } from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import { X, Zap, Radio } from "lucide-react";
export const QuickRfqModal = () => {
  const { isQuickRfqOpen, setIsQuickRfqOpen, submitRequest, listings, showNotification, setActiveView, currentUser } = useMarketplace();
  const [category, setCategory] = useState("cranes");
  const [capacityTons, setCapacityTons] = useState(50);
  const [corridor, setCorridor] = useState("Sanand - Ahmedabad");
  const [projectSite, setProjectSite] = useState("Sanand Auto Ancillary Phase II Siding");
  const [startDate, setStartDate] = useState("2026-10-08");
  const [durationShifts, setDurationShifts] = useState(3);
  const [contactName, setContactName] = useState(currentUser?.name || "Rajesh Khurana");
  const [companyName, setCompanyName] = useState(currentUser?.companyName || "Afcons Infrastructure JV");
  if (!isQuickRfqOpen) return null;
  const matched = listings.filter((l) => l.category === category) || listings;
  const vendorCount = Math.max(4, matched.length * 2);
  const handleBroadcast = (e) => {
    e.preventDefault();
    submitRequest({
      customerId: currentUser?.id || "usr-cust-01",
      customerName: contactName,
      customerCompany: companyName,
      listingId: matched[0]?.id || "eq-01",
      equipmentTitle: `${capacityTons}-Ton Heavy Equipment Request`,
      assetClass: `${capacityTons}-Ton Machinery`,
      providerId: matched[0]?.providerId || "prov-01",
      providerName: "Sent to all verified local equipment owners",
      corridorHub: corridor,
      projectSite,
      startDate,
      durationShifts,
      riggerRequired: true,
      turnkeyFuelRequired: true,
      unitRate: 28500,
      totalEstimatedAmount: 28500 * durationShifts * 1.18,
      status: "PENDING_QUOTE",
      specialNotes: "Instant AirRFQ broadcasted to all certified vendors with active geofence.",
      escrowStatus: "ESCROW_HOLD"
    });
    setIsQuickRfqOpen(false);
    showNotification(`AirRFQ broadcasted to ${vendorCount} certified regional fleet operators!`);
    setActiveView("customer_dashboard");
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C66A20] fill-current shrink-0" />
            <h2 className="text-sm sm:text-base font-serif font-bold line-clamp-1">
              Instant Quote Request (All Nearby Owners)
            </h2>
          </div>
          <button
            onClick={() => setIsQuickRfqOpen(false)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleBroadcast} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 no-scrollbar">
          <div className="bg-[#F7F6F2] p-3.5 rounded-xl border border-[#D5DCE4] flex items-center gap-3">
            <Radio className="w-5 h-5 text-[#C66A20] animate-pulse shrink-0" />
            <div className="text-xs text-[#535F70] leading-snug">
              We send your requirement to <strong className="text-[#111F35]">{vendorCount} verified equipment owners</strong> in your area. Owners typically respond with prices and availability within 25 minutes!
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Equipment Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              >
                <option value="cranes">Mobile All-Terrain Cranes</option>
                <option value="trailers">Multi-Axle & Lowbed Trailers</option>
                <option value="excavators">Hydraulic Excavators</option>
                <option value="backhoes">JCB & Backhoe Loaders</option>
                <option value="tippers">Dump Trucks & Tippers</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Capacity / Weight (Tons)
              </label>
              <input
                type="number"
                min="10"
                max="600"
                value={capacityTons}
                onChange={(e) => setCapacityTons(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs font-mono font-bold text-[#131B26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Region / Route
              </label>
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              >
                <option value="Sanand - Ahmedabad">Sanand & Ahmedabad</option>
                <option value="Mundra Port Siding">Mundra Port & Kutch</option>
                <option value="JNPT Navi Mumbai">Navi Mumbai & JNPT</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Delivery Site Address
              </label>
              <input
                type="text"
                required
                value={projectSite}
                onChange={(e) => setProjectSite(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Required Start Date
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Days / Shifts Needed
              </label>
              <input
                type="number"
                min="1"
                max="40"
                value={durationShifts}
                onChange={(e) => setDurationShifts(Number(e.target.value))}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs font-mono font-bold text-[#131B26]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Company / Business Name
              </label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg text-xs text-[#131B26]"
              />
            </div>
          </div>

          <div className="pt-3 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 border-t border-[#E2E6EB]">
            <button
              type="button"
              onClick={() => setIsQuickRfqOpen(false)}
              className="px-4 py-2.5 sm:py-2 border border-[#D5DCE4] text-xs font-mono uppercase rounded-lg text-[#535F70] hover:text-[#111F35] cursor-pointer text-center font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer text-center"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Send Request to All Verified Owners</span>
            </button>
          </div>
        </form>
      </div>
    </div>;
};
