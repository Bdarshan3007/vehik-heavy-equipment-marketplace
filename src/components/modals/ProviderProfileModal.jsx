import { useMarketplace } from "../../context/MarketplaceContext";
import {
  X,
  Star,
  ArrowRight
} from "lucide-react";
import { getMachineImageUrl } from "../MachineImage";
export const ProviderProfileModal = () => {
  const {
    selectedProvider,
    setSelectedProvider,
    listings,
    reviews,
    setActiveBookingListing
  } = useMarketplace();
  if (!selectedProvider) return null;
  const providerListings = listings.filter((l) => l.providerId === selectedProvider.id);
  const providerReviews = reviews.filter((r) => {
    const listing = listings.find((l) => l.id === r.listingId);
    return listing?.providerId === selectedProvider.id;
  });
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-3xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-5 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#172A46] border border-[#2C4A6F] flex items-center justify-center text-[#FF964A] font-serif font-bold text-lg shrink-0">
              {selectedProvider.name.charAt(0)}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <h2 className="text-base sm:text-lg font-serif font-bold text-white line-clamp-1">
                  {selectedProvider.name}
                </h2>
                <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E6347] text-white font-bold shrink-0">
                  VERIFIED OWNER
                </span>
              </div>
              <p className="text-[11px] sm:text-xs font-mono text-[#ABC8F4] line-clamp-1">
                {selectedProvider.businessType} · Base Location: {selectedProvider.hubLocation}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedProvider(null)}
            className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {
    /* Modal Body */
  }
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          {
    /* Key Credentials Ribbon */
  }
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F6F2] p-4 rounded border border-[#D5DCE4] font-mono text-center">
            <div className="border-r border-[#E2E6EB] pr-2">
              <span className="text-xl font-bold text-[#111F35] block">{selectedProvider.fleetSize}</span>
              <span className="text-[10px] text-[#75777E] uppercase">Total Machines</span>
            </div>
            <div className="border-r border-[#E2E6EB] pr-2">
              <span className="text-xl font-bold text-[#C66A20] block">{selectedProvider.experienceYears} Yrs</span>
              <span className="text-[10px] text-[#75777E] uppercase">Experience</span>
            </div>
            <div className="border-r border-[#E2E6EB] pr-2">
              <span className="text-xl font-bold text-[#1E6347] block">{selectedProvider.responseTimeMinutes}m</span>
              <span className="text-[10px] text-[#75777E] uppercase">Avg Response Time</span>
            </div>
            <div>
              <span className="text-xl font-bold text-[#111F35] flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-[#C66A20] text-[#C66A20]" />
                {selectedProvider.rating}
              </span>
              <span className="text-[10px] text-[#75777E] uppercase">({selectedProvider.reviewsCount} Reviews)</span>
            </div>
          </div>

          {
    /* Verification & Contact Details */
  }
          <div className="bg-[#FFFFFF] border border-[#E2E6EB] rounded p-4 text-xs font-mono space-y-2">
            <div className="text-[11px] font-bold text-[#111F35] uppercase tracking-wider pb-2 border-b border-[#E2E6EB]">
              Verified Business & Contact Details
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-[#535F70]">
              <div>
                <span className="text-[#75777E] block text-[10px] uppercase">GST Number</span>
                <span className="font-semibold text-[#111F35]">{selectedProvider.gstin}</span>
              </div>
              <div>
                <span className="text-[#75777E] block text-[10px] uppercase">Primary Service Area</span>
                <span className="font-semibold text-[#111F35]">{selectedProvider.primaryCorridor}</span>
              </div>
              <div>
                <span className="text-[#75777E] block text-[10px] uppercase">Contact Person</span>
                <span className="font-semibold text-[#111F35]">{selectedProvider.contactPerson}</span>
              </div>
              <div>
                <span className="text-[#75777E] block text-[10px] uppercase">Direct Phone Support</span>
                <span className="font-semibold text-[#C66A20]">{selectedProvider.contactPhone}</span>
              </div>
            </div>
          </div>

          {
    /* Active Machines Available */
  }
          <div>
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#535F70] mb-3">
              Machines Available for Rent ({providerListings.length} Units)
            </h3>
            <div className="space-y-3">
              {providerListings.map((item) => <div key={item.id} className="bg-[#FFFFFF] border border-[#D5DCE4] rounded p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#111F35] transition-colors">
                  <div className="flex items-start gap-3.5">
                    <div className="w-16 h-14 rounded overflow-hidden bg-[#1E293B] shrink-0 border border-[#D5DCE4]">
                      <img
    src={getMachineImageUrl(item.id, item.category)}
    alt={item.title}
    className="w-full h-full object-cover"
  />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold text-[#C66A20]">{item.registrationCode}</span>
                        <span className="text-[#C5C6CD]">·</span>
                        <span className="text-xs font-mono text-[#1E6347] font-semibold">Ready for Site Delivery</span>
                      </div>
                      <h4 className="font-serif font-bold text-sm text-[#111F35]">{item.title}</h4>
                      <p className="text-xs font-mono text-[#535F70] mt-0.5">
                        {item.assetClass} · Rate: ₹{item.baseRate.toLocaleString()} /{item.unitLabel}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProvider(null);
                      setActiveBookingListing(item);
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Rent Machine</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>)}
            </div>
          </div>

          {/* Reviews */}
          <div>
            <h3 className="text-xs font-mono uppercase font-bold tracking-wider text-[#535F70] mb-3">
              Customer Reviews & Feedback
            </h3>
            <div className="space-y-3">
              {providerReviews.length === 0 ? <div className="p-4 bg-[#F7F6F2] rounded-xl text-xs font-mono text-[#75777E] text-center">
                  Consistently rated 5.0 across previous customer projects.
                </div> : providerReviews.map((r) => <div key={r.id} className="bg-[#FFFFFF] border border-[#E2E6EB] rounded-xl p-3.5 sm:p-4 text-xs font-mono">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#111F35]">{r.authorName}</span>
                        <span className="text-[#75777E]">({r.authorCompany})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#C66A20] font-bold">
                        <Star className="w-3 h-3 fill-[#C66A20]" />
                        <span>{r.rating}.0</span>
                      </div>
                    </div>
                    <p className="text-[#535F70] leading-relaxed italic">
                      "{r.comment}"
                    </p>
                  </div>)}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F7F6F2] border-t border-[#D5DCE4] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[#535F70] text-center sm:text-left text-[11px] sm:text-xs">All rentals covered by VEHIK Secure Payments</span>
          <button
            onClick={() => setSelectedProvider(null)}
            className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-[#111F35] text-white rounded-lg uppercase font-semibold cursor-pointer text-center"
          >
            Close
          </button>
        </div>
      </div>
    </div>;
};
