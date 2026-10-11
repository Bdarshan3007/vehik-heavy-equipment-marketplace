import React, { useState } from "react";
import { CORRIDOR_NODES } from "../data/mockData";
import { Clock, CheckCircle2, Radio, Info } from "lucide-react";
import { useMarketplace } from "../context/MarketplaceContext";
export const CorridorArtery = () => {
  const [activeNodeId, setActiveNodeId] = useState("02");
  const { setSelectedCorridor, showNotification } = useMarketplace();
  const selectedNode = CORRIDOR_NODES.find((n) => n.id === activeNodeId) || CORRIDOR_NODES[1];
  const handleSelectNode = (node) => {
    setActiveNodeId(node.id);
    if (node.id === "01") setSelectedCorridor("Mundra Port Siding");
    else if (node.id === "02" || node.id === "03") setSelectedCorridor("Sanand - Ahmedabad");
    else if (node.id === "05") setSelectedCorridor("JNPT Navi Mumbai");
    else setSelectedCorridor("all");
    showNotification(`Selected corridor node: ${node.name} (${node.readyUnits} units standby)`);
  };
  return <section id="corridor-artery" className="py-12 px-4 sm:px-6 max-w-[1440px] mx-auto scroll-mt-20">
      <div className="bg-[#0B132B] text-white border border-[#2C4A6F] rounded p-6 sm:p-9 shadow-lg">
        {
    /* Section Header */
  }
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#F59E0B] font-bold mb-1">
              Key Transport Hubs & Service Areas
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Fast Machinery Delivery Across <span className="italic font-normal text-[#C66A20]">Major Routes</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#ABC8F4] mt-1.5 font-mono max-w-2xl">
              We have certified cranes, trucks, and excavators stationed at key transport hubs between Gujarat and Mumbai for fast, same-day dispatch.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-[#ABC8F4]">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
              Active Highway Corridors
            </span>
            <span className="flex items-center gap-1.5 text-[#FF964A]">
              <span className="w-2 h-2 rounded-full bg-[#C66A20]" />
              Express Delivery Hubs
            </span>
          </div>
        </div>

        {/* Mobile Node Quick Selector */}
        <div className="sm:hidden mb-4">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-2">
            <span>Tap to Inspect Node:</span>
            <span className="text-[#FF964A]">5 Active Hubs</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {CORRIDOR_NODES.map((node) => (
              <button
                key={node.id}
                onClick={() => handleSelectNode(node)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all shrink-0 ${
                  activeNodeId === node.id
                    ? "bg-[#C66A20] text-white shadow-md font-bold"
                    : "bg-[#172A46] text-[#CBD5E1] border border-[#2C4A6F]"
                }`}
              >
                {node.id}. {node.name}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Corridor Node Artery */}
        <div className="py-4 sm:py-6 overflow-x-auto pb-6 sm:pb-8 no-scrollbar">
          <div className="sm:hidden flex justify-end text-[10px] font-mono text-[#94A3B8] mb-2">
            <span>← Swipe map to view corridor →</span>
          </div>
          <div className="min-w-[850px] flex items-center justify-between relative px-6">
            {/* Connecting Track Line */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-[#1E293B] z-0">
              <div className="h-full bg-gradient-to-r from-[#3B82F6] via-[#C66A20] to-[#10B981] opacity-75" />
            </div>

            {CORRIDOR_NODES.map((node, index) => {
    const isSelected = activeNodeId === node.id;
    const isNext = index < CORRIDOR_NODES.length - 1;
    return <React.Fragment key={node.id}>
                  {
      /* Node Circle & Details */
    }
                  <div
      onClick={() => handleSelectNode(node)}
      className="relative z-10 flex flex-col items-center cursor-pointer group"
    >
                    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center font-mono font-bold text-sm transition-all border-2 ${isSelected ? "bg-[#C66A20] text-white border-white scale-110 shadow-lg" : "bg-[#1E293B] text-[#CBD5E1] border-[#334155] group-hover:border-[#94A3B8]"}`}
    >
                      {node.id}
                    </div>

                    <div className="mt-3 text-center">
                      <div className={`text-xs font-mono font-bold whitespace-nowrap ${isSelected ? "text-[#FF964A]" : "text-white"}`}>
                        {node.name}
                      </div>
                      <div className="text-[10px] font-mono text-[#94A3B8] whitespace-nowrap max-w-[130px] truncate">
                        {node.subtitle}
                      </div>
                    </div>
                  </div>

                  {
      /* Distance Pill Marker between nodes */
    }
                  {isNext && <div className="relative z-10 px-2">
                      <span className="bg-[#0F172A] border border-[#334155] text-[10px] font-mono text-[#94A3B8] px-2 py-0.5 rounded whitespace-nowrap">
                        {node.km}
                      </span>
                    </div>}
                </React.Fragment>;
  })}
          </div>
        </div>

        {
    /* Selected Corridor Telemetry Banner */
  }
        <div className="bg-[#111F35] border border-[#2C4A6F] rounded p-5 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1E293B]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1]">
              <Info className="w-4 h-4 text-[#F59E0B]" />
              <span>
                Selected Corridor: <strong className="text-white">{selectedNode.name}</strong> — {selectedNode.subtitle}
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#7987A2]">
              Click any node along the artery to inspect transit data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 divide-y sm:divide-y-0 sm:divide-x divide-[#1E293B]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#172A46] text-[#F59E0B] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-white tabular-nums">{selectedNode.avgDispatch}</div>
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">Avg Dispatch Response</div>
              </div>
            </div>

            <div className="sm:pl-6 flex items-center gap-3 pt-3 sm:pt-0">
              <div className="w-9 h-9 rounded bg-[#172A46] text-[#10B981] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-white tabular-nums">{selectedNode.rtoRate}</div>
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">RTO & E-Way Compliance</div>
              </div>
            </div>

            <div className="sm:pl-6 flex items-center gap-3 pt-3 sm:pt-0">
              <div className="w-9 h-9 rounded bg-[#172A46] text-[#38BDF8] flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xl font-mono font-bold text-white tabular-nums">94.6% Fleets</div>
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">Active RTK Telematics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
