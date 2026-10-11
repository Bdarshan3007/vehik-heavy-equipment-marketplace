import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  ShieldCheck,
  ArrowLeft,
  Star
} from "lucide-react";
export const AdminDashboard = () => {
  const {
    listings,
    providers,
    requests,
    reviews,
    updateListing,
    deleteListing,
    togglePauseListing,
    toggleProviderVerification,
    setActiveView,
    showNotification
  } = useMarketplace();
  const [adminTab, setAdminTab] = useState("listings");

  // Dynamic calculations derived from actual available demo data
  const totalListings = listings.length;
  const activeListingsCount = listings.filter((l) => !l.isPaused).length;
  const pausedListingsCount = listings.filter((l) => l.isPaused).length;
  const verifiedListingsCount = listings.filter((l) => l.partnerVerified).length;

  const totalProviders = providers.length;
  const verifiedProvidersCount = providers.filter((p) => Boolean(p.verifiedStatus)).length;

  const totalRequests = requests.length;
  const pendingRequestsCount = requests.filter(
    (r) => r.status === "PENDING_QUOTE" || r.status === "QUOTE_RECEIVED"
  ).length;
  const confirmedRequestsCount = requests.filter(
    (r) => r.status === "CONFIRMED" || r.status === "DISPATCHED"
  ).length;
  const completedRequestsCount = requests.filter((r) => r.status === "COMPLETED").length;

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0) / totalReviews).toFixed(1)
    : "5.0";

  const handleToggleVerification = (listingId, current) => {
    updateListing(listingId, { partnerVerified: !current });
    showNotification(`Listing verification updated: ${!current ? "Verified" : "Unverified"}`);
  };
  return <div className="py-8 px-4 sm:px-6 max-w-[1440px] mx-auto select-none">
      {
    /* Top Header */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#D5DCE4]">
        <div>
          <button
    onClick={() => setActiveView("marketplace")}
    className="text-xs font-mono text-[#535F70] hover:text-[#111F35] flex items-center gap-1.5 mb-2 cursor-pointer"
  >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Equipment Marketplace</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#111F35]">
              VEHIK Admin Management Portal
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111F35] text-white border border-[#2C4A6F]">
              ADMIN CONSOLE
            </span>
          </div>
          <p className="text-xs font-mono text-[#535F70] mt-1">
            Monitor verified machines, manage registered equipment owners, track requests, and inspect customer reviews.
          </p>
        </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 bg-[#ECEEE8] rounded-xl text-xs font-mono overflow-x-auto no-scrollbar w-full sm:w-auto">
        <button
          onClick={() => setAdminTab("listings")}
          className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${adminTab === "listings" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
        >
          Manage Equipment Listings ({listings.length})
        </button>
        <button
          onClick={() => setAdminTab("providers")}
          className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${adminTab === "providers" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
        >
          Verified Equipment Owners ({providers.length})
        </button>
        <button
          onClick={() => setAdminTab("requests")}
          className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${adminTab === "requests" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
        >
          Platform Requests ({requests.length})
        </button>
        <button
          onClick={() => setAdminTab("reviews")}
          className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${adminTab === "reviews" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
        >
          Customer Reviews ({reviews.length})
        </button>
      </div>
    </div>

    {/* Top System Health Grid - Dynamic Derived Metrics */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
        <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Total Machinery Listings</div>
        <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">{totalListings} Units</div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#1E6347] mt-0.5 sm:mt-1 truncate">
          {activeListingsCount} Active · {pausedListingsCount} Paused
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
        <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Verified Fleet Providers</div>
        <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">{verifiedProvidersCount} / {totalProviders} Verified</div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#1E6347] mt-0.5 sm:mt-1 truncate">
          {verifiedListingsCount} of {totalListings} Units Audited
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
        <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Platform RFQs & Bookings</div>
        <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">{totalRequests} Requests</div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#2C4A6F] mt-0.5 sm:mt-1 truncate">
          {pendingRequestsCount} Pending · {confirmedRequestsCount + completedRequestsCount} Active/Done
        </div>
      </div>

      <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
        <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Customer Trust & Reviews</div>
        <div className="text-xl sm:text-2xl font-mono font-bold text-[#1E6347] mt-1 tabular-nums">{totalReviews} Reviews</div>
        <div className="text-[10px] sm:text-[11px] font-mono text-[#535F70] mt-0.5 sm:mt-1 truncate">
          {avgRating} ★ Platform Avg Score
        </div>
      </div>
    </div>

    {/* Tab: Listings Moderation */}
    {adminTab === "listings" && <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-xl overflow-hidden shadow-sm">
        <div className="p-3.5 sm:p-4 bg-[#F7F6F2] border-b border-[#D5DCE4] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <span className="text-xs font-mono font-bold uppercase text-[#535F70]">
            All Registered Machines
          </span>
          <span className="text-xs font-mono text-[#1E6347]">
            ● Connected to official vehicle registry
          </span>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full min-w-[720px] text-left text-xs font-mono">
            <thead className="bg-[#FFFFFF] text-[#535F70] uppercase text-[10px] border-b border-[#E2E6EB]">
              <tr>
                <th className="p-3.5">Machine ID / Plate</th>
                <th className="p-3.5">Make & Class</th>
                <th className="p-3.5">Current Location</th>
                <th className="p-3.5">Insurance Valid Until</th>
                <th className="p-3.5">Verification Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E6EB]">
              {listings.map((item) => <tr key={item.id} className="hover:bg-[#FBFBF9]">
                  <td className="p-3.5 font-bold text-[#C66A20]">
                    {item.registrationCode}
                  </td>
                  <td className="p-3.5">
                    <div className="font-semibold text-[#111F35]">{item.title}</div>
                    <div className="text-[10px] text-[#75777E]">{item.assetClass}</div>
                  </td>
                  <td className="p-3.5">
                    <div>{item.depotCity}</div>
                    <div className="text-[10px] text-[#75777E]">{item.corridor}</div>
                  </td>
                  <td className="p-3.5 text-[#535F70]">
                    {item.insuranceValidDate}
                  </td>
                  <td className="p-3.5">
                    <div className="flex flex-col items-start gap-1">
                      <button
                        onClick={() => handleToggleVerification(item.id, item.partnerVerified)}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase cursor-pointer ${item.partnerVerified ? "bg-[#E8F2EC] text-[#1E6347] border-[#A7F3D0]" : "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]"}`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        {item.partnerVerified ? "Verified ✓" : "Under Review"}
                      </button>
                      <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border ${item.isPaused ? "bg-[#ECEEE8] text-[#535F70] border-[#D5DCE4]" : "bg-[#E8F2EC] text-[#1E6347] border-[#A7F3D0]"}`}>
                        {item.isPaused ? "Paused" : "Available"}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 text-right space-x-1.5">
                    <button
                      onClick={() => togglePauseListing(item.id)}
                      className={`px-2 py-1 text-[11px] rounded transition-colors cursor-pointer border ${item.isPaused ? "bg-[#ECEEE8] text-[#535F70] border-[#D5DCE4] hover:bg-[#D5DCE4]" : "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE] hover:bg-[#DBEAFE]"}`}
                      title={item.isPaused ? "Reactivate listing" : "Pause listing"}
                    >
                      {item.isPaused ? "Unpause" : "Pause"}
                    </button>
                    <button
                      onClick={() => deleteListing(item.id)}
                      className="px-2.5 py-1 text-[11px] text-[#BA1A1A] hover:bg-[#FEE2E2] rounded transition-colors cursor-pointer"
                    >
                      Remove
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>}

      {
    /* Tab: Verified Equipment Owners */
  }
      {adminTab === "providers" && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {providers.map((p) => <div key={p.id} className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E6EB] mb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#111F35]">{p.name}</h3>
                  <div className="text-[11px] font-mono text-[#535F70]">{p.businessType}</div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleProviderVerification(p.id)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border transition-colors cursor-pointer ${
                    p.verifiedStatus
                      ? "text-[#1E6347] bg-[#E8F2EC] border-[#A7F3D0] hover:bg-[#D5EADF]"
                      : "text-[#B45309] bg-[#FEF3C7] border-[#FDE68A] hover:bg-[#FDE68A]"
                  }`}
                  title="Click to toggle provider verification audit status"
                >
                  {p.verifiedStatus ? "VERIFIED OWNER ✓" : "UNDER AUDIT ⚠"}
                </button>
              </div>

              <div className="space-y-1.5 text-xs font-mono text-[#535F70] mb-4">
                <div>Primary Location: <strong className="text-[#111F35]">{p.hubLocation}</strong></div>
                <div>GST Number: <strong className="text-[#111F35]">{p.gstin}</strong></div>
                <div>Fleet Size: <strong className="text-[#111F35]">{p.fleetSize} Machines</strong></div>
                <div>Contact: {p.contactPerson} ({p.contactPhone})</div>
                <div>Average Dispatch Time: <strong className="text-[#C66A20]">{p.responseTimeMinutes} Minutes</strong></div>
              </div>

              <div className="pt-3 border-t border-[#E2E6EB] flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1 text-[#111F35]">
                  <Star className="w-3.5 h-3.5 fill-[#C66A20] text-[#C66A20]" />
                  <strong>{p.rating}</strong> ({p.reviewsCount} customer reviews)
                </span>
                <span className={p.verifiedStatus ? "text-[#1E6347] font-semibold" : "text-[#B45309] font-semibold"}>
                  {p.verifiedStatus ? "Background Checked" : "Verification Pending"}
                </span>
              </div>
            </div>)}
        </div>}

      {/* Tab: Platform Requests */}
      {adminTab === "requests" && (
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-xl overflow-hidden shadow-sm">
          <div className="p-3.5 sm:p-4 bg-[#F7F6F2] border-b border-[#D5DCE4] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
            <span className="text-xs font-mono font-bold uppercase text-[#535F70]">
              All Platform RFQs & Bookings
            </span>
            <span className="text-xs font-mono text-[#1E6347]">
              ● Real-time marketplace audit log
            </span>
          </div>

          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[760px] text-left text-xs font-mono">
              <thead className="bg-[#FFFFFF] text-[#535F70] uppercase text-[10px] border-b border-[#E2E6EB]">
                <tr>
                  <th className="p-3.5">RFQ / Request #</th>
                  <th className="p-3.5">Customer / Company</th>
                  <th className="p-3.5">Machine Requested</th>
                  <th className="p-3.5">Fleet Owner</th>
                  <th className="p-3.5">Quoted / Total</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Escrow</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EB]">
                {requests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#535F70]">
                      No RFQs or bookings submitted yet on platform.
                    </td>
                  </tr>
                ) : (
                  requests.map((req) => (
                    <tr key={req.id} className="hover:bg-[#FBFBF9]">
                      <td className="p-3.5 font-bold text-[#C66A20]">
                        <div>{req.requestNumber || req.id}</div>
                        <div className="text-[10px] text-[#75777E] font-normal">{req.createdAt}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[#111F35]">{req.customerCompany}</div>
                        <div className="text-[10px] text-[#75777E]">{req.customerName}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[#111F35]">{req.equipmentTitle}</div>
                        <div className="text-[10px] text-[#75777E]">{req.corridorHub}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-[#111F35]">{req.providerName || req.providerId}</div>
                      </td>
                      <td className="p-3.5 font-bold text-[#111F35]">
                        ₹{(req.quotedAmount || req.totalEstimatedAmount || 0).toLocaleString()}
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          req.status === "CONFIRMED"
                            ? "bg-[#E8F2EC] text-[#1E6347] border-[#A7F3D0]"
                            : req.status === "QUOTE_RECEIVED"
                            ? "bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]"
                            : req.status === "CANCELLED"
                            ? "bg-[#FEE2E2] text-[#991B1B] border-[#FECACA]"
                            : "bg-[#FEF3C7] text-[#B45309] border-[#FDE68A]"
                        }`}>
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right font-semibold text-[10px] uppercase">
                        <span className="text-[#1E6347]">{req.escrowStatus || "ESCROW_HOLD"}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Customer Reviews */}
      {adminTab === "reviews" && <div className="space-y-4">
          {reviews.map((rev) => <div key={rev.id} className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-xl p-4 sm:p-5 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-3.5 h-3.5 fill-[#C66A20] text-[#C66A20]" />)}
                  </div>
                  <span className="text-xs font-mono font-bold text-[#111F35]">{rev.authorName}</span>
                  <span className="text-[11px] font-mono text-[#75777E]">({rev.authorRole}, {rev.authorCompany})</span>
                </div>
                <span className="text-[11px] font-mono text-[#75777E]">{rev.date}</span>
              </div>

              <p className="text-xs text-[#131B26] leading-relaxed mb-3">
                "{rev.comment}"
              </p>

              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] font-mono text-[#535F70] bg-[#F7F6F2] p-2 sm:p-2.5 rounded-lg">
                <span>Machine Quality: 5.0</span>
                <span>Condition: 5.0</span>
                <span>Punctuality: 5.0</span>
                <span>Operator Skill: 5.0</span>
              </div>
            </div>)}
        </div>}
    </div>;
};
