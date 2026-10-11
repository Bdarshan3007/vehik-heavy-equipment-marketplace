import { useState } from "react";
import { useMarketplace } from "../context/MarketplaceContext";
import {
  PlusCircle,
  Pause,
  Play,
  Trash2,
  Copy,
  Check,
  ArrowLeft
} from "lucide-react";
export const ProviderDashboard = () => {
  const {
    listings,
    requests,
    providers,
    currentUser,
    addListing,
    updateListing,
    deleteListing,
    togglePauseListing,
    updateRequestStatus,
    setIsRegisterFleetOpen,
    setActiveView,
    showNotification
  } = useMarketplace();
  const [providerTab, setProviderTab] = useState("requests");
  const [customQuoteModal, setCustomQuoteModal] = useState(null);
  const [quoteInput, setQuoteInput] = useState(0);

  // Active Provider ID resolution with demo switcher support
  const defaultProviderId = currentUser?.providerId || (currentUser?.id === "usr-prov-01" ? "prov-01" : currentUser?.id) || "prov-01";
  const [selectedProviderId, setSelectedProviderId] = useState(defaultProviderId);
  const activeProviderId = selectedProviderId || defaultProviderId;

  // Filter listings owned by this provider
  const myListings = listings.filter((l) => {
    return l.providerId === activeProviderId || (currentUser?.id && l.providerId === currentUser.id);
  });
  const ownedListingIds = new Set(myListings.map((l) => l.id));

  // Filter incoming requests directed to this provider or associated with owned machines
  const incomingRequests = requests.filter((r) => {
    if (r.providerId === activeProviderId) return true;
    if (currentUser?.id && r.providerId === currentUser.id) return true;
    if (r.listingId && ownedListingIds.has(r.listingId)) return true;
    return false;
  });

  const handleOpenQuoteModal = (req) => {
    setCustomQuoteModal(req);
    setQuoteInput(req.totalEstimatedAmount);
  };
  const handleSendQuote = (e) => {
    e.preventDefault();
    if (!customQuoteModal) return;
    updateRequestStatus(customQuoteModal.id, "QUOTE_RECEIVED", quoteInput);
    setCustomQuoteModal(null);
    showNotification(`Quote of ₹${quoteInput.toLocaleString()} sent to client`);
  };
  const handleAcceptRequest = (reqId) => {
    updateRequestStatus(reqId, "CONFIRMED");
    showNotification("Booking confirmed! Machine scheduled for client.");
  };
  const handleRejectRequest = (reqId) => {
    updateRequestStatus(reqId, "CANCELLED");
    showNotification("Booking request declined.");
  };
  const handleDuplicateListing = (listing) => {
    addListing({
      ...listing,
      title: `${listing.title} (Unit B)`,
      providerId: activeProviderId
    });
    showNotification("Machine duplicated in your list");
  };
  const totalFleetUnits = myListings.length;
  const activeFleetCount = myListings.filter((l) => !l.isPaused).length;
  const pendingRequestsCount = incomingRequests.filter((r) => r.status === "PENDING_QUOTE").length;
  const confirmedVolume = incomingRequests
    .filter((r) => r.status === "CONFIRMED" || r.status === "COMPLETED")
    .reduce((acc, curr) => acc + (curr.quotedAmount || curr.totalEstimatedAmount), 0);

  const currentProviderInfo = providers.find((p) => p.id === activeProviderId);

  return <div className="py-5 sm:py-8 px-3 sm:px-6 max-w-[1440px] mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-[#D5DCE4]">
        <div>
          <button
            onClick={() => setActiveView("marketplace")}
            className="text-xs font-mono text-[#535F70] hover:text-[#111F35] flex items-center gap-1.5 mb-2 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Equipment Marketplace</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-3xl font-serif font-bold text-[#111F35]">
              Equipment Owner Dashboard
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172A46] text-[#ABC8F4] border border-[#2C4A6F]">
              OWNER PORTAL
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-[11px] font-mono uppercase text-[#75777E] font-bold">Fleet Account:</span>
            <select
              value={activeProviderId}
              onChange={(e) => setSelectedProviderId(e.target.value)}
              className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg px-2.5 py-1 text-xs font-mono text-[#111F35] font-semibold focus:outline-none focus:border-[#111F35] cursor-pointer"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
              {currentUser && !providers.some((p) => p.id === currentUser.id) && currentUser.id !== "usr-prov-01" && (
                <option value={currentUser.id}>
                  {currentUser.companyName || currentUser.name} ({currentUser.id})
                </option>
              )}
            </select>
            {currentProviderInfo && (
              <span className="text-[11px] font-mono text-[#535F70]">
                Location: {currentProviderInfo.hubLocation}
              </span>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 p-1 bg-[#ECEEE8] rounded-xl text-xs font-mono overflow-x-auto no-scrollbar">
            <button
              onClick={() => setProviderTab("requests")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${providerTab === "requests" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
            >
              Requests ({incomingRequests.length})
            </button>
            <button
              onClick={() => setProviderTab("inventory")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${providerTab === "inventory" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
            >
              My Fleet ({totalFleetUnits})
            </button>
            <button
              onClick={() => setProviderTab("analytics")}
              className={`px-3 py-1.5 rounded-lg transition-colors font-semibold cursor-pointer whitespace-nowrap shrink-0 ${providerTab === "analytics" ? "bg-[#111F35] text-white shadow-sm" : "text-[#535F70] hover:text-[#111F35]"}`}
            >
              Earnings
            </button>
          </div>

          <button
            onClick={() => setIsRegisterFleetOpen(true)}
            className="px-3.5 py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Machine</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Active Machines</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">
            {activeFleetCount} / {totalFleetUnits}
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-[#1E6347] mt-0.5 sm:mt-1 truncate">All passed checks</div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Pending Requests</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#C66A20] mt-1 tabular-nums">
            {pendingRequestsCount} Requests
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-[#535F70] mt-0.5 sm:mt-1 truncate">Avg response &lt; 20m</div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Confirmed Bookings</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">
            ₹{(confirmedVolume / 1e5).toFixed(2)} L
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-[#1E6347] mt-0.5 sm:mt-1 truncate">Payment Guaranteed</div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-3 sm:p-4 rounded-xl shadow-sm">
          <div className="text-[9px] sm:text-[10px] font-mono uppercase text-[#75777E]">Usage Rate</div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-[#111F35] mt-1 tabular-nums">
            88.4%
          </div>
          <div className="text-[10px] sm:text-[11px] font-mono text-[#2C4A6F] mt-0.5 sm:mt-1 truncate">Top Service Areas</div>
        </div>
      </div>

      {
    /* Tab: Incoming Requests */
  }
      {providerTab === "requests" && <div className="space-y-4">
          {incomingRequests.length === 0 ? <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-xl p-12 text-center">
              <Check className="w-8 h-8 text-[#75777E] mx-auto mb-2" />
              <p className="text-sm font-mono text-[#111F35] font-bold">No incoming rental requests for this fleet at this time</p>
              <p className="text-xs font-mono text-[#535F70] mt-1">Your registered machines are listed on the active corridor registry ready for inquiries.</p>
            </div> : incomingRequests.map((req) => <div
    key={req.id}
    className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-5 shadow-sm hover:border-[#111F35] transition-all"
  >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E2E6EB]">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono font-bold text-[#C66A20]">{req.requestNumber}</span>
                      <span className="text-[#C5C6CD]">·</span>
                      <span className="text-xs font-mono font-bold text-[#111F35]">{req.customerCompany}</span>
                      <span className="text-[#C5C6CD]">·</span>
                      <span className="text-[11px] font-mono text-[#75777E]">Contact: {req.customerName}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#111F35]">
                      {req.equipmentTitle}
                    </h3>

                    <div className="text-xs font-mono text-[#535F70] mt-0.5">
                      Work Site: <strong className="text-[#111F35]">{req.projectSite}</strong> · Nearest Hub: {req.corridorHub}
                    </div>
                  </div>

                  <div className="text-left sm:text-right lg:border-l lg:border-[#E2E6EB] lg:pl-6">
                    <div className="text-[10px] font-mono uppercase text-[#75777E]">Estimated Rental Amount</div>
                    <div className="text-xl font-mono font-bold text-[#111F35]">
                      ₹{(req.quotedAmount || req.totalEstimatedAmount).toLocaleString()}
                    </div>
                    <div className="text-xs font-mono font-semibold text-[#C66A20]">
                      Status: {req.status === "PENDING_QUOTE" ? "Action Needed" : req.status === "QUOTE_RECEIVED" ? "Quote Sent" : "Confirmed"}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-3 text-xs font-mono text-[#535F70]">
                  <div>
                    <span className="text-[#75777E] text-[10px] uppercase block">Start Date</span>
                    <span className="font-semibold text-[#111F35]">{req.startDate}</span>
                  </div>
                  <div>
                    <span className="text-[#75777E] text-[10px] uppercase block">Rental Duration</span>
                    <span className="font-semibold text-[#111F35]">{req.durationShifts} Shifts (Days)</span>
                  </div>
                  <div>
                    <span className="text-[#75777E] text-[10px] uppercase block">Services Included</span>
                    <span className="font-semibold text-[#111F35]">
                      {req.riggerRequired ? "Riggers + " : ""}
                      {req.turnkeyFuelRequired ? "Fuel Included" : "Machine Only"}
                    </span>
                  </div>
                </div>

                {/* Provider Actions for Requests */}
                <div className="pt-3 border-t border-[#E2E6EB] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-mono text-[#75777E]">
                    {req.specialNotes && <span>Notes: {req.specialNotes}</span>}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    {req.status === "PENDING_QUOTE" && <>
                        <button
                          onClick={() => handleOpenQuoteModal(req)}
                          className="px-3.5 py-2.5 sm:py-1.5 bg-[#172A46] hover:bg-[#213554] text-white text-xs font-mono font-semibold uppercase rounded transition-colors cursor-pointer text-center"
                        >
                          Send Custom Quote
                        </button>
                        <button
                          onClick={() => handleAcceptRequest(req.id)}
                          className="px-3.5 py-2.5 sm:py-1.5 bg-[#1E6347] hover:bg-[#154a34] text-white text-xs font-mono font-bold uppercase rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Request</span>
                        </button>
                        <button
                          onClick={() => handleRejectRequest(req.id)}
                          className="px-3 py-2.5 sm:py-1.5 border border-[#D5DCE4] hover:bg-[#FEE2E2] hover:text-[#991B1B] text-xs font-mono uppercase rounded transition-colors cursor-pointer text-center"
                        >
                          Decline
                        </button>
                      </>}

                    {req.status === "QUOTE_RECEIVED" && <span className="text-xs font-mono text-[#1D4ED8] bg-[#EFF6FF] px-3 py-1.5 rounded border border-[#BFDBFE] text-center">
                        Quote Sent: ₹{req.quotedAmount?.toLocaleString()} · Waiting for client approval
                      </span>}

                    {req.status === "CONFIRMED" && <span className="text-xs font-mono text-[#1E6347] bg-[#E8F2EC] px-3 py-1.5 rounded border border-[#A7F3D0] flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Confirmed & Scheduled for Delivery
                      </span>}
                  </div>
                </div>
              </div>)}
        </div>}

      {/* Tab: Fleet Inventory Management */}
      {providerTab === "inventory" && <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded overflow-hidden shadow-sm">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full min-w-[680px] text-left text-xs font-mono">
              <thead className="bg-[#F7F6F2] text-[#535F70] uppercase text-[10px] border-b border-[#D5DCE4]">
                <tr>
                  <th className="p-3.5">Machine Name & Model</th>
                  <th className="p-3.5">Category & Capacity</th>
                  <th className="p-3.5">Yard / Depot Location</th>
                  <th className="p-3.5">Rental Rate</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E6EB]">
                {myListings.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#535F70]">
                      No machinery registered under this fleet owner yet. Click "Add Machine" to register your equipment.
                    </td>
                  </tr>
                ) : (
                  myListings.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FBFBF9]">
                      <td className="p-3.5">
                        <div className="font-serif font-bold text-sm text-[#111F35]">{item.title}</div>
                        <div className="text-[10px] text-[#C66A20] font-mono">{item.registrationCode}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-semibold text-[#111F35]">{item.capacityTons} Metric Tons</div>
                        <div className="text-[10px] text-[#75777E]">{item.categoryName}</div>
                      </td>
                      <td className="p-3.5">
                        <div>{item.depotCity}</div>
                        <div className="text-[10px] text-[#75777E]">{item.corridor}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-[#111F35]">₹{item.baseRate.toLocaleString()}</div>
                        <div className="text-[10px] text-[#75777E]">/{item.unitLabel}</div>
                      </td>
                      <td className="p-3.5">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${item.isPaused ? "bg-[#ECEEE8] text-[#535F70] border-[#D5DCE4]" : "bg-[#E8F2EC] text-[#1E6347] border-[#A7F3D0]"}`}>
                          {item.isPaused ? "Paused" : "Available for Rent"}
                        </span>
                      </td>
                      <td className="p-3.5 text-right space-x-1">
                        <button
                          onClick={() => togglePauseListing(item.id)}
                          className="p-1.5 rounded hover:bg-[#ECEEE8] text-[#535F70] hover:text-[#111F35] cursor-pointer"
                          title={item.isPaused ? "Make Available" : "Pause Machine"}
                        >
                          {item.isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => handleDuplicateListing(item)}
                          className="p-1.5 rounded hover:bg-[#ECEEE8] text-[#535F70] hover:text-[#111F35] cursor-pointer"
                          title="Duplicate Machine"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => deleteListing(item.id)}
                          className="p-1.5 rounded hover:bg-[#FEE2E2] text-[#BA1A1A] cursor-pointer"
                          title="Delete Machine"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>}

      {/* Tab: Performance & Yield Analytics */}
      {providerTab === "analytics" && <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-5 rounded">
              <h3 className="text-xs font-mono uppercase font-bold text-[#535F70] mb-3">Booking Conversion Funnel</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Machine Profile Views</span>
                  <span className="font-bold">482</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Direct Quote Requests</span>
                  <span className="font-bold">64</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Quotes Provided</span>
                  <span className="font-bold">58</span>
                </div>
                <div className="flex justify-between py-1 text-[#1E6347] font-bold">
                  <span>Completed Bookings</span>
                  <span>42 (72.4% Win Rate)</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-5 rounded">
              <h3 className="text-xs font-mono uppercase font-bold text-[#535F70] mb-3">Payment Timelines</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Advance Payment Release</span>
                  <span className="font-bold text-[#1E6347]">Within 2.4 Hours</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Daily Shift Log Verification</span>
                  <span className="font-bold">Daily at 08:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Final Payout Settlement</span>
                  <span className="font-bold">Within 3 Days</span>
                </div>
                <div className="flex justify-between py-1 text-[#1E6347] font-bold">
                  <span>Payment Success Rate</span>
                  <span>100.0%</span>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFFFF] border border-[#D5DCE4] p-5 rounded">
              <h3 className="text-xs font-mono uppercase font-bold text-[#535F70] mb-3">Top Rental Locations</h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Sanand Industrial Hub</span>
                  <span className="font-bold text-[#111F35]">92% Booked</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Mundra Port Hub</span>
                  <span className="font-bold text-[#111F35]">88% Booked</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#E2E6EB]">
                  <span>Navi Mumbai Corridor</span>
                  <span className="font-bold text-[#111F35]">84% Booked</span>
                </div>
                <div className="flex justify-between py-1 text-[#2C4A6F] font-bold">
                  <span>Dahej Industrial Area</span>
                  <span>78% Booked</span>
                </div>
              </div>
            </div>
          </div>
        </div>}

      {/* Custom Quote Modal */}
      {customQuoteModal && <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs select-none">
          <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-xl w-full max-w-md shadow-2xl p-4 sm:p-6 max-h-[92dvh] overflow-y-auto">
            <h2 className="text-base font-serif font-bold text-[#111F35] mb-1">
              Send Price Quote
            </h2>
            <p className="text-xs font-mono text-[#535F70] mb-4">
              Request: {customQuoteModal.requestNumber} for {customQuoteModal.customerCompany}
            </p>

            <form onSubmit={handleSendQuote} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-[#535F70] uppercase font-bold mb-1">
                  Total Rental Amount (₹ All-inclusive)
                </label>
                <input
                  type="number"
                  min="1000"
                  step="500"
                  value={quoteInput}
                  onChange={(e) => setQuoteInput(Number(e.target.value))}
                  className="w-full h-11 sm:h-10 px-3 bg-[#FFFFFF] border border-[#D5DCE4] rounded-lg font-bold text-sm text-[#111F35]"
                />
              </div>

              <div className="p-3 bg-[#F7F6F2] rounded-lg text-[11px] text-[#535F70] space-y-1">
                <div>Duration: {customQuoteModal.durationShifts} Shifts (Days)</div>
                <div>Includes: Verified operator, safety check & on-site delivery</div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCustomQuoteModal(null)}
                  className="px-4 py-2.5 sm:py-2 border border-[#D5DCE4] rounded-lg uppercase cursor-pointer text-center font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 sm:py-2 bg-[#C66A20] text-white rounded-lg font-bold uppercase cursor-pointer text-center"
                >
                  Send Quote to Client
                </button>
              </div>
            </form>
          </div>
        </div>}
    </div>;
};
