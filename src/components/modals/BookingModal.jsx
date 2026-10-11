import { useState } from "react";
import { useMarketplace } from "../../context/MarketplaceContext";
import {
  X,
  MapPin,
  ArrowRight
} from "lucide-react";
import { getMachineImageUrl } from "../MachineImage";
export const BookingModal = () => {
  const {
    activeBookingListing,
    setActiveBookingListing,
    submitRequest,
    showNotification,
    setActiveView,
    currentUser
  } = useMarketplace();

  const [customerName, setCustomerName] = useState(currentUser?.name || "Vikramaditya Singhania");
  const [customerCompany, setCustomerCompany] = useState(currentUser?.companyName || "L&T Heavy Civil Infrastructure (Sanand Project)");
  const [projectSite, setProjectSite] = useState("Auto-Ancillary Industrial Corridor Phase-II, Plot 45");
  const [startDate, setStartDate] = useState("2026-10-06");
  const [durationShifts, setDurationShifts] = useState(4);
  const [riggerRequired, setRiggerRequired] = useState(Boolean(activeBookingListing?.riggerIncluded));
  const [turnkeyFuelRequired, setTurnkeyFuelRequired] = useState(false);
  const [specialNotes, setSpecialNotes] = useState("Provide gate clearance documents 24 hours prior to mobilization.");

  if (!activeBookingListing) return null;
  const unitRate = activeBookingListing.baseRate;
  const baseCost = unitRate * durationShifts;
  const riggerCost = riggerRequired && !activeBookingListing.riggerIncluded ? 2500 * durationShifts : 0;
  const fuelCost = turnkeyFuelRequired ? 4500 * durationShifts : 0;
  const subtotal = baseCost + riggerCost + fuelCost;
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;
  const handleSubmit = (e) => {
    e.preventDefault();
    submitRequest({
      customerId: currentUser?.id || "usr-cust-01",
      customerName,
      customerCompany,
      listingId: activeBookingListing.id,
      equipmentTitle: activeBookingListing.title,
      assetClass: activeBookingListing.assetClass,
      providerId: activeBookingListing.providerId,
      providerName: activeBookingListing.providerName,
      corridorHub: activeBookingListing.corridor,
      projectSite,
      startDate,
      durationShifts,
      riggerRequired,
      turnkeyFuelRequired,
      unitRate,
      totalEstimatedAmount: total,
      status: "PENDING_QUOTE",
      specialNotes,
      escrowStatus: "ESCROW_HOLD"
    });
    setActiveBookingListing(null);
    setActiveView("customer_dashboard");
  };
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-2xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C66A20]" />
              <h2 className="text-sm sm:text-base font-serif font-bold">
                Book Machinery & Request a Quote
              </h2>
            </div>
            <p className="text-[11px] sm:text-xs font-mono text-[#ABC8F4] mt-0.5 line-clamp-1">
              Machine: {activeBookingListing.title} ({activeBookingListing.registrationCode})
            </p>
          </div>
          <button
            onClick={() => setActiveBookingListing(null)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-6 flex-1 space-y-4 sm:space-y-5 no-scrollbar">
          {
    /* Machine Summary Callout with Real Photo */
  }
          <div className="bg-[#F7F6F2] border border-[#D5DCE4] rounded p-3 sm:p-4 flex items-center gap-4">
            <div className="w-20 h-16 rounded overflow-hidden bg-[#1E293B] shrink-0 border border-[#D5DCE4]">
              <img
    src={getMachineImageUrl(activeBookingListing.id, activeBookingListing.category)}
    alt={activeBookingListing.title}
    className="w-full h-full object-cover"
  />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-mono font-bold text-[#111F35] truncate">{activeBookingListing.title}</div>
              <div className="text-[11px] font-mono text-[#535F70] mt-0.5 truncate">
                Owner: {activeBookingListing.providerName}
              </div>
              <div className="text-xs font-mono font-bold text-[#C66A20] mt-0.5">
                ₹{activeBookingListing.baseRate.toLocaleString()} /{activeBookingListing.unitLabel}
              </div>
            </div>
            <div className="text-right shrink-0 hidden sm:block">
              <span className="text-[10px] font-mono uppercase text-[#1E6347] font-semibold bg-[#E8F2EC] px-2 py-0.5 rounded border border-[#1E6347]/30">
                Safe Payment Guarantee
              </span>
            </div>
          </div>

          {
    /* Customer & Company Details */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Your Full Name
              </label>
              <input
    type="text"
    required
    value={customerName}
    onChange={(e) => setCustomerName(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Company / Business Name
              </label>
              <input
    type="text"
    required
    value={customerCompany}
    onChange={(e) => setCustomerCompany(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>
          </div>

          {
    /* Project Siding & Site Address */
  }
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
              Delivery / Project Site Address
            </label>
            <div className="relative">
              <input
    type="text"
    required
    value={projectSite}
    onChange={(e) => setProjectSite(e.target.value)}
    className="w-full h-10 px-3 pr-8 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
              <MapPin className="w-4 h-4 text-[#75777E] absolute right-2.5 top-3" />
            </div>
          </div>

          {
    /* Deployment Schedule & Shifts */
  }
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Rental Start Date
              </label>
              <div className="relative">
                <input
    type="date"
    required
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
                Rental Duration ({durationShifts} {durationShifts === 1 ? "Shift" : "Shifts"})
              </label>
              <input
    type="number"
    min="1"
    max="60"
    value={durationShifts}
    onChange={(e) => setDurationShifts(Math.max(1, parseInt(e.target.value) || 1))}
    className="w-full h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs font-mono font-bold text-[#131B26] focus:outline-none focus:border-[#111F35]"
  />
            </div>
          </div>

          {
    /* Ancillary Services Checkboxes */
  }
          <div className="p-4 bg-[#FBFBF9] rounded border border-[#E2E6EB] space-y-3 text-xs">
            <div className="text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
              Optional Add-ons
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
    type="checkbox"
    checked={riggerRequired}
    onChange={(e) => setRiggerRequired(e.target.checked)}
    className="w-4 h-4 accent-[#111F35] rounded"
  />
              <span className="text-[#131B26] font-medium">
                Include Certified Operator & Rigging Crew (+₹2,500/shift)
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
    type="checkbox"
    checked={turnkeyFuelRequired}
    onChange={(e) => setTurnkeyFuelRequired(e.target.checked)}
    className="w-4 h-4 accent-[#111F35] rounded"
  />
              <span className="text-[#131B26] font-medium">
                Include Diesel / Fuel Supply (+₹4,500/shift)
              </span>
            </label>
          </div>

          {
    /* Notes */
  }
          <div>
            <label className="block text-[11px] font-mono uppercase text-[#535F70] font-bold mb-1">
              Special Instructions or Gate Pass Notes
            </label>
            <textarea
    rows={2}
    value={specialNotes}
    onChange={(e) => setSpecialNotes(e.target.value)}
    className="w-full p-2.5 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] focus:outline-none focus:border-[#111F35] resize-none"
  />
          </div>

          {
    /* Cost Ledger Breakdown */
  }
          <div className="bg-[#111F35] text-white p-4 rounded border border-[#2C4A6F] font-mono text-xs space-y-2">
            <div className="flex justify-between text-[#CBD5E1]">
              <span>Base Equipment Rental ({durationShifts} shifts × ₹{unitRate.toLocaleString()}):</span>
              <span>₹{baseCost.toLocaleString()}</span>
            </div>
            {riggerCost > 0 && <div className="flex justify-between text-[#CBD5E1]">
                <span>Certified Operator Crew:</span>
                <span>₹{riggerCost.toLocaleString()}</span>
              </div>}
            {fuelCost > 0 && <div className="flex justify-between text-[#CBD5E1]">
                <span>Fuel Supply (Diesel):</span>
                <span>₹{fuelCost.toLocaleString()}</span>
              </div>}
            <div className="flex justify-between text-[#CBD5E1]">
              <span>GST (18%):</span>
              <span>₹{gst.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-[#2C4A6F] flex justify-between text-sm font-bold text-white">
              <span>Estimated Total Cost:</span>
              <span className="text-[#FF964A]">₹{total.toLocaleString()}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveBookingListing(null)}
              className="px-4 py-2.5 sm:py-2 border border-[#D5DCE4] text-[#111F35] text-xs font-mono uppercase rounded-lg hover:bg-[#ECEEE8] transition-colors cursor-pointer text-center font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 sm:py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer text-center"
            >
              <span>Submit Booking Request</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>;
};
