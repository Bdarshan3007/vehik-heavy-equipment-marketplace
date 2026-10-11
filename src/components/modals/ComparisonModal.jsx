import { useMarketplace } from "../../context/MarketplaceContext";
import { X, Check, Star, Layers, ArrowRight, Trash2 } from "lucide-react";
import { getMachineImageUrl } from "../MachineImage";
export const ComparisonModal = () => {
  const {
    isComparisonOpen,
    setIsComparisonOpen,
    compareIds,
    listings,
    toggleCompare,
    clearCompare,
    setActiveBookingListing,
    setActiveAuditListing
  } = useMarketplace();
  if (!isComparisonOpen) return null;
  const comparedListings = listings.filter((l) => compareIds.includes(l.id));
  return <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs select-none">
      <div className="bg-[#FFFFFF] border border-[#D5DCE4] rounded-2xl w-full max-w-5xl max-h-[92dvh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-[#111F35] text-white flex items-center justify-between border-b border-[#2C4A6F]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C66A20]" />
            <h2 className="text-sm sm:text-base font-serif font-bold">
              Compare Machinery & Rates Side-by-Side
            </h2>
            <span className="text-[11px] sm:text-xs font-mono text-[#ABC8F4]">
              ({comparedListings.length})
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {comparedListings.length > 0 && <button
                onClick={clearCompare}
                className="text-xs font-mono text-[#CBD5E1] hover:text-[#FF964A] flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear All</span>
              </button>}
            <button
              onClick={() => setIsComparisonOpen(false)}
              className="p-1.5 rounded-lg text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {
    /* Content Table */
  }
        <div className="overflow-auto p-6 flex-1">
          {comparedListings.length === 0 ? <div className="text-center py-12">
              <p className="text-sm font-mono text-[#535F70] mb-3">No machines currently selected for comparison.</p>
              <p className="text-xs text-[#75777E]">Click the "Compare" button on any machine in the catalog to view features and rates side by side.</p>
            </div> : <div className="min-w-[700px]">
              <table className="w-full border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-[#D5DCE4]">
                    <th className="p-3 text-left w-1/4 text-[#535F70] uppercase text-[10px] font-bold">
                      Parameter
                    </th>
                    {comparedListings.map((item) => <th key={item.id} className="p-3 text-left w-1/4 align-top">
                        <div className="w-full h-24 rounded overflow-hidden bg-[#1E293B] mb-2 border border-[#D5DCE4] relative">
                          <img
    src={getMachineImageUrl(item.id, item.category)}
    alt={item.title}
    className="w-full h-full object-cover"
  />
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-[#C66A20] font-bold uppercase">{item.registrationCode}</span>
                          <button
    onClick={() => toggleCompare(item.id)}
    className="text-[#75777E] hover:text-[#BA1A1A] cursor-pointer"
    title="Remove from comparison"
  >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="font-serif font-bold text-sm text-[#111F35] leading-tight mb-1">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-[#535F70] font-normal truncate">
                          {item.providerName}
                        </div>
                      </th>)}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E2E6EB]">
                  {
    /* Tariff */
  }
                  <tr className="bg-[#F7F6F2]">
                    <td className="p-3 font-bold text-[#111F35]">Rental Rate</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 font-bold text-sm text-[#111F35]">
                        ₹{item.baseRate.toLocaleString()} <span className="text-[10px] text-[#535F70] font-normal">/{item.unitLabel}</span>
                      </td>)}
                  </tr>

                  {
    /* Capacity */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Load / Lift Capacity</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 font-bold text-[#111F35]">
                        {item.capacityTons} Metric Tons
                      </td>)}
                  </tr>

                  {
    /* Reach / Dimension */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Height & Reach</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 text-[#111F35]">
                        {item.boomLengthMeters ? `${item.boomLengthMeters}m Main Boom` : item.digDepthMeters ? `${item.digDepthMeters}m Dig Depth` : `${item.payloadCapacityTons || 60}T Payload Bed`}
                      </td>)}
                  </tr>

                  {
    /* Engine / Drive */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Engine & Axles</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 text-[#111F35]">
                        {item.engineHorsepower || item.driveConfiguration || "Standard Heavy Spec"}
                      </td>)}
                  </tr>

                  {
    /* Depot / Corridor */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Location & City</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 text-[#535F70]">
                        <div>{item.depotCity}</div>
                        <div className="text-[10px] text-[#75777E]">{item.corridor}</div>
                      </td>)}
                  </tr>

                  {
    /* Safety Certification */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Safety Testing</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3">
                        <span className="inline-flex items-center gap-1 text-[#1E6347] font-semibold bg-[#E8F2EC] px-2 py-0.5 rounded">
                          <Check className="w-3 h-3" />
                          Passed Full Inspection
                        </span>
                      </td>)}
                  </tr>

                  {
    /* Rigging Crew */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Driver & Operator</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 text-[#111F35]">
                        {item.riggerIncluded ? "Certified Driver + Riggers Included" : "Machine Driver Included"}
                      </td>)}
                  </tr>

                  {
    /* Rating */
  }
                  <tr>
                    <td className="p-3 text-[#535F70]">Owner Rating</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-[#C66A20] text-[#C66A20]" />
                        <span className="font-bold text-[#111F35]">{item.rating}</span>
                        <span className="text-[#75777E]">({item.reviewCount} reviews)</span>
                      </td>)}
                  </tr>

                  {
    /* Actions Row */
  }
                  <tr className="bg-[#FFFFFF]">
                    <td className="p-3 text-[#535F70]">Immediate Mobilize</td>
                    {comparedListings.map((item) => <td key={item.id} className="p-3 space-y-1.5">
                        <button
    onClick={() => {
      setIsComparisonOpen(false);
      setActiveBookingListing(item);
    }}
    className="w-full py-2 bg-[#C66A20] hover:bg-[#D97706] text-white text-[11px] font-mono font-bold uppercase rounded transition-colors flex items-center justify-center gap-1 cursor-pointer"
  >
                          <span>Deploy RFQ</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
    onClick={() => {
      setIsComparisonOpen(false);
      setActiveAuditListing(item);
    }}
    className="w-full py-1.5 bg-[#ECEEE8] hover:bg-[#D5DCE4] text-[#111F35] text-[10px] font-mono rounded transition-colors cursor-pointer"
  >
                          View Audit Sheet
                        </button>
                      </td>)}
                  </tr>
                </tbody>
              </table>
            </div>}
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F7F6F2] border-t border-[#D5DCE4] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#535F70]">
          <span className="text-center sm:text-left text-[11px] sm:text-xs">All machines backed by VEHIK Guaranteed Settlement Protocol</span>
          <button
            onClick={() => setIsComparisonOpen(false)}
            className="w-full sm:w-auto px-4 py-2 sm:py-1.5 bg-[#111F35] text-white rounded-lg text-xs uppercase cursor-pointer text-center font-semibold"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>;
};
