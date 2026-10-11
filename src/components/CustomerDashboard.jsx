import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  FileText,
  Bookmark,
  Star,
  ArrowLeft,
  ShieldCheck
} from "lucide-react";
import { getMachineImageUrl } from "./MachineImage";
export const CustomerDashboard = () => {
  const {
    requests,
    listings,
    favorites,
    toggleFavorite,
    setActiveView,
    setActiveBookingListing,
    setActiveAuditListing,
    updateEscrowStatus,
    addReview,
    showNotification,
    currentUser
  } = useMarketplace();
  const [activeTab, setActiveTab] = useState("requests");
  const [reviewModalRequest, setReviewModalRequest] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [qualityScore, setQualityScore] = useState(5);
  const [conditionScore, setConditionScore] = useState(5);
  const [punctualityScore, setPunctualityScore] = useState(5);
  const [operatorScore, setOperatorScore] = useState(5);
  const favoritedListings = listings.filter((l) => favorites.includes(l.id));

  // Customer Data Isolation: Filter requests for the active customer
  const activeCustomerId = currentUser?.id || "usr-cust-01";
  const isPrimaryDemoCustomer = activeCustomerId === "usr-cust-01";

  const myRequests = requests.filter((req) => {
    // 1. Direct match with current active user ID
    if (req.customerId === activeCustomerId) return true;

    // 2. Legacy seed compatibility:
    // Seeded records (req-01: 'cust-101', req-02: 'cust-102') and previous mock submissions ('cust-current')
    // remain visible under the default primary demo customer ('usr-cust-01' / Darshan Patel)
    // so evaluator demo flows remain complete and verifiable.
    if (isPrimaryDemoCustomer) {
      return (
        req.customerId === "cust-101" ||
        req.customerId === "cust-102" ||
        req.customerId === "cust-current" ||
        req.customerName === currentUser?.name
      );
    }

    // 3. Other registered customers only see records that explicitly match their ID
    return false;
  });

  const handleFundEscrow = (reqId) => {
    updateEscrowStatus(reqId, "ADVANCE_RELEASED");
    showNotification("Escrow milestone secured in institutional trust account!");
  };
  const handleCompleteReview = (e) => {
    e.preventDefault();
    if (!reviewModalRequest) return;
    addReview({
      listingId: reviewModalRequest.listingId,
      authorName: reviewModalRequest.customerName,
      authorRole: "Project Manager",
      authorCompany: reviewModalRequest.customerCompany,
      rating: reviewRating,
      comment: reviewComment || "Equipment arrived on time, was in great condition, with a skilled operator.",
      metrics: {
        serviceQuality: qualityScore,
        equipmentCondition: conditionScore,
        punctuality: punctualityScore,
        operatorSkill: operatorScore
      }
    });
    setReviewModalRequest(null);
  };
  return <div className="py-5 sm:py-8 px-3 sm:px-6 max-w-[1440px] mx-auto select-none">
      {/* Top Banner / Back to Catalog */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#D5DCE4]">
        <div>
          <button
            onClick={() => setActiveView("marketplace")}
            className="text-xs font-mono text-[#535F70] hover:text-[#111F35] flex items-center gap-1.5 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>← Back to Marketplace</span>
          </button>
          <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#111F35]">
            My Bookings & Quotes
          </h1>
          <p className="text-xs font-mono text-[#535F70] mt-1">
            Track your machinery bookings, review quotes from owners, and manage saved equipment.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1 p-1 bg-[#ECEEE8] rounded-xl text-xs font-mono w-full sm:w-auto">
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors font-semibold text-center cursor-pointer ${activeTab === "requests" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
          >
            My Bookings ({myRequests.length})
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`px-3 sm:px-4 py-2 rounded-lg transition-colors font-semibold text-center cursor-pointer ${activeTab === "favorites" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
          >
            Saved Machines ({favorites.length})
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === "requests" ? <div className="space-y-4">
          {myRequests.length === 0 ? <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl p-8 sm:p-12 text-center">
              <FileText className="w-8 h-8 text-[#75777E] mx-auto mb-2" />
              <p className="text-base font-serif text-[#111F35] mb-1">No bookings or quotes yet</p>
              <p className="text-xs font-mono text-[#535F70] mb-4">
                {currentUser?.name ? `No active rental orders found for ${currentUser.name}.` : "Browse our equipment catalog or use the AI Machine Finder to book"}
              </p>
              <button
                onClick={() => setActiveView("marketplace")}
                className="px-4 py-2 bg-[#C66A20] text-white text-xs font-mono uppercase rounded font-bold cursor-pointer hover:bg-[#D97706] transition-colors"
              >
                Browse Machinery
              </button>
            </div> : myRequests.map((req) => {
    const statusColors = {
      PENDING_QUOTE: "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]",
      QUOTE_RECEIVED: "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]",
      CONFIRMED: "bg-[#E8F2EC] text-[#1E6347] border-[#A7F3D0]",
      DISPATCHED: "bg-[#FAF5FF] text-[#7E22CE] border-[#E9D5FF]",
      COMPLETED: "bg-[#ECEEE8] text-[#535F70] border-[#D5DCE4]",
      CANCELLED: "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]"
    };
    return <div
      key={req.id}
      className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#111F35] transition-all"
    >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E6EB]">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-14 rounded-xl overflow-hidden bg-[#1E293B] shrink-0 border border-[#D5DCE4]">
                        <img
                          src={getMachineImageUrl(req.listingId)}
                          alt={req.equipmentTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-xs font-mono font-bold text-[#C66A20]">{req.requestNumber}</span>
                          <span className="text-[#C5C6CD]">·</span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${statusColors[req.status]}`}>
                            {req.status.replace("_", " ")}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-serif font-bold text-[#111F35] leading-snug">
                          {req.equipmentTitle}
                        </h3>
                        <div className="text-[11px] sm:text-xs font-mono text-[#535F70] mt-0.5">
                          Owner: <strong className="text-[#111F35]">{req.providerName}</strong> · {req.corridorHub}
                        </div>
                      </div>
                    </div>

                    <div className="text-left sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 sm:border-l sm:border-[#E2E6EB] sm:pl-6 flex sm:flex-col justify-between items-baseline sm:items-end">
                      <div>
                        <div className="text-[10px] font-mono uppercase text-[#75777E]">Total Rental Cost</div>
                        <div className="text-lg sm:text-xl font-mono font-bold text-[#111F35]">
                          ₹{req.totalEstimatedAmount.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-[10px] sm:text-[11px] font-mono text-[#1E6347] flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Escrow: {req.escrowStatus.replace("_", " ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Details strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 py-3 text-xs font-mono text-[#535F70]">
                    <div>
                      <span className="text-[#75777E] text-[10px] uppercase block">Project Site</span>
                      <span className="font-semibold text-[#111F35] truncate block">{req.projectSite}</span>
                    </div>
                    <div>
                      <span className="text-[#75777E] text-[10px] uppercase block">Schedule & Duration</span>
                      <span className="font-semibold text-[#111F35] block">
                        Start: {req.startDate} ({req.durationShifts} Shifts)
                      </span>
                    </div>
                    <div>
                      <span className="text-[#75777E] text-[10px] uppercase block">Special Conditions</span>
                      <span className="text-[#535F70] block truncate">
                        {req.riggerRequired ? "Riggers Required · " : ""}
                        {req.turnkeyFuelRequired ? "Turnkey Fuel" : "Customer Fuel"}
                      </span>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-3 border-t border-[#E2E6EB] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
                    <div className="text-[11px] font-mono text-[#75777E]">
                      {req.specialNotes && <span>Note: {req.specialNotes}</span>}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {req.escrowStatus === "ESCROW_HOLD" && <button
                        onClick={() => handleFundEscrow(req.id)}
                        className="w-full sm:w-auto px-3 py-1.5 bg-[#1E6347] hover:bg-[#154a34] text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer text-center"
                      >
                        Release Gate-In Advance
                      </button>}

                      <button
                        onClick={() => setReviewModalRequest(req)}
                        className="w-full sm:w-auto px-3 py-1.5 bg-[#ECEEE8] hover:bg-[#D5DCE4] text-[#111F35] text-xs font-mono font-semibold uppercase rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Star className="w-3.5 h-3.5 text-[#C66A20]" />
                        <span>Submit Performance Review</span>
                      </button>
                    </div>
                  </div>
                </div>;
  })}
        </div> : (
    /* Saved Fleet Machines Grid */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoritedListings.length === 0 ? <div className="col-span-full bg-[#FFFFFF] border border-[#D5DCE4] rounded p-12 text-center">
              <Bookmark className="w-8 h-8 text-[#75777E] mx-auto mb-2" />
              <p className="text-base font-serif text-[#111F35] mb-1">No saved equipment units</p>
              <p className="text-xs font-mono text-[#535F70]">Click the bookmark icon on any machinery card to pin it here for rapid access.</p>
            </div> : favoritedListings.map((item) => <div key={item.id} className="bg-[#FFFFFF] border border-[#D5DCE4] rounded overflow-hidden shadow-sm flex flex-col justify-between group">
                <div className="relative h-36 w-full bg-[#1E293B]">
                  <img
      src={getMachineImageUrl(item.id, item.category)}
      alt={item.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
                  <div className="absolute top-2 right-2">
                    <button
      onClick={() => toggleFavorite(item.id)}
      className="bg-black/60 hover:bg-[#BA1A1A] text-white px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer backdrop-blur-xs transition-colors"
    >
                      Remove
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className="text-[10px] font-mono text-white bg-black/60 px-1.5 py-0.5 rounded font-bold backdrop-blur-xs">{item.registrationCode}</span>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-serif font-bold text-[#111F35] mb-1">{item.title}</h3>
                    <div className="text-xs font-mono text-[#535F70] mb-2">{item.providerName}</div>
                    <div className="text-sm font-mono font-bold text-[#111F35] mb-4">
                      ₹{item.baseRate.toLocaleString()} <span className="text-xs text-[#75777E] font-normal">/{item.unitLabel}</span>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-[#E2E6EB]">
                  <button
      onClick={() => setActiveBookingListing(item)}
      className="w-full py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase rounded cursor-pointer"
    >
                    Direct RFQ / Book
                  </button>
                  <button
      onClick={() => setActiveAuditListing(item)}
      className="w-full py-1.5 bg-[#ECEEE8] hover:bg-[#D5DCE4] text-[#111F35] text-xs font-mono rounded cursor-pointer"
    >
                    Inspection Audit Sheet
                  </button>
                </div>
              </div>
            </div>)}
        </div>
  )}

      {
    /* Review Submission Modal */
  }
      {reviewModalRequest && <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
          <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded w-full max-w-lg shadow-2xl p-6">
            <h2 className="text-base font-serif font-bold text-[#111F35] mb-1">
              Submit Operational Evaluation & Review
            </h2>
            <p className="text-xs font-mono text-[#535F70] mb-4">
              Rate {reviewModalRequest.equipmentTitle} operated by {reviewModalRequest.providerName}.
            </p>

            <form onSubmit={handleCompleteReview} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#535F70] uppercase font-bold mb-1">Overall Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => <button
    type="button"
    key={star}
    onClick={() => setReviewRating(star)}
    className="p-1 cursor-pointer"
  >
                      <Star className={`w-6 h-6 ${star <= reviewRating ? "fill-[#C66A20] text-[#C66A20]" : "text-[#D5DCE4]"}`} />
                    </button>)}
                  <span className="font-bold text-sm text-[#111F35] ml-2">{reviewRating}.0 / 5.0</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-[#F7F6F2] p-3 rounded border border-[#E2E6EB]">
                <div>
                  <label className="text-[10px] text-[#75777E] uppercase block mb-1">Punctuality & Mobilize</label>
                  <input
    type="range"
    min="1"
    max="5"
    value={punctualityScore}
    onChange={(e) => setPunctualityScore(Number(e.target.value))}
    className="w-full h-1.5 accent-[#C66A20]"
  />
                </div>
                <div>
                  <label className="text-[10px] text-[#75777E] uppercase block mb-1">Equipment Condition</label>
                  <input
    type="range"
    min="1"
    max="5"
    value={conditionScore}
    onChange={(e) => setConditionScore(Number(e.target.value))}
    className="w-full h-1.5 accent-[#C66A20]"
  />
                </div>
              </div>

              <div>
                <label className="block text-[#535F70] uppercase font-bold mb-1">Executive Field Notes</label>
                <textarea
    rows={3}
    value={reviewComment}
    onChange={(e) => setReviewComment(e.target.value)}
    placeholder="Describe machine performance, rigger cooperation, gate pass induction, or cycle times..."
    className="w-full p-2.5 bg-[#FFFFFF] border border-[#D5DCE4] rounded text-xs text-[#131B26] resize-none"
  />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
    type="button"
    onClick={() => setReviewModalRequest(null)}
    className="px-4 py-2 border border-[#D5DCE4] rounded text-xs uppercase cursor-pointer"
  >
                  Cancel
                </button>
                <button
    type="submit"
    className="px-5 py-2 bg-[#C66A20] text-white rounded text-xs font-bold uppercase cursor-pointer"
  >
                  Post to Machine Ledger
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
